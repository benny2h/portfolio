import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FussballScorings from './pages/FussballScorings';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/footballScorings" element={<FussballScorings />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;