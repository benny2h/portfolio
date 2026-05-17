import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SportScorings from './pages/sportScorings';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sportScorings" element={<SportScorings />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;