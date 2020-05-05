import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {
    ConflictException,
    InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;

        const salt = await bcrypt.genSalt();

        const user = new User();
        user.username = username;
        user.password = await this.hashPassword(password, salt);
        user.salt = salt;

        try {
            await user.save();
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Username Already Exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    private async hashPassword(
        password: string,
        salt: string,
    ): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    async validateUserPassword(
        authCredentialsDto: AuthCredentialsDto,
    ): Promise<string> {
        const { username, password } = authCredentialsDto;
        const user = await User.findOne({ username });
        if (user && (await user.validatePassword(password))) {
            return user.username;
        } else {
            return null;
        }
    }
}
