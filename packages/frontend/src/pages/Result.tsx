import { useEffect, useState, Suspense } from 'react';
import { useParams } from 'react-router-dom';

import { socket } from '../services/socket';
import { getPoll } from '../services/api';
import { PollModel } from '../models/poll';
import { Loading } from '../components/Loading';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

export function Result(): JSX.Element {
  const { pollID } = useParams();
  const [poll, setPoll] = useState<PollModel | null>(null);
  const [data, setData] = useState<ChartData<"bar", number[], string>>({
    labels: [],
    datasets: [],
  });

  const generateColor = () => {
    return (Math.random().toString(16).substr(-6));
  };

  useEffect(() => {
    const fetchPoll = async () => {
      const poll = await getPoll(pollID as string);
      setPoll(poll);
    }
    fetchPoll();

    socket.on('connect', () => {
      socket.emit('join-poll', { pollID });
    });
    socket.on('updated-votes', (data: PollModel) => {
      setPoll(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (poll) {
      setData({
        labels: ['votes'],
        datasets: poll.options.map((option) => {
          const color = generateColor();
          return ({
            label: option.description,
            data: [option?.votes || 0],
            backgroundColor: `#${color}`,
          })
        }),
      });
    }

  }, [poll]);

  // aqui fazer conexão via websocket para atualizar os resultados em tempo real


  return (
    <div className='h-full w-full flex flex-col items-start justify-start' >
      <h1 className='self-center' >{poll?.title}</h1>
      <p className='mt-16 font-bold text-4xl self-center' >{poll?.question}</p>
      <Suspense fallback={<Loading />}>
        <Bar options={options} data={data} />
      </Suspense>
    </div>
  );
}
