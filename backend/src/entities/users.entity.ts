import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    pseudo: string;

    @Column()
    password: string;

    @Column()
    numero_secu: string;
}