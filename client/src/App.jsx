import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage';
import ChatPage from './components/ChatPage'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/chat/lat=:lat&lon=:lon" element={<ChatPage />} />
      </Routes>
    </Router>
  );
}

export default App;
