import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { LocalStrategy } from './local.strategy';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@ Resolver('Auth')
export class AuthResolver {
    constructor(private readonly localStrategy: LocalStrategy){}

    @ Mutation()
    // @ UseGuards(AuthGuard('local'))
    async login(
        @ Args('email') email: string,
        @ Args('password') password: string,
    ){
        return await this .localStrategy.validate(email, password)
    }
}
