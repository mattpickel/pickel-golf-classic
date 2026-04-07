import React from 'react';

const SpotifyPlayer: React.FC = () => {
  return (
    <iframe
      style={{ borderRadius: '8px' }}
      src="https://open.spotify.com/embed/show/0JR0L4rs45EyJngvZHgStk?utm_source=generator&theme=0"
      width="100%"
      height="80"
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    />
  );
}

export default SpotifyPlayer;
