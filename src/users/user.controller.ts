import { Controller, Get, Post, Body } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';
import { ValidationPipe } from '../validation.pipe';

@ Controller('user')
export class UserController {
    constructor(private userService: UserService) { }
    @ Get()
    index(): Promise< User[]> {
        return this .userService.findAll();
    }
    @ Post()
    async createUser(@ Body(new ValidationPipe()) createUserDto: CreateUserDto){
        this .userService.create(createUserDto);
    }
}
