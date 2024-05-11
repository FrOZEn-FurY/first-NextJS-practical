import {context} from '@/contexts/mainContext';
import {api} from '@/pages/services';
import Link from 'next/link';
import {useRouter} from 'next/router';
import React, {useContext} from 'react';
import { useTranslation } from 'react-i18next';

interface IMainLayoutProps {
  // Interface for props.
  children: React.ReactNode;
}

export default function MainLayout({children}: IMainLayoutProps) {
  const ctx = useContext(context);
  const router = useRouter();
  const {t} = useTranslation(); // Translate using the created dictionary.

  const handleClick = async (event: React.MouseEvent) => {
    event.preventDefault();
    try {
      const response = await api.get('/logout');
      alert(response.data.message);
      router.reload();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  // As you see it gets its children and puts them inside the layout. This is the method of using the component.
  return (
    <>
      <header>
        <nav className="navbar bg-dark" data-bs-theme="dark">
          <div className="container-fluid justify-content-start">
            <Link className="navbar-brand m-3 mt-0 mb-0 ms-0" href="/">
              {t('home')}
            </Link>
            {ctx.isLoggedIn() ? (
              <>
                <button
                  className="btn btn-outline-danger m-3 mt-0 mb-0"
                  onClick={handleClick}
                >
                  {t('logout')}
                </button>
                <Link className="btn btn-outline-info" href="/posts/add">
                  {t('addnewpost')}
                </Link>
              </>
            ) : (
              <>
                <Link
                  className="navbar-link text-decoration-none m-3 mt-0 mb-0"
                  href="/login"
                >
                  {t('login')}
                </Link>
                <Link
                  className="navbar-link text-decoration-none m-3 mt-0 mb-0"
                  href="/register"
                >
                  {t('register')}
                </Link>
              </>
            )}
            <Link
              className="navbar-link text-decoration-none m-3 mt-0 mb-0"
              href="/posts"
            >
              {t('posts')}
            </Link>
          </div>
        </nav>
      </header>
      <main>{children}</main>
      <footer
        className="container-fluid bg-dark text-white text-center mt-2"
        style={{height: '100px'}}
      >
        All rights reserved.
      </footer>
    </>
  );
}

// Layout is the same thing for all pages, like footer, header, etc.
// In the method of using pages, there are two ways to use it. The first way is using the getLayout function, and the second way is using the Layout component.
// We will implement both in Home and News components.
