// @ts-nocheck

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET') {
        res.status(400).json({message: "Method is not allowed."});
    }
    const token = req.cookies.token ?? req.headers.token;
    if (!token) {
        res.status(400).json({message: "Getting token failed. User not logged in."});
    }
    const decodedToken = jwt.verify(token, 'Secret');
    if (!decodedToken) {
        res.status(400).json({message: "Docoding failed. User not logged in."});
    }
    const user = await prisma.user.findFirst({
        where: {
            id: decodedToken.id
        },
        select: {
            id: true,
            name: true,
            email: true
        }
    });
    res.status(200).json({user: user});
}