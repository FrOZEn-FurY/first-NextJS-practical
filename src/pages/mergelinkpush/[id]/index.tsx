import {useRouter} from 'next/router';

const PageNewItem = (): JSX.Element => {
  const router = useRouter();

  return (
    <>
      <h1>The new page {router.query.id ?? '...'}</h1>
    </>
  );
};

export default PageNewItem;
