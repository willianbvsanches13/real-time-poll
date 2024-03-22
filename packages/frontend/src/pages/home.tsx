/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppContext } from '../context';

export function Home(): JSX.Element {
  const navigate = useNavigate();
  const { setLastPagePath, setLastPage } = useContext(AppContext);

  useEffect(() => {
    document.title = "Home";
    setLastPage("");
    setLastPagePath("");
  }, []);

  return (
    <div className='h-full w-full flex items-center justify-center'>
      <button className='mt-10 mb-20 px-20 py-4 border-none rounded-md bg-blue-900' onClick={() => navigate('/poll/new')} style={{ fontSize: 40 }} >Create New Poll</button>
    </div>
  );
}
