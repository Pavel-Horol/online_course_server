import nodemailer from 'nodemailer'

class MailService {
    public transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });
    }
    async sendActivationMail(to: string, link: string) {
        try{
            await this.transporter.sendMail({
                from: process.env.SMTP_USER,
                to,
                subject: "Activation Link for " + process.env.API_URL,
                text: '',
                html: `
                <div>
                    <h1>For activation go to the link below</h1>
                    <a href="${link}">${link}</a>
                </div>
            `})
        }catch(error) {
            console.log("mail service", error)
        }
    }
}

export default new MailService()