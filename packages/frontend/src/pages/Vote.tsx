import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPoll, votePoll } from '../services/api';
import { PollModel } from '../models/poll';

export function Vote(): JSX.Element {
  const navigate = useNavigate();
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
    console.log('optionID:', optionID);
    await votePoll(pollID as string, optionID);
    navigate(`/poll/${pollID}/result`);
  }

  return (
    <div className='h-full w-full flex flex-col items-start justify-start' >
      <h1 className='self-center' >{poll?.title}</h1>
      <form onSubmit={handleSubmit} className='h-full w-full flex flex-col items-start justify-start'>
        <p className='mt-16 font-bold text-4xl self-center' >{poll?.question}</p>
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
        <div className='self-end justify-self-end w-2/3 flex items-center justify-between' >
          <button className="mt-10 mb-20 px-20 py-4 border-none rounded-md bg-blue-900" type="submit">SUBMIT</button>
          <button className="mt-10 mb-20 px-8 py-3 border-none rounded-md bg-blue-900">Show Result</button>
        </div>
      </form>
    </div>
  );
}
