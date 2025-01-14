import { useCallback, useState } from 'react'
import QUESTIONS from '../../questions'
import summaryImg from '../assets/quiz-complete.png'
import Question from './Question'

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([])
  const activeQuestionIndex = userAnswers.length

  const handleAnswerClick = useCallback((selectedAnswer) => {
    setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer])
  }, [])

  const handleSkipAnswer = useCallback(() => {
    handleAnswerClick(null)
  }, [handleAnswerClick])

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length
  if (quizIsComplete) {
    const skippedAnswers = userAnswers.filter((answer) => answer === null) || []
    const correctAnswers =
      userAnswers.filter(
        (answer, index) => answer === QUESTIONS[index].answers[0],
      ) || []

    const skippedAnswersShare = Math.round(
      (skippedAnswers.length / userAnswers.length) * 100,
    )
    const correctAnswersShare = Math.round(
      (correctAnswers.length / userAnswers.length) * 100,
    )
    const wrongAnswersShare = 100 - skippedAnswersShare - correctAnswersShare

    return (
      <div id="summary">
        <img src={summaryImg} alt="Trophy icon" />
        <h2>Quiz Completed!</h2>
        <div id="summary-stats">
          <p>
            <span className="number">{skippedAnswersShare}%</span>
            <span className="text">skipped</span>
          </p>
          <p>
            <span className="number">{correctAnswersShare}%</span>
            <span className="text">answered correctly</span>
          </p>
          <p>
            <span className="number">{wrongAnswersShare}%</span>
            <span className="text">answered incorrectly</span>
          </p>
        </div>
        <ol>
          {userAnswers.map((answer, index) => {
            let cssClass = 'user-answer '
            if (answer === null) {
              cssClass += 'skipped'
            } else if (answer === QUESTIONS[index].answers[0]) {
              cssClass += 'correct'
            } else {
              cssClass += 'wrong'
            }
            return (
              <li key={index}>
                <h3>{index + 1}</h3>
                <p className="question">{QUESTIONS[index].text}</p>
                <p className={cssClass}>{answer || 'skipped'}</p>
              </li>
            )
          })}
        </ol>
      </div>
    )
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSelectAnswer={handleAnswerClick}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  )
}
