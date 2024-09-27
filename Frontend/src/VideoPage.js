import React, { useState } from 'react';
import './VideoPage.css'; // Импортируем стили

const VideoPage = () => {
    const videos = [
        { title: 'Видео 1', description: 'Описание видео 1', category: 'Категория 1' },
        { title: 'Видео 2', description: 'Описание видео 2', category: 'Категория 2' },
        { title: 'Видео 3', description: 'Описание видео 3', category: 'Категория 3' },
        { title: 'Видео 4', description: 'Описание видео 4', category: 'Категория 4' },
        { title: 'Видео 5', description: 'Описание видео 5', category: 'Категория 5' },
        { title: 'Видео 6', description: 'Описание видео 6', category: 'Категория 6' },
        { title: 'Видео 7', description: 'Описание видео 7', category: 'Категория 7' },
        { title: 'Видео 8', description: 'Описание видео 8', category: 'Категория 8' },
        { title: 'Видео 9', description: 'Описание видео 9', category: 'Категория 9' },
        { title: 'Видео 10', description: 'Описание видео 10', category: 'Категория 10' },
    ];

    const [hoveredVideo, setHoveredVideo] = useState(null);

    return (
        <div className="video-page">
            <div className="video-list">
                {videos.map((video) => (
                    <div
                        className="video-item"
                        key={video.title}
                        onMouseEnter={() => setHoveredVideo(video)}
                        onMouseLeave={() => setHoveredVideo(null)}
                    >
                        <div className="video-title">{video.title}</div>
                        <div className="video-controls">
                            <button className="like-btn">👍</button>
                            <button className="dislike-btn">👎</button>
                        </div>
                        <div className="watch-time">00:30</div>
                        {/* Всплывающее окно (tooltip) для видео */}
                        {hoveredVideo && hoveredVideo.title === video.title && (
                            <div className="tooltip">
                                <div className="video-description">
                                    <strong>Описание:</strong> {video.description}
                                </div>
                                <div className="video-category">
                                    <strong>Категория:</strong> {video.category}
                                </div>
                            </div>
                        )}
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
