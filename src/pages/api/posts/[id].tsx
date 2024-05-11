import {NextApiRequest, NextApiResponse} from 'next';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.status(403).json({message: 'Method not allowed.'});
  }
  const {id} = req.query;
  const post = await prisma.post.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      author: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });
  res.status(200).json(post);
}
