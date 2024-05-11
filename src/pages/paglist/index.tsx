import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

const PageList = () => {
  const [selectedId, setSelectedId] = useState(0);
  const router = useRouter(); // Router has a lot of cool other features beside below as well, like back method which works just like the back method.

  useEffect(() => {
    const id = router.query.id;
    if (id) {
      setSelectedId(Number(id));
    }
  });

  return (
    <>
      <h1>Page List</h1>
      <ul>
        <li>
          <button
            style={{
              backgroundColor: selectedId === 1 ? 'red' : 'blue',
              display: 'block',
              marginTop: '10px',
              blockSize: '50px',
            }}
            id="1"
            onClick={handleClick}
          >
            Click 1
          </button>
        </li>
        <li>
          <button
            style={{
              backgroundColor: selectedId === 2 ? 'red' : 'blue',
              display: 'block',
              marginTop: '10px',
              blockSize: '50px',
            }}
            id="2"
            onClick={handleClick}
          >
            Click 2
          </button>
        </li>
        <li>
          <button
            style={{
              backgroundColor: selectedId === 3 ? 'red' : 'blue',
              display: 'block',
              marginTop: '10px',
              blockSize: '50px',
            }}
            id="3"
            onClick={handleClick}
          >
            Click 3
          </button>
          <button
            style={{
              backgroundColor: 'darkslategray',
              display: 'block',
              marginTop: '10px',
              blockSize: '50px',
            }}
            onClick={() => {
              router.push('/'); // This is the push method we know.
            }}
          >
            This button will push you to home.
          </button>
          <button
            style={{
              backgroundColor: 'darkslategray',
              display: 'block',
              marginTop: '10px',
              blockSize: '50px',
            }}
            onClick={() => {
              router.replace('/'); // This is the replace method we know.
            }}
          >
            This button will replace you to home.
          </button>
        </li>
      </ul>
    </>
  );

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    router.push(`/paglist/?id=${e.currentTarget.id}`, undefined, {
      // First option is the url and the second one is that it sayd should it be a url or not.
      shallow: true, // For shallow routing, ot generally this object is for meta data ot whatever you say.
    }); // It makes a shallow routing, shallow routing is a routing that only changes the URL, or it is better to say that it adds something to the url without changing it.
    // For example in here it added the id to the url, as a query parameter.
  }
};

export default PageList;
