import { Routes, Route } from 'react-router-dom';
import { Home, NewPoll, Vote } from './pages';

import './App.css';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/poll/new" element={<NewPoll />} />
      <Route path="/poll/:pollID/vote" element={<Vote />} />
    </Routes>
  )
}

export default App
