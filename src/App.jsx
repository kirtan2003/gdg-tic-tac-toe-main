// import { useState } from 'react'

// import './App.css'
// import TicTacToe from './components/Tictactoe'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <div className='flex items-center justify-center'>

//       {/* <TicTacToe/> */}
      
//     </div>
//   )
// }

// export default App

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StartGame from './pages/StartGame';
import Game from './pages/Game';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Game />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;
