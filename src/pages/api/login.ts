import {NextApiRequest, NextApiResponse} from 'next';
import {PrismaClient} from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

interface UserLoginData {
  email: string;
  password: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(400).json({message: 'Method is not allowed.'});
  }
  const data: UserLoginData = req.body;
  let user = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });
  if (!user) {
    res.status(400).json({message: 'User not found.'});
  } else {
    if (await bcrypt.compare(data.password, user.password)) {
      const token = jwt.sign({id: user.id}, 'Secret', {expiresIn: '1d'});
      res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/`); // We are signing the token in the cookie.
      res.status(200).json({user: user, message: 'Login successful.'});
    } else {
      res.status(400).json({message: 'Wrong password.'});
    }
  }
}
