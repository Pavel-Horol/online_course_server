import { CookieOptions, Response } from "express";

export const setCookie = (res: Response, name: string, value: string, options: object = {}) => {
    const defaultOptions = {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: 2 * 24 * 60 * 60 * 1000, // 2days
        ...options
    } as CookieOptions

    res.cookie(name, value, defaultOptions)
}