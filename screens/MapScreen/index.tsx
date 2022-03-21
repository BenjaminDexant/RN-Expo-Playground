import React, { useState, useRef } from 'react';
import MapView, { LatLng, MapEvent, Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { RootTabScreenProps } from '../../types';

interface IMarker {
  id: string;
  coordinate: LatLng;
  title: string;
  description: string;
}

interface IRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

const { height, width } = Dimensions.get('window');

const MapScreen = ({ navigation }: RootTabScreenProps<'Todo'>) => {
  const mapRef = useRef(null);

  const [markers, setMarkers]= useState<IMarker[]>([]);

  const [region, setRegion] = useState<IRegion>({
    latitude: 43.604429,
    longitude: 1.443348,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
});

const handleLongPress = (e: MapEvent) => {
  const { coordinate } = e.nativeEvent;
  setMarkers(markers => [
    ...markers,
    {
      coordinate,
      id: String(Math.random()),
      title: 'New marker',
      description: 'Description',
    }
  ]);
};

const handleDragEnd = (e: MapEvent, id: string) => {
  const { coordinate } = e.nativeEvent;

  const markerCopy = { ...markers.find(marker => marker.id === id) };

  setMarkers(markers.filter(
    marker => marker.id !== id
    ).concat(
      {
        coordinate,
        title: markerCopy.title,
        description: markerCopy.description,
        id
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
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
            onDragEnd={(e) => {handleDragEnd(e, marker.id)}}
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