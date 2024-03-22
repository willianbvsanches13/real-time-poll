import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AppContext } from '../context';

export function Header(): JSX.Element {
  const { lastPage, lastPagePath } = useContext(AppContext);

  return (
    <header className="fixed top-0 w-full h-20 bg-slate-800 left-0 grid grid-flow-col grid-cols-3" >
      <nav className="flex px-5 py-3 text-gray-700 rounded-lg dark:border-gray-700" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
              <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              Home
            </Link>
          </li>
          {lastPage && (
            <li>
              <div className="flex items-center">
                <svg className="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                </svg>
                <Link to={lastPagePath} className="whitespace-nowrap ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">{lastPage}</Link>
              </div>
            </li>
          )}
        </ol>
      </nav>

      <span className="self-center sm:text-xs md:text-2xl lg:text-4xl xl:text-5xl" >Real Time Poll App</span>
    </header>
  );
}
