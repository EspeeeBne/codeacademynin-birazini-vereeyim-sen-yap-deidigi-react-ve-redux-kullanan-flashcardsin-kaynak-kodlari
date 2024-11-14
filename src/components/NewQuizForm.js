import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ROUTES from "../app/routes";
import { addQuiz, removeQuiz } from '../features/quizzes/quizzesSlice';
import { addCard, removeCard } from '../features/cards/cardsSlice';
import { selectTopics } from '../features/topics/topicsSlice';
import { selectQuizzes } from '../features/quizzes/quizzesSlice';

export default function NewQuizForm() {
  const [name, setName] = useState("");
  const [cards, setCards] = useState([]);
  const [topicId, setTopicId] = useState("");
  const navigate = useNavigate();
  const topics = useSelector(selectTopics);
  const quizzes = useSelector(selectQuizzes);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "" || topicId === "") {
      alert("Please provide a quiz name and select a topic.");
      return;
    }

    const cardIds = cards.map((card) => {
      const cardId = uuidv4();
      dispatch(addCard({ id: cardId, front: card.front, back: card.back }));
      return cardId;
    });

    const quizId = uuidv4();
    dispatch(addQuiz({ id: quizId, name, topicId, cardIds }));
    navigate(ROUTES.quizzesRoute());
  };

  const addCardInputs = () => {
    setCards([...cards, { front: "", back: "" }]);
  };

  const removeCardInput = (index) => {
    const cardToRemove = cards[index];
    if (cardToRemove.id) {
      dispatch(removeCard({ cardId: cardToRemove.id }));
    }
    setCards(cards.filter((_, i) => i !== index));
  };

  const updateCardState = (index, side, value) => {
    const updatedCards = cards.map((card, i) =>
      i === index ? { ...card, [side]: value } : card
    );
    setCards(updatedCards);
  };

  const removeAllCards = () => {
    cards.forEach((card) => {
      if (card.id) {
        dispatch(removeCard({ cardId: card.id }));
      }
    });
    setCards([]);
  };

  const handleRemoveQuiz = (quizId) => {
    dispatch(removeQuiz({ id: quizId }));
  };

  return (
    <section>
      <h1>Create a new quiz</h1>
      <form onSubmit={handleSubmit}>
        <input
          id="quiz-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Quiz Title"
        />
        <select
          id="quiz-topic"
          value={topicId}
          onChange={(e) => setTopicId(e.target.value)}
        >
          <option value="">Select a Topic</option>
          {Object.values(topics).map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.name}
            </option>
          ))}
        </select>
        {cards.map((card, index) => (
          <div key={index} className="card-front-back">
            <input
              id={`card-front-${index}`}
              value={card.front}
              onChange={(e) => updateCardState(index, "front", e.target.value)}
              placeholder="Front"
            />

            <input
              id={`card-back-${index}`}
              value={card.back}
              onChange={(e) => updateCardState(index, "back", e.target.value)}
              placeholder="Back"
            />

            <button
              type="button"
              onClick={() => removeCardInput(index)}
              className="remove-card-button"
            >
              Remove Card
            </button>
          </div>
        ))}
        <div className="actions-container">
          <button type="button" onClick={addCardInputs}>Add a Card</button>
          <button type="button" onClick={removeAllCards}>Remove All Cards</button>
          <button type="submit">Create Quiz</button>
        </div>
      </form>
      <section>
        <h2>Existing Quizzes</h2>
        <ul>
          {Object.values(quizzes).map((quiz) => (
            <li key={quiz.id}>
              <h3>{quiz.name}</h3>
              <button type="button" onClick={() => handleRemoveQuiz(quiz.id)}>
                Remove Quiz
              </button>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
