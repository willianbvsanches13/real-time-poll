import { Routes, Route } from 'react-router-dom';
import { Home, NewPoll, Vote, Result } from './pages';
import { Header } from './components/Header';
import { AppProvider } from './context';

import './App.css';

function App() {
  return (
    <div className='h-full w-full mt-14' >
      <AppProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/poll/new" element={<NewPoll />} />
          <Route path="/poll/:pollID/vote" element={<Vote />} />
          <Route path="/poll/:pollID/result" element={<Result />} />
        </Routes>
      </AppProvider>
    </div>
  )
}

export default App
