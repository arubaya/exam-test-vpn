"use client";

import { DUMMY_QUESTIONS_LIST } from "@/constant/question";
import classNames from "classnames";
import React, { useEffect, useMemo, useState } from "react";

const ExamSection = () => {
  const [currentQuestionId, setCurrentQuestionId] = useState<number>(1);
  const currentQuestion = useMemo(
    () =>
      DUMMY_QUESTIONS_LIST.find(
        (question) => question.id === currentQuestionId
      ),
    [currentQuestionId]
  );

  const [submitedAnswer, setSubmitedAnswer] = useState<{
    [id: string]: {
      answer: string;
    };
  }>(() => {
    const local = localStorage.getItem("answered");

    return local ? JSON.parse(local) : {};
  });

  useEffect(() => {
    if (Object.keys(submitedAnswer).length !== 0) {
      localStorage.setItem("answered", JSON.stringify(submitedAnswer));
    }
  }, [submitedAnswer]);

  const handleClickAnswerQuestion = (id: number, answerOption: string) => {
    setSubmitedAnswer((current) => ({
      ...current,
      [id]: { answer: answerOption },
    }));
  };

  const handleOnNext = () => {
    setCurrentQuestionId((current) => {
      const questionLength = DUMMY_QUESTIONS_LIST.length;
      const nextId = current + 1;
      if (nextId < questionLength + 1) return nextId;
      return current;
    });
  };
  const handleOnPrev = () => {
    setCurrentQuestionId((current) => {
      const prev = current - 1;
      if (prev < 1) return current;
      return prev;
    });
  };
  return (
    <section className="w-full flex p-5">
      <div className="w-full flex flex-col bg-green-300 gap-3">
        <div className="w-full flex items-start px-3">
          {currentQuestion?.id}
        </div>
        <div className="w-full flex flex-col p-3 gap-3">
          <p>{currentQuestion?.question}</p>
          <div>
            {currentQuestion?.answers.map((answer) => (
              <div
                className={classNames("flex gap-2", {
                  "bg-blue-300":
                    submitedAnswer[currentQuestion.id]?.answer ===
                    answer.option,
                })}
                key={answer.option}
                onClick={() =>
                  handleClickAnswerQuestion(currentQuestion.id, answer.option)
                }
              >
                <p>{answer.option}</p>
                <p>{answer.text}</p>
              </div>
            ))}
            <div className="w-full flex items-center justify-between">
              <button onClick={handleOnPrev} disabled={currentQuestionId === 0}>
                Previous
              </button>
              <button
                onClick={handleOnNext}
                disabled={currentQuestionId === DUMMY_QUESTIONS_LIST.length + 1}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExamSection;
