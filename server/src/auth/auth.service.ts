import * as jwt from 'jsonwebtoken';
import { Component, Inject, Logger } from '@nestjs/common';
import { classToPlain } from 'class-transformer';
import { User } from '../app/user/user.entity';

@Component()
export class AuthService {
    private readonly logger = new Logger('AuthService', true);

    async createToken(user: User) {
        const expiresIn = 60 * 60 * 24,
            secretOrKey = 'ultrasecretuberkey';
        const userInToken = { user: classToPlain(user) };
        const token = jwt.sign(userInToken, secretOrKey, { expiresIn });
        return {
            expires_in: expiresIn,
            access_token: token,
        };
    }

    async validateUser(signedUser): Promise<boolean> {
        this.logger.log(`Signed user : ${JSON.stringify(signedUser)}`);
        // put some validation logic here
        // for example query user by id / email / username
        return true;
    }
}