import {View, Text, StyleSheet, Platform} from 'react-native';
import React from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {width, height, totalSize} from 'react-native-dimension';
import {appIcons} from '../../services';

export default function Map({selectedLocation, currentLocation}) {
  return (
    <MapView
      showsMyLocationButton
      provider={Platform.OS === 'ios' ? null : PROVIDER_GOOGLE}
      style={styles.map}
      customMapStyle={{borderRadius: height(8)}}
      //  initialRegion={{latitude: latitude,longitude: longitude}}
      region={
        selectedLocation
          ? {
              latitude: selectedLocation.latitude,
              longitude: selectedLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }
          : {
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }
      }
      mapType="standard"
      zoomEnabled
      loadingEnabled
      // onRegionChangeComplete={(region) => {

      // //  setRegion(region);
      // }}
      //onRegionChangeComplete={(region) => setRegion(region)}
      showUserLocation={true}>
      {selectedLocation && (
        <Marker
          coordinate={{
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
          }}
          title={selectedLocation.title}
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
});
