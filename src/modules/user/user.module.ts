import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/entities/Users/users';
import { JwtModule } from '@nestjs/jwt';
import { RoleSchema } from 'src/entities/Roles/roles';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), // Asegúrate de que el nombre coincide
    JwtModule.register({
      secret: 'your_jwt_secret', // Cambia esto por una clave secreta más segura
      signOptions: { expiresIn: '1h' }, // Tiempo de expiración del token
    }),
  ],
  
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
