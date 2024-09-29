import React, { useState, useEffect } from 'react';
import './VideoPage.css';
import logo from './logo.jpg';

const VideoPage = () => {
    // Состояния для хранения данных о видео, наведённом видео, лайках и дизлайках
    const [videos, setVideos] = useState([]);
    const [hoveredVideo, setHoveredVideo] = useState(null);
    const [likes, setLikes] = useState({});
    const [dislikes, setDislikes] = useState({});

    useEffect(() => {
        // Добавляем обработчик события для предотвращения масштабирования
        const handleWheel = (event) => {
            if (event.ctrlKey) {
                event.preventDefault(); // Отменяем поведение по умолчанию для прокрутки с Ctrl
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false }); // passive: false позволяет вызвать preventDefault

        // Удаляем обработчик, когда компонент демонтируется
        return () => {
            window.removeEventListener('wheel', handleWheel);
        };
    }, []);

    // Функция для получения списка видео с сервера
    const fetchVideos = async () => {
        const apps_url = 'http://localhost:8000/api/videos/';
        try {
            const response = await fetch(apps_url);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const data = await response.json();
            setVideos(data); // Сохраняем данные о видео в состоянии
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    };

    // Используем useEffect для загрузки видео один раз при загрузке компонента
    useEffect(() => {
        fetchVideos();
    }, []);

    // Функция для обновления лайков и дизлайков на сервере и получения обновленных видео
    const handleRefresh = async () => {
        const update_url = 'http://localhost:8000/videos/update_likes_dislikes/';

        // Создаём массив обновлений для отправки на сервер
        const updates = videos.map(video => ({
            uid: video.uid, // Используем uid видео
            has_liked: likes[video.uid] || false, // Статус лайка по uid
            has_disliked: dislikes[video.uid] || false // Статус дизлайка по uid
        }));

        // Выводим обновления в консоль для отладки
        console.log('Updates to send:', updates);
    
        try {
            const response = await fetch(update_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updates), // Отправляем обновления
            });

            if (!response.ok) {
                throw new Error('Failed to update videos');
            }

            const result = await response.json();
            console.log('Response from server:', result); // Выводим ответ сервера

            // После успешного обновления запрашиваем свежие данные о видео
            fetchVideos(); // Обновляем список видео после успешного обновления
        } catch (error) {
            console.error('Error updating videos:', error);
        }
    };

    // Функция для обработки лайка видео
    const handleLike = (uid) => {
        setLikes(prevLikes => ({
            ...prevLikes,
            [uid]: !prevLikes[uid], // Переключаем лайк по uid
        }));
        setDislikes(prevDislikes => ({
            ...prevDislikes,
            [uid]: false, // Сбрасываем дизлайк
        }));
    };

    // Функция для обработки дизлайка видео
    const handleDislike = (uid) => {
        setDislikes(prevDislikes => ({
            ...prevDislikes,
            [uid]: !prevDislikes[uid], // Переключаем дизлайк по uid
        }));
        setLikes(prevLikes => ({
            ...prevLikes,
            [uid]: false, // Сбрасываем лайк
        }));
    };

    return (
        <div className="video-page">
            {/* Отображаем логотип */}
            <img src={logo} alt="Логотип" className="logo" />
            <div className="video-list">
                {/* Маппим видео и отображаем каждое видео */}
                {videos.map((video) => (
                    <div
                        className="video-item"
                        key={video.uid} // Используем uid в качестве уникального ключа
                        onMouseEnter={() => setHoveredVideo(video)} // Устанавливаем наведённое видео
                        onMouseLeave={() => setHoveredVideo(null)} // Сбрасываем наведённое видео
                    >
                        <div className="video-title">{video.title}</div>
                        <div className="video-controls">
                            {/* Кнопка для лайка */}
                            <button
                                className={`reaction-btn ${likes[video.uid] ? 'active' : ''}`} // Проверяем статус лайка
                                onClick={() => handleLike(video.uid)} // Обрабатываем клик по кнопке лайка
                            >
                                •ᴗ•
                            </button>
                            {/* Кнопка для дизлайка */}
                            <button
                                className={`reaction-btn ${dislikes[video.uid] ? 'noactive' : ''}`} // Проверяем статус дизлайка
                                onClick={() => handleDislike(video.uid)} // Обрабатываем клик по кнопке дизлайка
                            >
                                ˙◠˙
                            </button>
                        </div>
                        {/* Отображаем дополнительную информацию о видео при наведении */}
                        {hoveredVideo && hoveredVideo.uid === video.uid && (
                            <div className="tooltip">
                                <div className="video-category">
                                    <strong>Категория:</strong> {video.category_name}
                                </div>
                                <div className="video-date">
                                    <strong>Дата:</strong> {video.created_at}
                                </div>
                            </div>
                        )}
                        <div className="current-date">{video.created_at}</div>
                    </div>
                ))}
            </div>
            <div className="refresh-recommendations">
                {/* Кнопка для обновления рекомендаций */}
                <button className="refresh-btn" onClick={handleRefresh}>Обновить рекомендации</button>
            </div>
        </div>
    );
};

export default VideoPage;