import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import ChatBot from "./projects/chatBot/ChatBot";
import SportScorings from "./projects/sportScorings/SportScorings";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sportScorings" element={<SportScorings />} />
                <Route path="/chatBot" element={<ChatBot />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;