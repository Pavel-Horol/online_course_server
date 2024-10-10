import { createTransport, Transporter } from "nodemailer"
import SMTPTransport from "nodemailer/lib/smtp-transport"

class MailService {
    transporter: Transporter
    constructor() {
        this.transporter = createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        } as SMTPTransport.Options)
    }
    async sendActivationMail(to: string, link: string) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Account activation link on ' + process.env.API_URL,
            text: '',
            html: `
                <div>
                    <h1>Click on the link below to verify email<h1/> 
                    <a href="${link}">${link}</a>
                <div/>
            `
        })
    }
}

export default new MailService()