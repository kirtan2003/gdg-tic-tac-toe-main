// import React from 'react';
// import { useState } from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// const WINNING_COMBINATIONS = [
//     [0, 1, 2], [3, 4, 5], [6, 7, 8],
//     [0, 3, 6], [1, 4, 7], [2, 5, 8],
//     [0, 4, 8], [2, 4, 6],
// ];

// const QUESTIONS = [
//     { question: "Evaluate: (25 * 4) / 5 + 12", answer: "32" },
//     { question: "Solve for x: 3x + 7 = 22", answer: "5" },
//     { question: "What is the sum of the first 10 prime numbers?", answer: "129" },
//     { question: "Find the determinant of matrix [[2, 3], [4, 5]]", answer: "-2" },
//     { question: "What is 7! (7 factorial)?", answer: "5040" },
//     { question: "What is the remainder when 123456 is divided by 7?", answer: "4" },
//     { question: "Find the value of log2(32)", answer: "5" },
//     { question: "Convert 101011 (binary) to decimal.", answer: "43" },
//     { question: "Solve: ∫(2x)dx from 0 to 3", answer: "9" },
//     { question: "What is the square root of 144?", answer: "12" },
//     { question: "What is 2^10?", answer: "1024" },
//     { question: "Solve: 5x + 2 = 17", answer: "3" },
//     { question: "Find the derivative of x^2", answer: "2x" },
//     { question: "What is the area of a circle with radius 7?", answer: "153.94" },
//     { question: "Solve for x: 2x - 4 = 10", answer: "7" },
// ];

// const Game = () => {
//     const [board, setBoard] = useState(Array(9).fill(null));
//     const [solved, setSolved] = useState(Array(9).fill(false));
//     const [currentPlayer, setCurrentPlayer] = useState("X");
//     const [selectedIndex, setSelectedIndex] = useState(null);
//     const [answers, setAnswers] = useState(Array(9).fill(""));
//     const [gameOver, setGameOver] = useState(false);
//     const [winner, setWinner] = useState(null);
//     const [draw, setDraw] = useState(false);
//     const [highlightedCells, setHighlightedCells] = useState([]);

//     const [player1Name, setPlayer1Name] = useState("");
//     const [player2Name, setPlayer2Name] = useState("");
//     const [showNameModal, setShowNameModal] = useState(true);

//     const [player1Score, setPlayer1Score] = useState(0);
//     const [player2Score, setPlayer2Score] = useState(0);

//     const [questionSet, setQuestionSet] = useState([]);

//     const shuffleQuestions = () => {
//         const shuffled = [...QUESTIONS];
//         for (let i = shuffled.length - 1; i > 0; i--) {
//             const j = Math.floor(Math.random() * (i + 1));
//             [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//         }
//         setQuestionSet(shuffled);
//     };

//     const handleStartGame = () => {
//         if (player1Name && player2Name) {
//             setShowNameModal(false);
//             shuffleQuestions();
//         } else {
//             alert("Please enter names for both players.");
//         }
//     };

//     const checkWinner = (board) => {
//         for (let [a, b, c] of WINNING_COMBINATIONS) {
//             if (board[a] && board[a] === board[b] && board[a] === board[c]) {
//                 setHighlightedCells([a, b, c]);
//                 return board[a];
//             }
//         }
//         return null;
//     };

//     const isBoardFull = (board) => {
//         return board.every((cell) => cell !== null);
//     };

//     const handleAnswer = () => {
//         if (selectedIndex === null || gameOver || !questionSet[selectedIndex]) return;
//         const currentQuestion = questionSet[selectedIndex];
//         if (answers[selectedIndex] === currentQuestion.answer) {
//             const newBoard = [...board];
//             newBoard[selectedIndex] = currentPlayer;
//             setBoard(newBoard);
//             const newSolved = [...solved];
//             newSolved[selectedIndex] = true;
//             setSolved(newSolved);
//             const winner = checkWinner(newBoard);
//             if (winner) {
//                 setGameOver(true);
//                 setWinner(winner);
//                 winner === "X" ? setPlayer1Score(player1Score + 1) : setPlayer2Score(player2Score + 1);
//             } else if (isBoardFull(newBoard)) {
//                 setGameOver(true);
//                 setDraw(true);
//             } else {
//                 setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
//             }
//             setSelectedIndex(null);
//         } else {
//             alert("Incorrect answer! Try again.");
//         }
//     };

//     const handleRestartGame = () => {
//         setBoard(Array(9).fill(null));
//         setSolved(Array(9).fill(false));
//         setCurrentPlayer("X");
//         setSelectedIndex(null);
//         setAnswers(Array(9).fill(""));
//         setGameOver(false);
//         setWinner(null);
//         setDraw(false);
//         setHighlightedCells([]);
//     };

//     const handleNewGame = () => {
//         setPlayer1Name("");
//         setPlayer2Name("");
//         setPlayer1Score(0);
//         setPlayer2Score(0);
//         handleRestartGame();
//         setShowNameModal(true);
//     };

//     return (
//         <div className="flex max-h-screen w-full bg-gray-900 text-white px-6 py-8">
//             {/* Name Modal */}
//             {showNameModal && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//                     <div className="bg-gray-800 p-6 rounded-lg w-1/3">
//                         <h2 className="text-2xl font-bold mb-4 text-center">Enter Player Names</h2>
//                         <div className="mb-4">
//                             <Input
//                                 type="text"
//                                 placeholder="Player 1 Name"
//                                 value={player1Name}
//                                 onChange={(e) => setPlayer1Name(e.target.value)}
//                                 className="mb-2 text-white w-full"
//                             />
//                         </div>
//                         <div className="mb-4">
//                             <Input
//                                 type="text"
//                                 placeholder="Player 2 Name"
//                                 value={player2Name}
//                                 onChange={(e) => setPlayer2Name(e.target.value)}
//                                 className="mb-2 text-white w-full"
//                             />
//                         </div>
//                         <Button
//                             onClick={handleStartGame}
//                             className="text-sm bg-blue-500 hover:bg-blue-700 px-4 py-2 w-full"
//                         >
//                             Start Game
//                         </Button>
//                     </div>
//                 </div>
//             )}

//             {/* Game Board */}
//             {!showNameModal && (
//                 <div className="w-full flex flex-col items-center justify-center">
//                     {/* Score Display */}
//                     <div className="w-full flex justify-center mb-6">
//                         <div className="flex space-x-12">
//                             <Card className="p-4 bg-gray-800 border border-gray-700 rounded-lg text-center">
//                                 <h3 className="text-lg font-bold">{player1Name}</h3>
//                                 <div className="text-3xl font-bold text-green-500">{player1Score}</div>
//                             </Card>

//                             <Card className="p-4 bg-gray-800 border border-gray-700 rounded-lg text-center">
//                                 <h3 className="text-lg font-bold">{player2Name}</h3>
//                                 <div className="text-3xl font-bold text-green-500">{player2Score}</div>
//                             </Card>
//                         </div>
//                     </div>

//                     <h1 className="text-3xl font-bold mb-6 text-center">
//                         Tic Tac Toe Quiz - {currentPlayer === "X" ? player1Name : player2Name}'s Turn
//                     </h1>
//                     <div className="grid grid-cols-3 gap-6">
//                         {board.map((cell, index) => (
//                             <Card
//                                 key={index}
//                                 className={`p-6 bg-gray-800 border border-gray-700 w-32 h-32 flex items-center justify-center text-center text-5xl font-bold cursor-pointer ${highlightedCells.includes(index) ? "bg-green-500" : ""
//                                     }`}
//                                 onClick={() => !solved[index] && !gameOver && setSelectedIndex(index)}
//                             >
//                                 {cell || (solved[index] ? cell : "?")}
//                             </Card>
//                         ))}
//                     </div>

//                     {gameOver && (
//                         <div className="mt-4 text-xl font-bold text-green-500">
//                             {winner ? `Winner: ${winner === "X" ? player1Name : player2Name}!` : "It's a draw!"}
//                         </div>
//                     )}

//                     <div className="flex space-x-4 mt-8">
//                         <Button
//                             onClick={handleRestartGame}
//                             className="text-sm bg-blue-500 hover:bg-blue-700 px-4 py-2 w-1/2"
//                         >
//                             Restart
//                         </Button>
//                         <Button
//                             onClick={handleNewGame}
//                             className="text-sm bg-blue-500 hover:bg-blue-700 px-4 py-2 w-1/2"
//                         >
//                             New Game
//                         </Button>
//                     </div>
//                 </div>
//             )}

//             {/* Game Controls */}
//             <div className="w-1/3 p-4 bg-gray-800 border-l border-gray-700">
//                 <h2 className="text-xl font-bold mb-4">Solve the Problem</h2>
//                 {selectedIndex !== null && !solved[selectedIndex] && !gameOver && (
//                     <div className="p-4 bg-gray-700 rounded-lg">
//                         <p className="text-xl mb-2">{questionSet[selectedIndex]?.question}</p>
//                         <Input
//                             type="text"
//                             value={answers[selectedIndex]}
//                             onChange={(e) => {
//                                 const newAnswers = [...answers];
//                                 newAnswers[selectedIndex] = e.target.value;
//                                 setAnswers(newAnswers);
//                             }}
//                             className="mb-4 text-white w-full"
//                             placeholder="Your answer"
//                         />
//                         <Button
//                             onClick={handleAnswer}
//                             className="text-sm bg-blue-500 hover:bg-green-700 px-4 py-2 w-full"
//                         >
//                             Submit Answer
//                         </Button>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default Game;




import React, { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import questions from "./../questions"; // Import the questions data
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
];

const Game = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [solved, setSolved] = useState(Array(9).fill(false));
    const [currentPlayer, setCurrentPlayer] = useState("X");
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [answers, setAnswers] = useState(Array(9).fill(""));
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState(null);
    const [draw, setDraw] = useState(false);
    const [highlightedCells, setHighlightedCells] = useState([]);
    const [player1Name, setPlayer1Name] = useState("");
    const [player2Name, setPlayer2Name] = useState("");
    const [showNameModal, setShowNameModal] = useState(true);
    const [player1Score, setPlayer1Score] = useState(0);
    const [player2Score, setPlayer2Score] = useState(0);
    const [questionSet, setQuestionSet] = useState([]);
    const [selectedTheme, setSelectedTheme] = useState("Programming"); // Added state for theme selection

    const audioRef = useRef(null);
    const winAudioRef = useRef(null);

    const shuffleQuestions = () => {
        const shuffled = [...questions[selectedTheme]];  // Use selected theme's questions
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        setQuestionSet(shuffled);
    };

    const handleStartGame = () => {
        if (player1Name && player2Name) {
            setShowNameModal(false);
            shuffleQuestions();
            if (audioRef.current) {
                audioRef.current.play().catch(e => {
                    console.log("Autoplay blocked:", e);
                });
            }
        } else {
            alert("Please enter names for both players.");
        }
    };

    const checkWinner = (board) => {
        for (let [a, b, c] of WINNING_COMBINATIONS) {
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                setHighlightedCells([a, b, c]);
                return board[a];
            }
        }
        return null;
    };

    const isBoardFull = (board) => {
        return board.every((cell) => cell !== null);
    };

    const handleAnswer = () => {
        if (selectedIndex === null || gameOver || !questionSet[selectedIndex]) return;
        const currentQuestion = questionSet[selectedIndex];
        if (answers[selectedIndex] === currentQuestion.answer) {
            const newBoard = [...board];
            newBoard[selectedIndex] = currentPlayer;
            setBoard(newBoard);
            const newSolved = [...solved];
            newSolved[selectedIndex] = true;
            setSolved(newSolved);
            const winner = checkWinner(newBoard);
            if (winner) {
                if (audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0; // Optional: resets to start
                }
                setGameOver(true);
                setWinner(winner);
                if (winAudioRef.current) {
                    winAudioRef.current.play().catch(e => console.log("Win sound blocked:", e));
                }
                winner === "X" ? setPlayer1Score(player1Score + 1) : setPlayer2Score(player2Score + 1);
            } else if (isBoardFull(newBoard)) {
                if (audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0; // Optional: resets to start
                }
                setGameOver(true);
                setDraw(true);
                if (winAudioRef.current) {
                    winAudioRef.current.play().catch(e => console.log("Win sound blocked:", e));
                }
            } else {
                setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
            }
            setSelectedIndex(null);
        } else {
            toast.error("Incorrect answer! Try again.");
        }
    };

    const handleRestartGame = () => {
        setBoard(Array(9).fill(null));
        setSolved(Array(9).fill(false));
        setCurrentPlayer("X");
        setSelectedIndex(null);
        setAnswers(Array(9).fill(""));
        setGameOver(false);
        setWinner(null);
        setDraw(false);
        setHighlightedCells([]);
    };

    const handleNewGame = () => {
        setPlayer1Name("");
        setPlayer2Name("");
        setPlayer1Score(0);
        setPlayer2Score(0);
        handleRestartGame();
        setShowNameModal(true);
    };



    return (
        <div className="flex w-full max-h-screen bg-gradient-to-br from-blue-800 via-black to-blue-800 text-white px-6 py-8">
            {/* Background Music */}
            <audio ref={audioRef} src="/sounds/game-theme.mp3" loop />
            <audio ref={winAudioRef} src="/sounds/final-sound.mp3" />
            <ToastContainer position="top-left" autoClose={3000} hideProgressBar newestOnTop closeButton={true} />
            {/* Name Modal */}

            {showNameModal && (
                <div className="fixed inset-0 bg-gradient-to-br from-blue-800 via-black to-blue-800 bg-opacity-50 flex flex-col gap-20 items-center justify-center">

                    <div><h3 className="font-extrabold text-4xl text-cyan-400 ">QuizTic</h3></div>
                    <div className="bg-gray-800 p-10 bg-opacity-90 rounded-2xl w-1/3 drop-shadow-[0_0_12px_rgba(0,255,255,0.8)] border border-cyan-700">
                        <h2 className="text-2xl font-bold mb-4 text-center">Enter Player Names</h2>
                        <div className="mb-4">
                            <Input
                                type="text"
                                placeholder="Player 1 Name"
                                value={player1Name}
                                onChange={(e) => setPlayer1Name(e.target.value)}
                                className="mb-2 p-3 text-white w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <Input
                                type="text"
                                placeholder="Player 2 Name"
                                value={player2Name}
                                onChange={(e) => setPlayer2Name(e.target.value)}
                                className="mb-2 p-3 text-white w-full"
                            />
                        </div>

                        {/* Theme Selection */}
                        <div className="mb-4">
                            <select
                                value={selectedTheme}
                                onChange={(e) => setSelectedTheme(e.target.value)}
                                className="w-full bg-gray-700 text-white p-2 rounded-lg"
                            >
                                <option value="Programming">Programming</option>
                                <option value="Maths">Maths</option>
                                <option value="English">English</option>
                            </select>
                        </div>

                        <Button
                            onClick={handleStartGame}
                            className="text-sm  bg-gradient-to-br from-blue-700 to-blue-900 hover:bg-blue-200 px-4 py-3 w-full"
                        >
                            Start Game
                        </Button>
                    </div>
                </div>
            )}

            {/* Game Board */}
            {!showNameModal && (
                <div className="w-full flex flex-col items-center justify-center">
                    {/* Score Display */}
                    <div className="w-full flex justify-center mb-6">
                        <div className="flex space-x-12">
                            <Card className="p-3 flex-row items-center bg-gray-800 border border-gray-700 rounded-lg text-center">
                                <h3 className="text-lg font-bold">{player1Name} : </h3>
                                <div className="text-3xl font-bold text-green-500">{player1Score}</div>
                            </Card>

                            <Card className="p-3 flex-row items-center bg-gray-800 border border-gray-700 rounded-lg text-center">
                                <h3 className="text-lg font-bold">{player2Name} : </h3>
                                <div className="text-3xl font-bold text-green-500">{player2Score}</div>
                            </Card>
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold mb-6 text-center">
                        Tic Tac Toe Quiz - {currentPlayer === "X" ? player1Name : player2Name}'s Turn
                    </h1>
                    <div className="grid grid-cols-3 gap-6">
                        {board.map((cell, index) => (
                            <Card
                                key={index}
                                className={`p-6 border border-gray-700 w-32 h-32 flex items-center justify-center text-center text-5xl font-extrabold rounded-xl cursor-pointer transition duration-300 ease-in-out  drop-shadow-[0_0_8px_rgba(0,255,255,0.8)] ${highlightedCells.includes(index) ? "bg-green-500 shadow-[0_0_20px_#22c55e] text-black" : "bg-gray-800 hover:bg-gray-700 border-gray-700"} ${selectedIndex === index ? "ring-4 ring-blue-400" : ""}` }
                                onClick={() => !solved[index] && !gameOver && setSelectedIndex(index)}
                            >
                                {cell || (solved[index] ? cell : "?")}
                            </Card>
                        ))}
                    </div>

                    {gameOver && (
                        <div className="mt-4 text-3xl font-extrabold text-green-500 animate-pulse drop-shadow-[0_0_10px_rgba(34,197,94,0.9)]">
                            {winner ? `Winner: ${winner === "X" ? player1Name : player2Name}!` : "It's a draw!"}
                        </div>
                    )}

                    <div className="flex space-x-4 mt-8">
                        <Button
                            onClick={handleRestartGame}
                            className="text-sm bg-gradient-to-br from-blue-700 to-blue-900 px-4 py-2 w-1/2"
                        >
                            Restart
                        </Button>
                        <Button
                            onClick={handleNewGame}
                            className="text-sm bg-gradient-to-br from-blue-700 to-blue-900 px-4 py-2 w-1/2"
                        >
                            New Game
                        </Button>
                    </div>
                </div>
            )}

            {/* Game Controls */}
            {!showNameModal && ( <div className="w-1/3 p-4 bg-gray-800 border-l drop-shadow-[0_0_12px_rgba(0,255,255,0.8)] border-gray-700">
                <h2 className="text-xl text-center text-blue-400 font-bold mb-4">Solve the Problem</h2>
                {selectedIndex !== null && !solved[selectedIndex] && !gameOver && (
                    <div className="p-4 bg-gray-700 rounded-lg">
                        <p className="text-xl mb-2">{questionSet[selectedIndex]?.question}</p>
                        <Input
                            type="text"
                            value={answers[selectedIndex]}
                            onChange={(e) => {
                                const newAnswers = [...answers];
                                newAnswers[selectedIndex] = e.target.value;
                                setAnswers(newAnswers);
                            }}
                            className="mb-4 text-white w-full"
                            placeholder="Your answer"
                        />
                        <Button
                            onClick={handleAnswer}
                            className="text-sm bg-gradient-to-br from-blue-700 to-blue-900 px-4 py-2 w-full"
                        >
                            Submit Answer
                        </Button>
                    </div>
                )}
            </div>)}
        </div>
    );
};

export default Game;
