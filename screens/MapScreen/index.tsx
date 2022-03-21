import React, { useState, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { RootTabScreenProps } from '../../types';

const { height, width } = Dimensions.get('window');

const MapScreen = ({ navigation }: RootTabScreenProps<'Todo'>) => {
  const mapRef = useRef(null);

  const [markers, setMarkers]= useState([{
    coordinate: {
      latitude: 43.604429,
      longitude: 1.443348,
    },
    title: 'Toulouse',
    description: 'Toulouse',
    key: '1',
  }]);

  const [region, setRegion] = useState({
    latitude: 43.604429,
    longitude: 1.443348,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
});

const handleLongPress = (e: any) => {
  const { coordinate } = e.nativeEvent;
  setMarkers(markers => [
    ...markers,
    {
      coordinate,
      key: String(Math.random()),
      title: 'New marker',
      description: 'Description',
    }
  ]);
};

const handleDragEnd = (e: any, key: string) => {
  const { coordinate } = e.nativeEvent;

  const markerCopy = { ...markers.find(marker => marker.key === key) };

  setMarkers(markers.filter(
    marker => marker.key !== key
    ).concat(
      {
        coordinate,
        title: markerCopy.title,
        description: markerCopy.description,
        key
      }
    )
  );
}

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 43.604429,
          longitude: 1.443348,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onRegionChangeComplete={(region) => setRegion(region)}
        onLongPress={(e) => {handleLongPress(e)}}
      >
        {markers.map((marker) => (
          <Marker
            draggable
            key={marker.key}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
            onDragEnd={(e) => {handleDragEnd(e, marker.key)}}
          />
        ))}
        </MapView>
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