import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Bundesliga from './pages/Bundesliga';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/bundesliga" element={<Bundesliga />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;