import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashBoard from './pages/DashBoard/DashBoard';


function App() {

  return (
    <Router>
      <div className="app">
        <main className="content">
          <Routes>
            <Route path="/" element={<DashBoard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
