import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Difficulty {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    difficultyName: string;

    @Column()
    score: number;
}