import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/modules/users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async register(registerDto: RegisterDto) {
    const exists = await this.usersService.findOne(registerDto.email);
    if (exists) throw new ConflictException('User already exists');

    // Use transaction to create both User and Customer
    return this.usersService.prisma.$transaction(async (tx) => {
      const hashedPassword = await bcrypt.hash(registerDto.password, 10);
      
      // 1. Create Customer first
      const customer = await tx.customer.create({
        data: {
          name: registerDto.name,
          phone: registerDto.phone,
          address: registerDto.address,
        },
      });

      // 2. Create User and link to Customer
      const user = await tx.user.create({
        data: {
          email: registerDto.email,
          password: hashedPassword,
          role: 'USER',
          customerId: customer.id,
        } as any,
      });

      const { password, ...result } = user;
      return { ...result, customer };
    });
  }
}
