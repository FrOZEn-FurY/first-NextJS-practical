import {useRouter} from 'next/router';

export default function TheNews() {
  const newsID = useRouter().query; // We take out the id from url using the useRouter hook and the parameter query from it.
  return (
    <>
      <h1>News ID: {newsID.id}</h1>
    </>
  );
}

// This page is dynamic, meaning that with the [id], it gives an id from the url (route).
