import { Request } from 'express'

export interface AuthRequest extends Request {
    body: {
        email: string;
        password: string;
    }
}