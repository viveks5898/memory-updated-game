import React, { useEffect, useState } from "react";
import "./App.css";
import Memory from "./Memory/Memory";

function App() {
  const initialData = [
    3, 6, 2, 4, 1, 5, 4, 1, 3, 6, 5, 2, 6, 5, 4, 3, 2, 1, 2, 6, 3, 4, 5, 1, 6,
    2, 4, 3, 1, 5, 1, 6, 3, 2, 5, 4,
  ];

  const [data, setData] = useState(initialData);
  const [showGame, setShowGame] = useState(false);
  const [numShow, setNumShow] = useState([]);
  const [element, setElement] = useState([]);
  const [matched, setMatched] = useState([]);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    if (numShow.length === 2) {
      if (element[0] === element[1]) {
        setMatched((prev) => [...prev, ...numShow]);
      }
      setTimeout(() => {
        setNumShow([]);
        setElement([]);
      }, 1000);
    }
  }, [numShow, element]);

  useEffect(() => {
    if (matched.length === data.length) {
      setGameWon(true);
    }
  }, [matched, data]);

  const handleGameLogic = (key, ele) => {
    if (numShow.length < 2 && !numShow.includes(key) && !matched.includes(key)) {
      setNumShow((prev) => [...prev, key]);
      setElement((prev) => [...prev, ele]);
    }
  };

  const handlePlayAgain = () => {
    setData(shuffleData([...initialData])); // Shuffle the data
    setShowGame(false);
    setNumShow([]);
    setElement([]);
    setMatched([]);
    setGameWon(false);
  };

  // Function to shuffle the data
  const shuffleData = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  return (
    <div className="App">
      <header className="App-header sm:pt-12">
        <h2 className="text-[45px]">Memory Game</h2>
        {!gameWon ? (
          <button
            className="bg-blue-500 text-white font-medium py-1 px-7 sm:mt-8"
            onClick={() => setShowGame(true)}
          >
            Play Game
          </button>
        ) : (
          <div>
            <h2 className="text-[30px] text-green-500">Congratulations! You win the game!</h2>
            <button
              className="bg-blue-500 text-white font-medium py-1 px-7 sm:mt-8"
              onClick={handlePlayAgain}
            >
              Play Again
            </button>
          </div>
        )}
        {showGame && !gameWon && (
          <Memory
            data={data}
            numShow={numShow}
            matched={matched}
            handleGameLogic={handleGameLogic}
          />
        )}
      </header>
    </div>
  );
}

export default App;
