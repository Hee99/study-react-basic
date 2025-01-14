import QuestionTimer from './QuestionTimer'
import Answers from './Answers'
import QUESTIONS from '../../questions'
import { useState } from 'react'

export default function Question({ index, onSelectAnswer, onSkipAnswer }) {
  const answers = QUESTIONS[index].answers

  const [answer, setAnswer] = useState({
    selectedAnswer: '',
    isCorrect: null,
  })

  let timer = 10000
  let answerState = ''

  if (answer.selectedAnswer) {
    if (answer.isCorrect === null) {
      timer = 1000
      answerState = 'selected'
    } else {
      timer = 2000
      answerState = answer.isCorrect ? 'correct' : 'wrong'
    }
  }

  function handleSelectAnswer(selectedAnswer) {
    setAnswer({
      selectedAnswer,
      isCorrect: null,
    })

    setTimeout(() => {
      setAnswer({
        selectedAnswer,
        isCorrect: selectedAnswer === answers[0],
      })

      setTimeout(() => {
        onSelectAnswer(selectedAnswer)
      }, 2000)
    }, 1000)
  }

  return (
    <div id="question">
      <QuestionTimer
        key={timer}
        timeout={timer}
        onTimeout={!answer.selectedAnswer ? onSkipAnswer : null}
        mode={answerState}
      />
      <h2>{QUESTIONS[index].text}</h2>
      <Answers
        answers={answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  )
}
