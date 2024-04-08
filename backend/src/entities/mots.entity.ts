import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Mots {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    word: string;

    @Column()
    longueur: string;

    @Column()
    difficulté: string;
}