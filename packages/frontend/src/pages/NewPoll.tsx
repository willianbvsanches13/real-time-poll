import { useState, useContext } from 'react';
import Datepicker, { DateValueType } from 'react-tailwindcss-datepicker';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { AppContext } from '../context';

type Option = {
  id: number;
  value: string;
}

export function NewPoll(): JSX.Element {
  const navigate = useNavigate();
  const { setLastPagePath, setLastPage } = useContext(AppContext);
  const [dates, setDates] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });

  const [options, setOptions] = useState<Option[]>([{
    id: 1,
    value: "",
  }]);

  const [title, setTitle] = useState<string>("")
  const [question, setQuestion] = useState<string>("")
  const [canChangeVote, setCanChangeVote] = useState<boolean>(false)

  const handleValueChange = (newValue: DateValueType) => {
    console.log("newValue:", newValue);
    setDates(newValue);
  }

  const handleRemoveOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  }

  const handleAddOption = () => {
    setOptions([...options, { id: options.length + 1, value: "" }]);
  }

  const handleUpdateOption = (index: number, value: string) => {
    setOptions(options.map((option, i) => {
      if (i === index) {
        return { id: option.id, value: value };
      }
      return option;
    }));
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!dates?.startDate || !dates?.endDate) {
      return;
    }
    const body = JSON.stringify({
      title: title,
      question: question,
      options: options.map((option) => ({ description: option.value })),
      can_change_vote: canChangeVote,
      start_at: new Date(Date.parse(dates?.startDate as string)).toISOString(),
      end_at: new Date(Date.parse(dates?.endDate as string)).toISOString(),
    });

    try {
      const { data } = await axios.post("http://localhost:3000/api/polls", body, {
        headers: {
          "Content-Type": "application/json",
        }
      });
      setLastPage("New Poll");
      setLastPagePath(`/poll/new`);
      navigate(`/poll/${data.id}/vote`);
    } catch (error) {
      alert("Error creating poll");
      console.error(error);
    }
  }

  return (
    <div className="w-full h-full">
      <h1 className='text-4xl mt-10 sm:text-6xl md:text-6xl lg:text-6xl xl:text-6xl 2xl:text-6xl'>Create New Poll</h1>
      <form className="h-full w-full" onSubmit={handleSubmit}>
        <div className="form-group h-full w-full flex flex-col items-center justify-center sm:flex-row md:flex-row lg:flex-row xl:flex-row 2xl:flex-row">
          <div className="self-start mt-24 left-form-group flex flex-col items-start h-3/6 w-full sm:w-5/12 md:w-5/12 lg:w-5/12 xl:w-5/12 2xl:w-5/12">
            <label className="mt-8" htmlFor="title">Title</label>
            <input placeholder='Poll for ...' className="h-10 w-5/6 mr-3 border-none rounded-md pl-3 dark:bg-slate-800" type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <label className="mt-8" htmlFor="question">Question</label>
            <textarea placeholder='What kind of ...' className="h-24 w-5/6 mr-3 border-none rounded-md pl-3 pt-2 dark:bg-slate-800" id="question" name="question" value={question} onChange={(e) => setQuestion(e.target.value)} />
            <label className="mt-8 mb-8" htmlFor="option1">Options</label>
            <>
              {options.map((option, index) => {
                return (
                  <div key={option.id} className="flex flex-row items-center justify-start w-full mt-2">
                    <input className="h-10 w-9/12 mr-3 border-none rounded-md pl-3 dark:bg-slate-800" placeholder="New Option" value={option.value} onChange={(e) => { handleUpdateOption(index, e.target.value) }} type="text" />
                    {options.length > 1 && <button onClick={() => { handleRemoveOption(index) }} className="px-4 py-2 border-none rounded-md bg-red-900" type="button">-</button>}
                    {index === options.length - 1 && <button onClick={handleAddOption} className="px-4 py-2 border-none rounded-md bg-blue-900 ml-1" type="button">+</button>}
                  </div>
                );
              })}
            </>

          </div>
          <div className="self-start right-form-group flex flex-col items-start justify-between h-3/6 w-full sm:w-5/12 md:w-5/12 lg:w-5/12 xl:w-5/12 2xl:w-5/12 sm:mt-24 md:mt-24 lg:mt-24 xl:mt-24 2xl:mt-24 mt-0 sm:pt-8 md:pt-8 lg:pt-8 xl:pt-8 2xl:pt-8 ">
            <div>
              <div className="flex flex-col items-start" >
                <label className="ml-1" htmlFor="date">Start Date ~ End Date</label>
                <Datepicker
                  value={dates}
                  onChange={handleValueChange}
                  showShortcuts={true}
                />
              </div>
              <div className="flex items-center mt-10">
                <input checked={canChangeVote} onChange={(e) => setCanChangeVote(e.target.checked)} id="change-vote" type="checkbox" className="mt-4 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="change-vote" className="mt-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Can change vote?</label>
              </div>
            </div>
            <button className="mb-20 px-20 py-4 border-none rounded-md bg-blue-900" type="submit">Create Poll</button>
          </div>
        </div>
      </form>
    </div>
  );
}
