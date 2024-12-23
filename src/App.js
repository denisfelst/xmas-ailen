import React, { useState } from "react";
import "./App.css";

const NUM_OF_SQUARES = 5;
const initialSquares = Array(NUM_OF_SQUARES).fill({
  blocked: true,
  content: "",
});
const questions = [
  {
    question: "Como le gusta a Ainara el cafe por la mañana?",
    answer: "frio",
    alternativeAnswer: "muy frio",
    content: "📚📝🔚🎉",
  },
  {
    question: "La especia que no debe faltar nunca en la mesa de esta casa",
    answer: "Piripiri",
    alternativeAnswer: "piri piri",
    content: "👩🏻👨🏼👣🚕",
  },
  {
    question: "Color favorito de Cristhian?",
    answer: "Verde vox",
    alternativeAnswer: "Verde kawa",
    content: "🪑⌚☕VIP",
  },
  {
    question: "Que edad tiene el cocinero favorito de Vero?",
    answer: "49",
    alternativeAnswer: "cuarenta y nueve",
    content: "🧳🎫✈️🛂",
  },
  {
    question: "Numero de shots que van en el cafe de tus padres?",
    answer: "3",
    alternativeAnswer: "tres",
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
        userInput.trim().toLowerCase() ===
          currentQuestion.answer.toLowerCase() ||
        userInput.trim().toLowerCase() ===
          currentQuestion.alternativeAnswer.toLowerCase()
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
            setFinalMessage(
              <h2>
                Has completado el juego. Chiquita maquina oiste! 🎉
                <br />
                <img
                  src="/sticker.webp"
                  style={{ maxHeight: "170px" }}
                  alt="sticker"
                />
                <br />
                🎁 Tu premio: Un viaje de 1 semana a Estambul, TURQUíA. 🕌{" "}
                <br />
                🎄¡Feliz Navidad!🎄
                <br />
                <img
                  src="/sticker2.webp"
                  style={{ maxHeight: "120px" }}
                  alt="sticker"
                />
              </h2>
            );
          }, 2300);
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
      <h1 style={{ color: "whitesmoke" }}>
        Puzzle de Navidad para Aileeeeennnnn
      </h1>
      <div className="grid">
        {squares.map((square, index) => (
          <>
            <div
              key={index}
              className={`square ${square.blocked ? "blocked" : "active"}`}
            >
              {square.blocked ? "🔒" : getContent(square, index)}
            </div>
          </>
        ))}
      </div>
      {message && (
        <p className="message" style={{ color: "whitesmoke" }}>
          {message}
        </p>
      )}
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
        <div>
          {finalMessage && (
            <h3 style={{ color: "whitesmoke", fontSize: "16px" }}>
              {finalMessage}
            </h3>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
