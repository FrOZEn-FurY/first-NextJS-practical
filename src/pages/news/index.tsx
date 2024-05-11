import Link from 'next/link'; // It does what is was doing in react-router-dom, this makes the links respect single-page application.
import { NextPageWithLayout } from '../_app';
import MainLayout from '@/layouts/mainLayout';
import { NextPage } from 'next';

const News: NextPageWithLayout<NextPage> = () => { // Here is the second method using the function getLayout.
  const news: {id: number; title: string}[] = [
    {
      id: 1,
      title: 'News 1',
    },
    {
      id: 2,
      title: 'News 2',
    },
    {
      id: 3,
      title: 'News 3',
    },
  ];

  return (
    <>
      <h1>News page, We use Link here.</h1>
      {news.map((item) => {
        return (
          <>
            <Link href={`/news/${item.id}`} key={item.id}>
              {item.title}
            </Link>
            <br />
          </>
        );
      })}
    </>
  );
}

News.getLayout = function getLayout(page: React.ReactElement) { // We declare function getLayout for this component here, it gets called in the app.tsx.
  return <MainLayout>{page}</MainLayout>
}

export default News;

// This is the route /news. The routing works as directories inside the directory pages.
