import {Resolver, Query, Mutation, Args} from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto, updateUserInput } from './user.dto';

@ Resolver('User')
export class UserResolver {
    constructor(private readonly userService: UserService){}

    @ Query(()=> [User])
    async users() {
        return this .userService.findAll();
    }

    @ Query(()=> User)
    async user(@ Args('id') id: string){
        return await this .userService.findOne(id);
    }

    @ Mutation(() => Boolean )
    async deleteUser(@ Args('id') id: string){
        return await this .userService.delete(id)
    }

    @ Mutation(() => User)
    async createUser(@ Args('input') input: CreateUserDto){
        return await this .userService.create(input);
    }

    @ Mutation(() => User)
    async updateUser(
        @ Args('id') id: string,
        @ Args('input') input: updateUserInput,
    ) {
            return await this .userService.update(id, input);
      }
}
