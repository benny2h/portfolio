import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './home/home';
import ChatBot from "./projects/chatBot/chatBot";
import SportScorings from "./projects/sportScorings/sportScorings";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sportScorings" element={<SportScorings />} />
                <Route path="/sportScorings" element={<SportScorings />} />
                <Route path="/chatBot" element={<ChatBot />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;