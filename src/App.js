import React, { useState } from "react";
import "./App.css";

const NUM_OF_SQUARES = 5;
const initialSquares = Array(NUM_OF_SQUARES).fill({
  blocked: true,
  content: "",
});
const questions = [
  { question: "What is 2 + 2?", answer: "4", content: "📚📝🔚🎉" },
  {
    question: "What is the capital of France?",
    answer: "Paris",
    content: "👩🏻👨🏼👣🚕",
  },
  {
    question: "What color is the sky?",
    answer: "Blue",
    content: "📍⌚☕🪪",
  },
  { question: "What is 5 * 3?", answer: "15", content: "🧳🎫✈️🛂" },
  {
    question: "What is the last letter of 'apple'?",
    answer: "e",
    content: "🇹🇷",
  },
];

const successMessages = [
  "Oye ni tan mal ehh!",
  "Le estas pillando el truco",
  "Ooooooosss palante!",
  "Hostia no queda nada!",
  "3, 2, 1 ...",
];

function App() {
  const [squares, setSquares] = useState(initialSquares);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [message, setMessage] = useState("");
  const [finalMessage, setFinalMessage] = useState(""); // To store the final message

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentLevel < questions.length) {
      const currentQuestion = questions[currentLevel];
      if (
        userInput.trim().toLowerCase() === currentQuestion.answer.toLowerCase()
      ) {
        const updatedSquares = [...squares];
        updatedSquares[currentLevel] = {
          blocked: false,
          content: currentQuestion.content,
        };
        setSquares(updatedSquares);
        setCurrentLevel(currentLevel + 1);
        setMessage(successMessages[currentLevel]);

        // If this is the final answer, show the final message after 4 seconds
        if (currentLevel === NUM_OF_SQUARES - 1) {
          setTimeout(() => {
            setFinalMessage("🎁🎄Viaje a Estambul, Turquia 🎁🎄");
          }, 3500);
        }
      } else {
        setMessage("Tu eres tonta? Prueba otra vez!");
      }
      setUserInput("");
    }
  };

  const getContent = (square, index) => {
    if (index === NUM_OF_SQUARES - 1) {
      return <img src="flag.png" alt="flag" className="final-img" />;
    }
    return square.content;
  };

  return (
    <div className="App">
      <h1>Puzzle de Navidad para Aileeeeeeen</h1>
      <div className="grid">
        {squares.map((square, index) => (
          <>
            <span style={{ color: "#c00", fontSize: "11px" }}>{index + 1}</span>
            <div
              key={index}
              className={`square ${square.blocked ? "blocked" : "active"}`}
            >
              {square.blocked ? "🔒" : getContent(square, index)}
            </div>
          </>
        ))}
      </div>
      {message && <p className="message">{message}</p>}
      {currentLevel < questions.length ? (
        <div className="question-section">
          <p>
            Pregunta {currentLevel + 1}: {questions[currentLevel].question}
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button type="submit">OK</button>
          </form>
        </div>
      ) : (
        <div>{finalMessage && <h2>{finalMessage}</h2>}</div>
      )}
    </div>
  );
}

export default App;
