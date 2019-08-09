import { Entity, Column, PrimaryColumn } from 'typeorm';

@ Entity()
export class User {
    @ PrimaryColumn()
    id: string;

    @ Column()
    firstName: string;

    @ Column()
    lastName: string;

    @ Column()
    fullName: string;

    @ Column()
    email: string;

    @ Column()
    mobile: string;

    @ Column()
    password: string

    @ Column()
    role: string;

    @ Column()
    drivingLicense: string;

    @ Column()
    active: boolean;
}
