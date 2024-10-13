import { CookieOptions } from "express";

export const cookieConfig: CookieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true
}