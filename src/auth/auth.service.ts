import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../core/user/user.service';
import { comparePassword } from '../core/security/password.util';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValid = await comparePassword(password, user.password);

    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      message: 'Login successful',
      userId: user.id,
      email: user.email,
    };
  }
}
