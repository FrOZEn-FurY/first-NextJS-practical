import Link from 'next/link';
import {api} from '../services';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

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

const Posts = (props: {posts: Post[]}): JSX.Element => {
  return (
    <div className="row">
      {props.posts.map((post) => {
        return (
          <div className="card col-3" key={post.id}>
            <div className="card-header">{post.author.name} tweeted this</div>
            <div className="card-body">
              <h1>{post.title}</h1>
              {post.content}
            </div>
            <div className="card-footer">
              <Link className="btn btn-info" href={`/posts/${post.id}`}>
                Go to post
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const getStaticProps = async (context: any) => {
  const posts = await api.get('/posts');
  return {
    /* ...(await serverSideTranslations(context.locale)), */ // For some reason locale does not work like this, and must be used and passed through query params.
    props: {posts: posts.data}, 
    /* revalidate: 5 */
  }; // Time based revalidation.
};

export default Posts;
