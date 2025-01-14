import { useRef } from 'react'

export default function Answers({
  answers,
  selectedAnswer,
  answerState,
  onSelect,
}) {
  const shuffledAnswers = useRef()
  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers].sort(() => Math.random() - 0.5)
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
        const className = answer === selectedAnswer ? answerState : ''
        const disabled = !!selectedAnswer

        return (
          <li key={answer} className="answer">
            <button
              onClick={() => onSelect(answer)}
              className={className}
              disabled={disabled}
            >
              {answer}
            </button>
          </li>
        )
      })}
    </ul>
  )
}
