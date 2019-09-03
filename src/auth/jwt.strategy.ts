import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { UserService } from "../users/user.service";
import { UnauthorizedException } from "@nestjs/common";

export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private readonly userService: UserService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
            secretOrKey: process.env.JWT_SECRET
        })
        console.log('something', ExtractJwt.fromAuthHeaderAsBearerToken);
    }

    async validate(payload: any){
        console.log('payload', payload);
        const user = this .userService.findOne(payload.id);
        if(!user) throw new UnauthorizedException();
        return user;
    }
}
