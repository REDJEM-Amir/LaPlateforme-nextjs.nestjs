import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class WallOfFame {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    scores: string;

    @Column()
    login: string;
}