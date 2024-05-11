import {Html, Head, Main, NextScript} from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head lang="en">
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Next.js App Directory" />
        <meta name="author" content="Next.js App Directory"></meta>
        <meta charSet="utf-8"></meta>
        <title>Next.js App</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossOrigin='anonymous'/>
      </Head>
      <body>
        <Main />
        <NextScript />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossOrigin='anonymous'/>
      </body>
    </Html>
  );
}

// This file is the index.html file (public folder). We can make the structure of the site here and design it how ever we want.
