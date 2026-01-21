import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { CreateUserDTO } from './dto/create-user.dto';
import { hashPassword } from '../security/password.util';
import { AuthService } from 'src/shared/modules/auth/auth.service';
import { AuthMessage } from 'src/shared/messages/auth-message';
import { EmailService } from 'src/shared/modules/email/email.service';

@Injectable()
export class UserService {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository,
    private readonly emailService: EmailService
  ) { }

  async createUser(dto: CreateUserDTO): Promise<AuthMessage> {
    await this.throwIfEmailIsUsed(dto.email);

    dto.password = await hashPassword(dto.password);

    const result = await this.userRepository.createUser(dto);
    const token = await this.authService.generateToken(result.id);

    this.emailService.sendMail({
      to: result.email,
      subject: "Account Validation",
      html: this.emailService.createHTML(result.username),
    });

    return { message: 'User created succefully', token: token, email: result.email, name: result.username }
  }

  async findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  private async throwIfEmailIsUsed(email: string) {
    const user = await this.findByEmail(email);

    if (user) throw new BadRequestException('This email is already used.')
  }
}
