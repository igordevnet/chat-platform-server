import { Attachment } from "nodemailer/lib/mailer";

export class SendEmailDTO {
  public to: string;
  public subject: string;
  public html: string;
  public attachments?: Attachment[];
}