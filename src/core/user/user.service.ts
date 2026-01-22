import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { CreateUserDTO } from './dto/create-user.dto';
import { hashPassword } from '../security/password.util';
import { AuthService } from 'src/shared/modules/auth/auth.service';
import { AuthMessage } from 'src/shared/messages/auth-message';
import { EmailService } from 'src/shared/modules/email/email.service';
import { UpdateUserDTO } from './dto/update-user.dto';
import { Message } from 'src/shared/messages/message';

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

    return { message: 'User created successfully', token: token, email: result.email, name: result.username }
  }

  async updateUser(id: string, dto: UpdateUserDTO): Promise<Message> {

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { email } = user;

    if (dto.password) {
      dto.password = await hashPassword(dto.password);
    }

    if (dto.email && dto.email != email) {
      await this.throwIfEmailIsUsed(dto.email);
      dto.isEmailVerified = false;
    }

    await this.userRepository.updateUser(id, dto);
    return { message: 'User updated successfully' }
  }

  async findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  async findById(id: string) {
    return this.userRepository.findById(id);
  }

  private async throwIfEmailIsUsed(email: string) {
    const user = await this.findByEmail(email);

    if (user) throw new BadRequestException('This email is already used.')
  }
}
