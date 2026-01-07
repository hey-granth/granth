import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Blog, BlogPost } from './pages';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </Router>
  );
}

export default App;
