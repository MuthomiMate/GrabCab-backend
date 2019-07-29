import {
    IsString, IsEmail, IsNumber, IsEnum, IsNotEmpty
}  from 'class-validator';

const role = [ 'rider', 'driver'];
export class CreateUserDto {
    @ IsNotEmpty()
    id: string

    @ IsString()
    firstName: string;

    @ IsString()
    lastName: string;

    @ IsString()
    fullName: string;

    @ IsEmail()
    email: string;

    @ IsString()
    mobile: string;

    // @IsEnum(role: string)
    role: string;

    @ IsString()
    drivingLicense: string;

}
