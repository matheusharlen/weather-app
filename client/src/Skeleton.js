import React from 'react';
import './App.css'; // Estilos para o esqueleto

const SkeletonCard = () => {
    return (
        <div className="skeleton-card">
            <div className="skeleton-image"></div>
            <div className="skeleton-title"></div>
            <div className="skeleton-text"></div>
        </div>
    );
};

export default SkeletonCard;