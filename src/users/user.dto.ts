import {
    IsString, IsEmail, IsEnum,
}  from 'class-validator';

export class CreateUserDto {

    @ IsString()
    firstName: string;

    @ IsString()
    lastName: string;

    @ IsEmail()
    email: string;

    @ IsString()
    mobile: string;

    @ IsEnum(['driver', "rider"])
    role: string;

    @ IsString()
    drivingLicense: string;

    @ IsString()
    password: string;

}

export class updateUserInput {
    @ IsString()
    firstName?: string;

    @ IsString()
    lastName?: string;

    @ IsEmail()
    email?: string;

    @ IsString()
    mobile?: string;

    // @IsEnum(role: string)
    role?: string;

    @ IsString()
    drivingLicense?: string;

    @ IsString()
    password?: string;
}
