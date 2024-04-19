import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Difficulty } from 'src/entities/difficulty.entity';

@Injectable()
export class DifficultyService {
    constructor(
        @InjectRepository(Difficulty)
        private difficultyRepository: Repository<Difficulty>
    ) { }

    async difficultySummary(): Promise<Difficulty[]> {
        return this.difficultyRepository.find();
    }

    async seed() {
        const difficultyData = [
            { id: 1, difficultyName: 'Novice', score: 500 },
            { id: 2, difficultyName: 'Lexicographe', score: 1500 },
            { id: 3, difficultyName: 'Maître des Mots', score: 3000 },
            { id: 4, difficultyName: 'Virtuose du Vocabulaire', score: 6000 },
        ];

        for (const data of difficultyData) {
            const difficultyExists = await this.difficultyRepository.findOneBy({ difficultyName: data.difficultyName });
            if (difficultyExists) {
                let isChanged = false;
                if (difficultyExists.score !== data.score) {
                    isChanged = true;
                }
                if (isChanged) {
                    await this.difficultyRepository.save({
                        ...difficultyExists,
                        ...data,
                    });
                }
            } else {
                await this.difficultyRepository.save(data);
            }
        }
    }
}