import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
      ) {}
    async UserProblemResolved(id: number): Promise<number | string> {
        const goal = await this.userRepository.findOneBy({ id });

        if (!goal.probleme) return 'У пользователя нет проблем'
        if (!goal) throw new NotFoundException()

        await this.userRepository.save({
            ...goal,
            probleme: false,
        })
        const count = await this.userRepository.count({
            where: {
                "probleme": true,
            }
        })
        return count
    }
}
