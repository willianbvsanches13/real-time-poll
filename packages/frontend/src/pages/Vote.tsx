import { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPoll, votePoll } from '../services/api';
import { PollModel } from '../models/poll';
import { AppContext } from '../context';

export function Vote(): JSX.Element {
  const navigate = useNavigate();
  const { setLastPagePath, setLastPage } = useContext(AppContext);
  const { pollID } = useParams();
  const [poll, setPoll] = useState<PollModel | null>(null);

  useEffect(() => {
    const fetchPoll = async () => {
      const poll = await getPoll(pollID as string);
      setPoll(poll);
    }
    fetchPoll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const optionID = formData.get('option') as string;
    await votePoll(pollID as string, optionID);

    handleNavigate();
  }

  const handleNavigate = () => {
    setLastPagePath(`/poll/${pollID}/vote`);
    setLastPage('Vote');
    navigate(`/poll/${pollID}/result`);
  }

  return (
    <div className='h-full w-full flex flex-col items-start justify-start' >
      <h1 className='self-center text-4xl mt-10 sm:text-6xl md:text-6xl lg:text-6xl xl:text-6xl 2xl:text-6xl' >{poll?.title}</h1>
      <form onSubmit={handleSubmit} className='h-full w-full flex flex-col items-start justify-start'>
        <p className='mt-16 font-bold self-center text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl' >{poll?.question}</p>
        <div className=' flex flex-col items-start mt-11' >
          {poll?.options.map((option) => (
            <div key={option.id}>
              <input
                type="radio"
                name="option"
                id={option.id}
                value={option.id}
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                required
              />
              <label
                htmlFor={option.id}
                className='ml-4  text-2xl'
              >{option.description}</label>
            </div>
          ))}
        </div>
        <div className='sm:self-end md:self-end lg:self-end xl:self-end 2xl:self-end sm:justify-self-end md:justify-self-end lg:justify-self-end xl:justify-self-end 2xl:justify-self-end w-2/3 flex items-center justify-between' >
          <button className="sm:px-20 md:px-20 lg:px-20 xl:px-20 2xl:px-20 mt-10 mb-20 px-10 py-4 border-none rounded-md bg-blue-900" type="submit">SUBMIT</button>
          <button onClick={handleNavigate} className="whitespace-nowrap ml-4 sm:ml-0 md:ml-0 lg:ml-0 xl:ml-0 2xl:ml-0 mt-10 mb-20 px-8 py-3 border-none rounded-md bg-blue-900">Show Result</button>
        </div>
      </form>
    </div>
  );
}
