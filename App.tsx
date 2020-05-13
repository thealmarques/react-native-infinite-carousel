import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CarouselComponent } from './components/carousel/carousel';

export default function App() {
  return (
    <View style={styles.container}>
      <CarouselComponent urls={[
        'https://www.thesprucepets.com/thmb/W5tVnELZ4HwxQtq2WxuaB8ecxiM=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/portrait-if-a-spitz-pomeranian_t20_v3o29E-5ae9bbdca18d9e0037d95983.jpg',
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/small-dog-breeds-shih-tzu-1583349572.jpg'
      ]}></CarouselComponent>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50
  },
});
