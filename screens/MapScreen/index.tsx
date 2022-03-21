import React, { useState } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { RootTabScreenProps } from '../../types';

const { height, width } = Dimensions.get('window');

const MapScreen = ({ navigation }: RootTabScreenProps<'Todo'>) => {
  const [region, setRegion] = useState({
    latitude: 51.5079145,
    longitude: -0.0899163,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 43.604429,
          longitude: 1.443348,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onRegionChangeComplete={(region) => setRegion(region)}
      />
      <Text style={styles.text}>Current latitude: {region.latitude}</Text>
      <Text style={styles.text}>Current longitude: {region.longitude}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width,
    height: height / 1.5,
  },
  text: {
    fontSize: 10,
    textAlign: 'center',
    margin: 10,
  },
});

export default MapScreen;