import { NextApiRequest, NextApiResponse } from "next";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const path = req.query.path as string;
    res.revalidate(path);
    res.status(200).json({message: "Revalidation successful."});
} // On demand revalidation.