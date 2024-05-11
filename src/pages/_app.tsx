import MainContext from "@/contexts/mainContext";
import { NextPage } from "next";
import { AppProps } from "next/app";
import localFont from 'next/font/local' // Local font usage.
import { appWithTranslation } from "next-i18next";

const myFont = localFont({src: '../assets/fonts/farsifont.ttf'}) // Just give the source to it.

export type NextPageWithLayout<props> = { // Make new page type.
    getLayout?: (page: React.ReactElement) => React.ReactNode;
}

type AppPropsWithLayout<props> = { // Make a new props type.
    Component: NextPageWithLayout<props>
} & AppProps

function App({ Component, pageProps }: AppPropsWithLayout<NextPage>) {
    const getLayout = Component.getLayout ?? ((page) => page); // Looks for the getLayout function and stores it in the getLayout variable.
    return (
        <>
            <style jsx global>{ // This is the method css in js for giving the font styles and other stuffs.
            `
                #farsi {
                    font-family: ${myFont.style.fontFamily};
                }
            `}</style>
            <MainContext>{getLayout(<Component {...pageProps} />)}</MainContext> 
            {
                // Rendering the component using the getLayout function, we also used the MainContext component to provide the context.
            }
        </>
    );
}

export default appWithTranslation(App);