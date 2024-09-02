import { Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('api')
export class UsersController {
    constructor(private usersService: UsersService) {}
    @Post('users-problem-resolved/:id')
    async usersProblemResolved(@Param('id') id) {
        return await this.usersService.UserProblemResolved(id)
    }
}
