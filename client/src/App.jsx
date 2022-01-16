import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage';
import ChatPage from './components/ChatPage'
import Loading from './components/Loading';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/loading" element={<Loading />} />
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/chat" element={<ChatPage />} />
      </Routes>
    </Router>
  );
}

export default App;
