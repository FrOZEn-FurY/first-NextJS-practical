import Link from 'next/link';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

// This is as same as the previous page list example, but with a difference, in the handleClick function, we removed prevent default, at to the both of
// the Link tags, (This is also implemented using Link component), and added a onClickCapture event, but we gave the function to the both events, now it makes
// the page change, and a selectedID change, this means we go to a new page, and also we can see that we went where because of the change in the selectedID.

const Merged = (): JSX.Element => {
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
      <h1>Merge Link Push</h1>
      <ul>
        <li>
          <Link
            href="/mergelinkpush/1"
            id="1"
            onClick={handleClick}
            onClickCapture={handleClick}
            style={{
                backgroundColor: selectedId === 1 ? "gray" : ""
            }}
          >
            Go to the new page 1
          </Link>
        </li>
        <li>
          <Link
            href="/mergelinkpush/2"
            id="2"
            onClick={handleClick}
            onClickCapture={handleClick}
            style={{
                backgroundColor: selectedId === 2 ? "gray" : ""
            }}
          >
            Go to the new page 2
          </Link>
        </li>
      </ul>
    </>
  );

  function handleClick(e: React.MouseEvent) {
    router.push(`/mergelinkpush/?id=${e.currentTarget.id}`, undefined, {
      // First option is the url and the second one is that it sayd should it be a url or not.
      shallow: true, // For shallow routing, ot generally this object is for meta data ot whatever you say.
    }); // It makes a shallow routing, shallow routing is a routing that only changes the URL, or it is better to say that it adds something to the url without changing it.
    // For example in here it added the id to the url, as a query parameter.
  }
};

export default Merged;
