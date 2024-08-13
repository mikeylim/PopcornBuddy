// components/MediaCard.js
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const MediaCard = ({ media }) => {
  return (
    <Link
      className="block text-center"
      href={`/movie/${media.movieId}`}
      key={media.movieId}
    >
      <div className="flex flex-col items-center">
        <Image
          width={200}
          height={300}
          src={`https://image.tmdb.org/t/p/w200${media.posterPath}`}
          alt={media.title}
          className="rounded shadow-lg mb-2 hover:scale-105 transform transition-transform"
        />
        <h2 className="main-color text-md font-semibold">{media.title}</h2>
        <p className="text-gray-600">
          {new Date(media.releaseDate).getFullYear()}
        </p>
      </div>
    </Link>
  );
};

export default MediaCard;