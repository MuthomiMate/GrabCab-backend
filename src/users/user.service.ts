import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto, updateUserInput } from './user.dto';
import pushid = require('pushid');

@ Injectable()
export class UserService {
    constructor(
        @ InjectRepository(User)
        private userRepository: Repository< User>,
    ) { }

    async findAll(): Promise< User[]> {
        return await this .userRepository.find({active: true});
    }

    async findOne(id: string): Promise< User> {
        return await this .userRepository.findOne({id});
    }

    async delete(id: string): Promise< boolean> {
        const user = await this .userRepository.findOne({id})
        user.active = false;
        return await this .userRepository.save(user)? true: false;
    }

    async create(input: CreateUserDto): Promise< User> {
        const user = new User();
        user.id = pushid();
        const {
            firstName, lastName, email, mobile, role, drivingLicense, password
        } = input;
        user.firstName = firstName;
        user.lastName = lastName;
        user.fullName = `${firstName} ${lastName}`;
        user.email = email;
        user.mobile = mobile;
        user.role = role;
        user.password= password
        user.drivingLicense = drivingLicense;
        user.active = true;
        return await this .userRepository.save(user);
    }

    async update(id:string, input: updateUserInput): Promise< User> {
        const user = await this .userRepository.findOne({id})
        const {
            firstName, lastName, email, mobile, role, drivingLicense, password
        } = input;
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.fullName = `${user.firstName} ${user.lastName}`;
        user.email = email || user.email;
        user.mobile = mobile || user.mobile;
        user.role = role || user.role;
        user.password= password || user.password
        user.drivingLicense = drivingLicense || user.drivingLicense;
        return await this .userRepository.save(user);
    }
}
