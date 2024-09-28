import React, { useState } from 'react';
import './VideoPage.css';

const VideoPage = () => {
    const videos = [
        { id: 1, title: 'Видео 1', description: 'описание видео 1', category: 'Категория 1' },
        { id: 2, title: 'Видео 2', description: 'Описание видео 2', category: 'Категория 2' },
        { id: 3, title: 'Видео 3', description: 'Описание видео 3', category: 'Категория 3' },
        { id: 4, title: 'Видео 4', description: 'Описание видео 4', category: 'Категория 4' },
        { id: 5, title: 'Видео 5', description: 'Описание видео 5', category: 'Категория 5' },
        { id: 6, title: 'Видео 6', description: 'Описание видео 6', category: 'Категория 6' },
        { id: 7, title: 'Видео 7', description: 'Описание видео 7', category: 'Категория 7' },
        { id: 8, title: 'Видео 8', description: 'Описание видео 8', category: 'Категория 8' },
        { id: 9, title: 'Видео 9', description: 'Описание видео 9', category: 'Категория 9' },
        { id: 10, title: 'Видео 10', description: 'Описание видео 10', category: 'Категория 10' },
    ];

    const [hoveredVideo, setHoveredVideo] = useState(null);
    const [likes, setLikes] = useState({});
    const [dislikes, setDislikes] = useState({});
    
    // Задаем дату вручную
    const date = '2024-09-28'; // Используем вашу дату

    const handleLike = (id) => {
        setLikes(prevLikes => ({
            ...prevLikes,
            [id]: prevLikes[id] ? false : true // Переключаем лайк
        }));
        setDislikes(prevDislikes => ({
            ...prevDislikes,
            [id]: false // Сбрасываем дизлайк
        }));
    };

    const handleDislike = (id) => {
        setDislikes(prevDislikes => ({
            ...prevDislikes,
            [id]: prevDislikes[id] ? false : true // Переключаем дизлайк
        }));
        setLikes(prevLikes => ({
            ...prevLikes,
            [id]: false // Сбрасываем лайк
        }));
    };

    return (
        <div className="video-page">
            <div className="video-list">
                {videos.map((video) => (
                    <div
                        className="video-item"
                        key={video.id}
                        onMouseEnter={() => setHoveredVideo(video)}
                        onMouseLeave={() => setHoveredVideo(null)}
                    >
                        <div className="video-title">{video.title}</div>
                        <div className="video-controls">
                            <button
                                className={`reaction-btn ${likes[video.id] ? 'active' : ''}`}
                                onClick={() => handleLike(video.id)}
                            >
                                •ᴗ•
                            </button>
                            <button
                                className={`reaction-btn ${dislikes[video.id] ? 'noactive' : ''}`}
                                onClick={() => handleDislike(video.id)}
                            >
                                ˙◠˙
                            </button>
                        </div>
                        {hoveredVideo && hoveredVideo.id === video.id && (
                            <div className="tooltip">
                                <div className="video-description">
                                    <strong>Описание:</strong> {video.description}
                                </div>
                                <div className="video-category">
                                    <strong>Категория:</strong> {video.category}
                                </div>
                            </div>
                        )}
                        <div className="current-date">{date}</div>
                    </div>
                ))}
            </div>
            <div className="refresh-recommendations">
                <button className="refresh-btn">Обновить рекомендации</button>
            </div>
        </div>
    );
};

export default VideoPage;