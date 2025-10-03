// auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { Response, Request } from 'express';
import { randomBytes } from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthRefreshTokenService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async refreshTokens(req: Request, res: Response): Promise<{ accessToken: string }> {
    const user = (req as any).user;
    
    // Revoke the current refresh token
    const currentRefreshToken = req.cookies?.refreshToken;
    if (currentRefreshToken) {
      try {
        const decoded = this.jwtService.verify(currentRefreshToken, {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        });
        await this.revokeRefreshToken(decoded.jti);
      } catch (error) {
        // Token is invalid, but we still proceed with refresh
        console.debug('Invalid refresh token during refresh');
      }
    }

    // Generate new tokens
    const accessToken = this.generateAccessToken(user);
    const newRefreshToken = await this.generateAndStoreRefreshToken(user, res);

    return { accessToken };
  }

  async logout(userId: string, res: Response): Promise<void> {
    // Revoke all user's refresh tokens
    await this.prisma.refreshToken.updateMany({
      where: { userId, revoked: false },
      data: { revoked: true },
    });

    // Clear the refresh token cookie
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/auth/refresh',
    });
  }

  generateAccessToken(user: any): string {
    const payload = { 
      sub: user.id, 
      email: user.email,
      type: 'access'
    };
    return this.jwtService.sign(payload, { 
      secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: '15m',
    });
  }

  private generateRefreshTokenPayload(user: any, tokenId: string): any {
    return {
      sub: user.id,
      email: user.email,
      jti: tokenId, // JWT ID - reference to database entry
      type: 'refresh'
    };
  }

  async generateAndStoreRefreshToken(user: any, res: Response): Promise<string> {
    // Create database entry first
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    
    const refreshTokenEntry = await this.prisma.refreshToken.create({
      data: {
        userId: user.id,
        expiresAt,
        revoked: false,
      },
    });

    // Generate JWT with reference to database entry
    const payload = this.generateRefreshTokenPayload(user, refreshTokenEntry.id);
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: '7d',
    });

    // Set cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/auth/refresh',
    });

    return refreshToken;
  }

  private async revokeRefreshToken(tokenId: string): Promise<void> {
    await this.prisma.refreshToken.update({
      where: { id: tokenId },
      data: { revoked: true },
    });
  }

  // Optional: Cleanup method that can be called periodically or on demand
  async cleanupExpiredTokens(): Promise<{ deletedCount: number }> {
    const result = await this.prisma.refreshToken.deleteMany({
      where: {
        OR: [
          { expiresAt: { lt: new Date() } },
          { revoked: true },
        ],
      },
    });
    
    return { deletedCount: result.count };
  }
}