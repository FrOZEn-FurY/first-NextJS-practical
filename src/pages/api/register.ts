import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

interface UserDataSent {
    email: string;
    name: string,
    password: string,
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        res.status(403).json({message: "Method not allowed."})
    }
    const data: UserDataSent = req.body;
    let user = await prisma.user.findFirst({
        where: {
            email: data.email
        }
    })
    if (user) {
        res.status(400).json({message: "User already exists."})
    }
    const salt = await bcrypt.genSalt(10); // Number of hashings that must be oprated.
    const password = await bcrypt.hash(data.password, salt);
    user = await prisma.user.create({
        data: {
            email: data.email,
            name: data.name,
            password: password
        }   
    })
    res.status(200).json({user: user, message: "Register successful."});
}