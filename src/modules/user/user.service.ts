import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/entities/Users/users'; // Asegúrate de que la ruta sea correcta
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs'; // Para encriptar y comparar contraseñas
import { Role } from 'src/entities/Roles/roles';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService, // Inyección del JwtService
  ) {}

  // Generar token JWT
  async generateToken(user: User): Promise<string> {
    try {
      const payload = {
        sub: user._id,
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        role: user.role,
        program: user.program,

      }; // Datos que incluirás en el token
      return this.jwtService.sign(payload); // Generar el token
    } catch (error) {
      throw new InternalServerErrorException('Error al generar el token');
    }
  }

  async login(
    email: string,
    password: string,
  ): Promise<{
    success: boolean;
    message: string;
    token?: string;
    roleUser?: any;
  }> {
    try {
      console.log('Buscando usuario con email:', email); // Registro para verificar el email del usuario

      const user = await this.userModel.findOne({ email });

      if (!user) {
        console.warn('Usuario no encontrado'); // Registro si el usuario no existe
        return { success: false, message: 'Usuario no encontrado' };
      }

      const isPasswordValid = await bcrypt.compare(password, user.password); // Comparación de contraseñas
      if (!isPasswordValid) {
        console.warn('Credenciales incorrectas'); // Registro si la contraseña es incorrecta
        return { success: false, message: 'Credenciales incorrectas' };
      }

      const token = await this.generateToken(user); // Genera el token de autenticación
      return {
        success: true,
        message: 'Inicio de sesión exitoso',
        token,
        roleUser: user.role,
      }; // Devolvemos la información del usuario y el token
    } catch (error) {
      console.error('Error en el proceso de inicio de sesión:', error); // Registro detallado del error
      return {
        success: false,
        message: 'Error interno al procesar el inicio de sesión',
      };
    }
  }

  // Registrar un nuevo usuario (con hash de contraseña)
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10); // Encriptar contraseña
      const newUser = new this.userModel({
        ...createUserDto,
        password: hashedPassword,
      });
      return await newUser.save();
    } catch (error) {
      throw new InternalServerErrorException('Error al registrar el usuario');
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userModel.find();
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener los usuarios');
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id);

      if (!user) {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Si es una excepción de no encontrado, la lanzamos
      }
      throw new InternalServerErrorException('Error al obtener el usuario');
    }
  }

  async findByRole(id: string): Promise<any> {
    try {
      const user = await this.userModel.find({ role: id });

      if (!user) {
        throw new NotFoundException(`Rol con ID ${id} no encontrado`);
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Si es una excepción de no encontrado, la lanzamos
      }
      throw new InternalServerErrorException('Error al obtener el usuario');
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.findOne(id);
      Object.assign(user, updateUserDto);
      return await user.save();
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Si el usuario no se encuentra, se lanza la excepción correspondiente
      }
      throw new InternalServerErrorException('Error al actualizar el usuario');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const user = await this.findOne(id);
      await this.userModel.deleteOne({ _id: user._id });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Si el usuario no se encuentra, se lanza la excepción correspondiente
      }
      throw new InternalServerErrorException('Error al eliminar el usuario');
    }
  }
}
