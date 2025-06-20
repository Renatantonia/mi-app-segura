import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Notes from './Notes';
import Register from './Register';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

