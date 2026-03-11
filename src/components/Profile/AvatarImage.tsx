import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import ImagePlaceholder from '../../assets/image_placeholder.png';

const AvatarImage = ({ uri, style }) => {
  const [currentSource, setCurrentSource] = useState(null);

  useEffect(() => {
    if (uri) {
      setCurrentSource({ uri });
    } else {
      setCurrentSource(ImagePlaceholder);
    }
  }, [uri]);

  return (
    <Image
      source={currentSource}
      style={style}
      onError={() => {
        setCurrentSource(ImagePlaceholder);
      }}
    />
  );
};

export default AvatarImage;