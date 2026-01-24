import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';
import { SendEmailDTO } from './dto/send-email.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

 @Post('test')
async testEmail() {
  await this.emailService.sendMail({
    to: 'yourgmail@gmail.com',
    subject: 'Test Email',
    html: '<h2>Nodemailer is working</h2>',
  });

  return { message: 'sent' };
}

}
