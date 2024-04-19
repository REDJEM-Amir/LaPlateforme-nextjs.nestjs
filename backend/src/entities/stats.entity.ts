import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Account } from './account.entity';

@Entity()
export class Stats {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Account)
    @JoinColumn({ name: 'accountId' })
    account: Account;

    @Column()
    score: number = 0;

    @Column()
    wins: number = 0;

    @Column()
    losses: number = 0;

    @Column()
    difficulty: string = "Novice";
}

