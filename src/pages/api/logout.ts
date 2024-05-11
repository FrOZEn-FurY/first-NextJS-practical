import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET') {
        res.status(403).json({message: "Method not allowed."})
    }
    res.setHeader("Set-Cookie", "token=; HttpOnly; Path=/");
    res.status(200).json({message: "Logout successful."});
}