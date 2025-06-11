import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserForm from './components/UserForm.js';
import UserList from './components/UserList.js';

function App() {
  return (
    <Router>
      <nav style={{ padding: "10px" }}>
        <Link to="/" style={{ marginRight: "15px" }}>Register</Link>
        <Link to="/users">View Users</Link>
      </nav>

      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/edit/:id" element={<UserForm />} />
      </Routes>
    </Router>
  );
}

export default App;
