import {
    Module,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './passport/jwt.strategy';
import { AuthController } from './auth.controller';
import { AppModule } from '../app/app.module';

@Module({
    components: [AuthService, JwtStrategy],
    controllers: [AuthController],
    imports: [AppModule],
})
export class AuthModule { }