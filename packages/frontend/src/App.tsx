import { Routes, Route } from 'react-router-dom';
import { Home, NewPoll, Vote, Result } from './pages';

import './App.css';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/poll/new" element={<NewPoll />} />
      <Route path="/poll/:pollID/vote" element={<Vote />} />
      <Route path="/poll/:pollID/result" element={<Result />} />
    </Routes>
  )
}

export default App
