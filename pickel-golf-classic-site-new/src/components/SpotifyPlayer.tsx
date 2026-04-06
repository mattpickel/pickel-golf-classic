import React from 'react';

const SpotifyPlayer: React.FC = () => {
  return (
    <div className='w-full sm:w-2/3 mx-auto my-2'>
      <div className="hidden sm:block">
        <iframe
          className="lrg-player"
          style={{ borderRadius: '12px' }}
          src="https://open.spotify.com/embed/show/0JR0L4rs45EyJngvZHgStk?utm_source=generator&theme=0"
          width="100%"
          height="152"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>
      <div className="block sm:hidden">
        <iframe
          className="sml-player"
          style={{ borderRadius: '12px' }}
          src="https://open.spotify.com/embed/show/0JR0L4rs45EyJngvZHgStk?utm_source=generator&theme=0"
          width="100%"
          height="80"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default SpotifyPlayer;
