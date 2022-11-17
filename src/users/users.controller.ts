import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) {}

    @Post('login')
    async getUserById(
        @Body('id') id: string
    ) {
        return this.usersService.getUserById(id);
    }
}
