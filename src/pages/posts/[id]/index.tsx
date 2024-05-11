import {api} from '../../services';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface Post {
  id: number;
  title: string;
  content: string;
  published: boolean;
  author: {
    name: string;
    id: number;
  };
}

const Posts = (props: {post: Post}): JSX.Element => {
  return (
    <>
      <div className="card" key={props.post.id}>
        <div className="card-header">{props.post.author.name} tweeted this</div>
        <div className="card-body">
          <h1>{props.post.title}</h1>
          {props.post.content}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (context: any) => {
    const id = context.params.id;
  const post = await api.get(`/posts/${id}`);
  return {
    /* ...(await serverSideTranslations(context.locale)), */ // For some reason locale does not work like this, and must be used and passed through query params.
    props: {post: post.data}
  };
};

/**
 * As shown below, this is how we use getStaticProps for dynamic urls.
 */

// export const getStaticProps = async (context: any) => {
//   const id = context.params.id;  
//   const post = await api.get(`/posts/${id}`);
//   return {props: {post: post.data}};
// }

// export const getStaticPaths = async () => {
//   const posts = await api.get('/posts');
//   const paths = posts.data.map((post: Post) => ({
//     params: {id: post.id.toString()},
//   }));
//   return {paths, fallback: true};
// }

export default Posts;
