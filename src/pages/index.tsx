import {context as Context} from '@/contexts/mainContext';
import MainLayout from '@/layouts/mainLayout';
import {useContext} from 'react';
import Image from 'next/image'; // Optimized image tag of next.
import image from '../../public/image.jpg'; // Import the local image.
import {Anonymous_Pro} from 'next/font/google'; // All the google fonts are declared here. You can import, as use it as below.
import dynamic from 'next/dynamic'; // This is how we do lazy loading.
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const GoogleRecaptcha = dynamic(() => import('../components/googleRecaptcha'), { // It gets the module, and places it inside the variable, do it optimizations and the opmtimazitions we want.
  ssr: false, // This says that Server Side Rendering should be done or not.
  loading: () => <div>Loading...</div>, // Till the component gets loaded completely, Loading will show up.
}); // If the module is not export defaulted, then you have to combine import function with a .then(mod) => mod.YourModule. That means take the promise and get the module from the module function of the file.

const anny = Anonymous_Pro({weight: '400', subsets: ['latin']}); // You can use any subsets you want, and also use the font as two type, css in jsx and classname. Here we use class name and in the app.tsx we use jsx in css.

const url = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD'; // This is incompleted due to its long length.

export default function Home() {
  const context = useContext(Context); // And this is how we use our context.

  return (
    // Priority is the prop that says this image is in a higher order so it must gets loaded faster.
    <MainLayout>
      <h1>Home. Welcome {context.user?.name}.</h1>
      <GoogleRecaptcha />
      <div
        className={anny.className} // This is how we use the class name of the font created to give the font, this font is pre-loaded and is so optimized to use.
        style={{
          backgroundColor: 'black',
          color: 'white',
          borderRadius: '10px',
          padding: '10px',
          margin: '5px',
        }}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
        delectus laborum minus nemo tempora fugit enim impedit, vitae eligendi
        ratione eaque omnis dolorum! Aperiam quo officia voluptatem, cum commodi
        eligendi! Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Excepturi ducimus esse voluptatum alias deleniti corrupti beatae illum
        autem! Ullam impedit magni delectus repellat mollitia ea unde odit?
        Blanditiis veniam harum nobis delectus praesentium earum atque
        repellendus nesciunt? Enim amet, nam tenetur consequatur nihil
        recusandae aliquam doloribus quas omnis, error soluta.
      </div>
      <h1
        style={{
          color: 'green',
          backgroundColor: 'gray',
          padding: '5px',
          margin: '5px',
          textAlign: 'center',
        }}
        id="farsi"
      >
        سلام انسان ها!
      </h1>
      <div
        style={{
          position: 'relative',
          width: '500px',
          height: '500px',
          display: 'inline-block',
        }}
      >
        <Image
          src={image}
          alt="image"
          className="display:inline-block"
          priority={true}
          fill={true}
        />
      </div>
      <Image
        src={image}
        alt="image"
        width={1000}
        height={500}
        className="display:inline-block"
        placeholder="blur"
        blurDataURL={url}
      />
      <Image
        src={'https://picsum.photos/200'}
        alt="image"
        width={1000}
        height={500}
        className="display:inline-block"
        placeholder="blur"
        blurDataURL={url}
      />
    </MainLayout>
  ); // If we don't give width and height to the image tag, it optimizes the image by default, and if we give them, it will optimize the image based on them.
} // blurDataUrl is used to get shown while the image is not loaded yet. It must be combined with placeholder='blur', and the image must be a encoded base64.
// Prop fill says that this image must be filled based on the parent lengths, it gives a position='absolute' to the tag.

// index does not get a url route.

export const getServerSideProps = async (context: any) => {
  return {
    /* ...(await serverSideTranslations(context.locale)), */ // For some reason locale does not work like this, and must be used and passed through query params.
    props: {}
  }
}
