"use client";

import { DUMMY_QUESTIONS_LIST } from "@/constant/question";
import classNames from "classnames";
import React, { useEffect, useState } from "react";

const QuestionList = () => {
  const [submitedAnswer, setSubmitedAnswer] = useState<{
    [id: string]: {
      answer: string;
    };
  }>(() => {
    const local = localStorage.getItem("answered");

    return local ? JSON.parse(local) : {};
  });

  useEffect(() => {
    const listenStorageChange = () => {
      const localAnswer = localStorage.getItem("answered");
      if (localAnswer === null) {
        setSubmitedAnswer({});
      } else {
        console.log("local", { localAnswer });
        setSubmitedAnswer(localAnswer ? JSON.parse(localAnswer) : {});
      }
    };
    window.addEventListener("storage", listenStorageChange);
    return () => window.removeEventListener("storage", listenStorageChange);
  }, []);

  return (
    <section className="flex flex-col divide-neutral-300 w-1/4 bg-blue-300">
      <div className="w-full flex items-center px-3">Nomor soal</div>
      <div className="flex p-3">
        <div className="grid gap-2 w-full grid-cols-[repeat(auto-fit,_minmax(48px,_1fr))]">
          {DUMMY_QUESTIONS_LIST.map((question, index) => (
            <div
              className={classNames(
                "w-12 h-12 flex justify-center items-center bg-neutral-300",
                {
                  "bg-yellow-200": Object.keys(submitedAnswer).includes(
                    `${question.id}`
                  ),
                }
              )}
              key={question.id}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuestionList;
