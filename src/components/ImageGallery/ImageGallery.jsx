import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';

const ImageGallery = ({ images }) => {
  if (Array.from(images).length === 0) {
    return null;
  } else {
    return (
      <ImageGalleryList>
        {Array.from(images).map(image => (
          <ImageGalleryItem
            key={image.id}
            image={image.webformatURL}
            tags={image.tags}
          />
        ))}
      </ImageGalleryList>
    );
  }
};

export default ImageGallery;
