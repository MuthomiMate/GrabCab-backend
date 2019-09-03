import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthenticationError } from 'apollo-server-core';
import {
    ExecutionContextHost
} from '@nestjs/core/helpers/execution-context-host';

@ Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        const { req } = ctx.getContext();
        return super.canActivate(
          new ExecutionContextHost([req]),
        );
    }
    handleRequest(err: any, user: any) {
        console.log("user", user);
        if (err || !user) {
        throw err || new AuthenticationError('GqlAuthGuard');
        }
        return user;
    }
}
