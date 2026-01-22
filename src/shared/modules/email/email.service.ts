import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Transporter, createTransport } from "nodemailer"
import { SendEmailDTO } from "./dto/send-email.dto";

@Injectable()
export class EmailService {
    private transporter: Transporter

    public constructor(private readonly configService: ConfigService) {
        this.transporter = createTransport({
            service: "Gmail",
            auth: {
                user: this.configService.get<string>("EMAIL_ADDRESS"),
                pass: this.configService.get<string>("EMAIL_PASSWORD"),
            },
        });
    }

    public async sendMail(sendEmailDto: SendEmailDTO): Promise<void> {
  try {
    await this.transporter.sendMail({
      from: `"Chat-Platform" <${this.configService.get<string>("EMAIL_ADDRESS")}>`,
      ...sendEmailDto,
    });
  } catch (err) {
    console.error('NODEMAILER ERROR:', err);
    throw err;
  }
}
    public createHTML(username: string): string{
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Email Verification</title>
            </head>
            <body style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: Arial, sans-serif;">
                <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                    <td align="center" style="padding: 40px 0;">
                    <table width="100%" max-width="500px" style="background: #ffffff; border-radius: 8px; padding: 32px;">
                        
                        <tr>
                        <td style="text-align: center; padding-bottom: 24px;">
                            <h2 style="margin: 0; color: #111827;">Verify your email</h2>
                        </td>
                        </tr>

                        <tr>
                        <td style="color: #374151; font-size: 16px; line-height: 24px;">
                            <p style="margin: 0 0 16px 0;">
                            Hi <strong>${username}</strong>,
                            </p>
                            <p style="margin: 0 0 24px 0;">
                            Thanks for signing up! Please confirm your email address by clicking the button below.
                            </p>
                        </td>
                        </tr>

                        <tr>
                        <td align="center" style="padding-bottom: 24px;">
                            <a
                            href="verificationLink"
                            style="
                                display: inline-block;
                                padding: 12px 24px;
                                background-color: #25d366;
                                color: #ffffff;
                                text-decoration: none;
                                font-weight: bold;
                                border-radius: 6px;
                            "
                            >
                            Verify Email
                            </a>
                        </td>
                        </tr>

                        <tr>
                        <td style="color: #6b7280; font-size: 14px; line-height: 20px;">
                            <p style="margin: 0 0 8px 0;">
                            If the button doesn’t work, copy and paste this link into your browser:
                            </p>
                            <p style="word-break: break-all; color: #2563eb; margin: 0;">
                            verificationLink
                            </p>
                        </td>
                        </tr>

                        <tr>
                        <td style="padding-top: 32px; color: #9ca3af; font-size: 12px; text-align: center;">
                            <p style="margin: 0;">
                            If you didn’t create an account, you can safely ignore this email.
                            </p>
                        </td>
                        </tr>

                    </table>
                    </td>
                </tr>
                </table>
            </body>
            </html>
            `;
    }
}
