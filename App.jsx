import React, { useState, useEffect } from 'react';

const lessons = [
  {
    title: "Week 1: Introduction to Human and Social Relations",
    description: "This lesson covers the basic meaning, scope, and importance of human and social relations.",
    pdf: "/pdfs/week1.pdf",
    quiz: [
      { q: "What is human relations?", a: "The study of how people interact." },
      { q: "Why is it important?", a: "To promote cooperation and harmony." }
    ]
  },
  {
    title: "Week 2: Types of Social Relations",
    description: "Explains primary, secondary, formal, informal, voluntary and involuntary relations.",
    pdf: "/pdfs/week2.pdf",
    quiz: [
      { q: "Give an example of a primary relation.", a: "Family." },
      { q: "What is a formal relation?", a: "A relationship guided by rules and structure." }
    ]
  }
];

export default function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showAnswers, setShowAnswers] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogin = () => {
    if (email && password) {
      const userData = { email };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  if (!user) {
    return (
      <div style={{ maxWidth: 400, margin: '5rem auto', textAlign: 'center' }}>
        <h1>Login to Continue</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: 10, display: 'block', width: '100%' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: 20, display: 'block', width: '100%' }}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 700, margin: '2rem auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Human & Social Relations Learning App</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {lessons.map((lesson, idx) => (
        <div key={idx} style={{ border: '1px solid #ccc', padding: 16, marginTop: 20 }}>
          <h2>{lesson.title}</h2>
          <p>{lesson.description}</p>
          <a href={lesson.pdf} download>Download Lesson PDF</a>
          <br />
          <button onClick={() => {
            setSelectedQuiz(lesson.quiz);
            setShowAnswers(false);
          }}>Take Quiz</button>
        </div>
      ))}

      {selectedQuiz && (
        <div style={{ marginTop: 30 }}>
          <h3>Quiz</h3>
          {selectedQuiz.map((item, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <p><strong>Q{i + 1}:</strong> {item.q}</p>
              {showAnswers && <p style={{ color: 'green' }}>Answer: {item.a}</p>}
            </div>
          ))}
          <button onClick={() => setShowAnswers(true)}>Show Answers</button>
        </div>
      )}
    </div>
  );
}