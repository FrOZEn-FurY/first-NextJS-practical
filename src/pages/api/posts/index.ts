import {NextApiRequest, NextApiResponse} from 'next';
import {PrismaClient} from '@prisma/client';
import {api} from '../../services';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
      },
      include: {
        author: {
          select: {
            name: true,
            id: true,
          },
        }
      }
    });
    res.status(200).json(posts);
  } else if (req.method === 'POST') {
    const {title, content, published} = req.body;
    console.log(title, content, published);
    try {
      const user = await api.get('/getUser', {
        headers: {
          token: req.cookies.token,
        },
      });
      if (!user.data.user) {
        res.status(400).json({message: 'User not logged in.'});
      }
      const post = await prisma.post.create({
        data: {
          title,
          content,
          authorId: user.data.user.id,
          published,
        },
      });
      res.revalidate("/posts"); // Revalidate on each change.
      res.status(200).json(post);
    } catch (error) {
      console.log((error as Error).message);
    }
  } else if (req.method === 'PUT') {
    const {id} = req.query;
    const {title, content, published} = req.body;
    try {
      const updatedPost = await prisma.post.update({
        where: {
          id: Number(id),
        },
        data: {
          title,
          content,
          published,
        },
      });
      res.revalidate("/posts"); // Revalidate on each change.
      res.status(200).json(updatedPost);
    } catch (e) {
      res.status(404).json({message: 'Post not found'});
    }
  } else if (req.method === 'DELETE') {
    const {id} = req.query;
    try {
      const deletedPost = await prisma.post.delete({
        where: {
          id: Number(id),
        },
      });
      res.status(200).json(deletedPost);
    } catch (e) {
      res.status(404).json({message: 'Post not found'});
    }
  }
}
