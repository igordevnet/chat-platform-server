import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../../core/user/user.service';
import { comparePassword } from '../../../core/security/password.util';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

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

  async generateToken(payload: string): Promise<string> {
    return await this.jwtService.signAsync(payload)
  }
}
