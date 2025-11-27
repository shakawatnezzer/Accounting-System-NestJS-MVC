import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  
  async validateUser(email: string, plainPassword: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isValid = await bcrypt.compare(plainPassword, user.password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    
    return user;
  }

  
  async login(user: any) {
    const payload = { sub: user._id?.toString ? user._id.toString() : user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);
    return { accessToken: token, tokenType: 'bearer' };
  }
}
