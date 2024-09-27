import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Begin from './VideoPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Begin />} /> {/* Убедитесь, что начальный маршрут указывает на Begin */}
                <Route path="*" element={<Navigate to="/" />} /> {/* Перенаправление для всех других маршрутов */}
            </Routes>
        </Router>
    );
};

export default App;
