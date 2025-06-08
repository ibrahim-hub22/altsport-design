import React from 'react';

function Card({ card, onLike, onPreview }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onLike();
    }
  };

  return (
    <div className={`card ${card.className}`}>
      <div
        className="card-img-container"
        style={{ cursor: 'pointer' }}
        onClick={onPreview}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onPreview();
          }
        }}
        aria-label="Preview Image"
      >
        <img src={card.imageSrc} alt={card.alt || 'Card preview'} />
      </div>

      <div className="card_text">
        <p>{card.text}</p>
        <i
          className={`fa-heart ${card.liked ? 'fa-solid' : 'fa-regular'}`}
          style={{ 
            color: card.liked ? 'red' : 'inherit',
            cursor: 'pointer'
          }}
          onClick={onLike}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
          aria-label={card.liked ? 'Unlike' : 'Like'}
        />
      </div>
    </div>
  );
}


export default Card;