import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users, UsersDocument } from './schemas/users.schema';

@Injectable()
export class UsersService {
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>

    async getUserById(id: string) {
        const user = await this.usersModel.findOne({id}).exec();
        let isUser: boolean = false;
        if (user !== null) {
            isUser = true;
        } 
        return isUser;
    }
}
