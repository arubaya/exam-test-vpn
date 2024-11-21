import React from "react";
import ExamSection from "./component/ExamSection";
import QuestionList from "./component/QuestionList";

const page = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <header className="w-full h-[60px] items-center px-3 bg-red-300 flex justify-between">
        <p>Exam</p>
        <p>Timer</p>
      </header>
      <main className="w-full flex flex-1 justify-between bg-red-500">
        <ExamSection />
        <QuestionList />
      </main>
    </div>
  );
};

export default page;
