import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert, FlatList, Text, TouchableOpacity, Modal } from 'react-native';
import MapboxGL from '@rnmapbox/maps';

const PUBLIC_ACCESS_TOKEN = "pk.eyJ1IjoiZnVhZGFndXNzYWxpbSIsImEiOiJjbGcyZ2Q1ZXMwMHZ2M2RuMW9uOHZ0cDNoIn0.odEIHnmRUwKd2wUq_nBowQ";

MapboxGL.setAccessToken(PUBLIC_ACCESS_TOKEN);

const Map = () => {
  const centerCoordinate = [110.3782338826741, -7.773711146194366];

  const [addresses, setAddresses] = useState([
    {
      id: '1',
      name: 'Jl. Amarta',
      customer: 'John Doe',
      detail: 'Jl. Amarta No.75, Caturtunggal, Kec.Depok, Sleman',
      coordinate: [110.38497715757983, -7.772054732550677],
    },
    {
      id: '2',
      name: 'Jl. Anggrek',
      customer: 'Hartini',
      detail: 'Jl. Anggrek No.66, Caturtunggal, Kec.Depok, Sleman',
      coordinate: [110.39246175200198, -7.764763277759958],
    },
    {
      id: '3',
      name: 'Jl. Mekarsari',
      customer: 'Salma Dewi',
      detail: 'Jl. Mekarsari No.778, Caturtunggal, Kec.Depok, Sleman',
      coordinate: [110.38472425819369, -7.773065470671136],
    },
    {
      id: '4',
      name: 'Jl. Affandi',
      customer: 'Belva Aqilla',
      detail: 'Jl. Affandi No.188, Caturtunggal, Kec.Depok, Sleman',
      coordinate: [110.38876912017766, -7.777957954305916],
    },
    {
      id: '5',
      name: 'Jl. Cik Di Tiro',
      customer: 'Abla Salsabila',
      detail: 'Jl. Cik Di Tiro No.318, Caturtunggal, Kec.Depok, Sleman',
      coordinate: [110.3773699633911, -7.777541574944121],
    },
    {
      id: '6',
      name: 'Jl. P Mangkubumi',
      customer: 'Aurellia Candraningrum',
      detail: 'Jl. P Mangkubumi No.1173, Caturtunggal, Kec.Depok, Sleman',
      coordinate: [110.36863507288287, -7.7761945166545585],
    },
    {
      id: '7',
      name: 'Jl. Pandega Marta',
      customer: 'Ratih Ayu',
      detail: 'Jl. Pandega Marta No.991, Caturtunggal, Kec.Depok, Sleman',
      coordinate: [110.37730537263461, -7.755535468696643],
    },
  ]);

  const [newCustomer, setNewCustomer] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newCoordinate, setNewCoordinate] = useState({ longitude: '', latitude: '' });
  const [editingAddress, setEditingAddress] = useState(null);
  const [showCustomerList, setShowCustomerList] = useState(false);

  const handleSaveAddress = () => {
    if (!newCustomer || !newAddress || !newCoordinate.longitude || !newCoordinate.latitude) {
      Alert.alert('Error', 'Please provide a valid customer name, address, and coordinates.');
      return;
    }

    const updatedAddress = {
      id: editingAddress ? editingAddress.id : (addresses.length + 1).toString(),
      name: newAddress,
      customer: newCustomer,
      detail: `${newAddress}, Longitude: ${newCoordinate.longitude}, Latitude: ${newCoordinate.latitude}`,
      coordinate: [parseFloat(newCoordinate.longitude), parseFloat(newCoordinate.latitude)],
    };

    if (editingAddress) {
      setAddresses(
        addresses.map((address) =>
          address.id === editingAddress.id ? updatedAddress : address
        )
      );
      setEditingAddress(null);
    } else {
      setAddresses([...addresses, updatedAddress]);
    }

    setNewCustomer('');
    setNewAddress('');
    setNewCoordinate({ longitude: '', latitude: '' });
    Alert.alert('Success', editingAddress ? 'Address updated successfully!' : 'Address added successfully!');
  };

  const editAddress = (address) => {
    setNewCustomer(address.customer);
    setNewAddress(address.name);
    setNewCoordinate({
      longitude: address.coordinate[0].toString(),
      latitude: address.coordinate[1].toString(),
    });
    setEditingAddress(address);
    setShowCustomerList(false); // Tutup modal
  };

  const deleteAddress = (addressId) => {
    setAddresses(addresses.filter((address) => address.id !== addressId));
    Alert.alert('Success', 'Address deleted successfully!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapboxGL.MapView style={styles.map}>
          <MapboxGL.Camera zoomLevel={14} centerCoordinate={centerCoordinate} />
          {addresses.map((address) => (
            <MapboxGL.PointAnnotation
              key={address.id}
              id={address.id}
              coordinate={address.coordinate}
            >
              <View style={styles.marker}>
                <View style={styles.markerInner} />
              </View>
            </MapboxGL.PointAnnotation>
          ))}
        </MapboxGL.MapView>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Customer Name"
          value={newCustomer}
          onChangeText={setNewCustomer}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Address Name"
          value={newAddress}
          onChangeText={setNewAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="Longitude"
          keyboardType="numeric"
          value={newCoordinate.longitude}
          onChangeText={(value) => setNewCoordinate({ ...newCoordinate, longitude: value })}
        />
        <TextInput
          style={styles.input}
          placeholder="Latitude"
          keyboardType="numeric"
          value={newCoordinate.latitude}
          onChangeText={(value) => setNewCoordinate({ ...newCoordinate, latitude: value })}
        />
        <Button
          title={editingAddress ? 'Update Address' : 'Add Address'}
          onPress={handleSaveAddress}
        />
        <Button
          title="List Customer Data"
          onPress={() => setShowCustomerList(true)}
        />
      </View>

      <Modal visible={showCustomerList} animationType="slide">
        <View style={styles.modalContainer}>
          <FlatList
            data={addresses}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.addressItem}>
                <Text style={styles.addressName}>{item.name}</Text>
                <Text style={styles.customerName}>{item.customer}</Text>
                <Text style={styles.addressDetail}>{item.detail}</Text>
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => editAddress(item)}
                  >
                    <Text style={styles.buttonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteAddress(item.id)}
                  >
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
          <Button title="Close" onPress={() => setShowCustomerList(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  mapContainer: { flex: 1, height: 300 },
  map: { flex: 1 },
  marker: { width: 15, height: 15, backgroundColor: 'red', borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  markerInner: { width: 7, height: 7, backgroundColor: 'white', borderRadius: 5 },
  formContainer: { padding: 10, backgroundColor: '#f9f9f9' },
  input: { height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, marginBottom: 10, paddingHorizontal: 8 },
  modalContainer: { flex: 1, padding: 10, backgroundColor: '#fff' },
  addressItem: { marginBottom: 10, backgroundColor: '#f9f9f9', padding: 10, borderRadius: 5 },
  addressName: { fontWeight: 'bold' },
  customerName: { fontStyle: 'italic', color: '#555' },
  addressDetail: { color: '#666' },
  actionButtons: { flexDirection: 'row', marginTop: 5 },
  editButton: { backgroundColor: '#4CAF50', padding: 5, borderRadius: 5, marginRight: 5 },
  deleteButton: { backgroundColor: '#F44336', padding: 5, borderRadius: 5 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default Map;
