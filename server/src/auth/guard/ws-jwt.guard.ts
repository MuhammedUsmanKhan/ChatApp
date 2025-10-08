//ws-jwt.guard.ts

import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Socket } from "socket.io";
import { WSAuthConfigService } from "../ws-auth.service";


@Injectable()
export class WsJwtAuthGuard implements CanActivate {
  constructor(private wsAuthConfigService: WSAuthConfigService) {}
  canActivate(context: ExecutionContext): any {
    if (context.getType() !== "ws") {
      return true;
    }

    const client = context.switchToWs().getClient<Socket>();
    const { authorization } = client.handshake.headers;
    console.log({authorization});
    
    const payload = this.wsAuthConfigService.isValidAuthHeader(authorization);
    if (!payload) {
      return false; // deny access
    }

    // optionally attach the user for later use
    // context.switchToWs().getData().user = payload;
    // Logger.log({ payload });
    // context.switchToWs().getData().user = payload;
    return true;
  }
}
