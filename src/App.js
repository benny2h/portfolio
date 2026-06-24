import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Home from './home/home';
import ChatBot from "./projects/chatBot/chatBot";
import SportScorings from "./projects/sportScorings/sportScorings";
import EmptyPage from "./components/emptyPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sportScorings" element={<SportScorings />} />
                <Route path="/chatBot" element={<ChatBot />} />
                <Route
                    path="/auth-rollen-system"
                    element={<EmptyPage title="Auth & Rollen-System" desc="Login mit JWT-Auth und rollenbasierten Berechtigungen für Admins, Trainer und Spieler. Diese Seite ist noch im Aufbau." />}
                />
                <Route
                    path="/finance-tracker"
                    element={<EmptyPage title="Finanz Tracker" desc="Übersichtliches Dashboard zur Verwaltung von Ausgaben, Budgets und Sparzielen. Diese Seite ist noch im Aufbau." />}
                />
            </Routes>
            <Analytics />
        </BrowserRouter>
    );
}

export default App;