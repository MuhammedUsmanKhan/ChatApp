import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { verify } from 'jsonwebtoken';

@Injectable()
export class WSAuthConfigService {
  constructor(private configService: ConfigService) {}

  isValidAuthHeader(token: string) {
    console.log({token});
    
    // const token: string = authorization.split(' ')[1];
    const payload = verify(token, this.configService.get('JWT_ACCESS_SECRET'), {
      ignoreExpiration: true,
    });
    return payload;
  }
}