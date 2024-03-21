import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");

  const [questions, setQuestions] = useState([])


  useEffect (() => {
    fetch("http://localhost:4000/questions")
    .then ((res) => {
      if(res.ok){
        return res.json()
      } else {
        console.error('could not fetch questions')
    }
    })
    .then((questions) => setQuestions(questions))
  }, [])

  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion])
  }

  function handleDeleteQuestion(id) {
    const updatedQuestions = questions.filter((question) => question.id !== id);
    setQuestions(updatedQuestions);
  }
  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAddQuestion={handleAddQuestion}/> : <QuestionList questions={questions} onDeleteQuestion={handleDeleteQuestion} />}
    </main>
  );
}

export default App;