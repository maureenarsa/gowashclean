import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
  Image,
  Button,
  Modal,
} from "react-native";

const CourierManagementTab = () => {
  const [couriers, setCouriers] = useState([
    {
      id: "1",
      name: "John Doe",
      address: "Jl. Patimura No. 190",
      status: "Sedang Bertugas",
      profilePic:
        "https://cdn.icon-icons.com/icons2/2335/PNG/512/courier_avatar_people_icon_142366.png",
    },
    {
      id: "2",
      name: "Robert",
      address: "Jl. Kusumanegara No. 510",
      status: "Sedang Bertugas",
      profilePic:
        "https://cdn.icon-icons.com/icons2/2335/PNG/512/courier_avatar_people_icon_142366.png",
    },
    {
      id: "3",
      name: "Nichol",
      address: "Jl. Panembahan No. 51",
      status: "Belum Bertugas",
      profilePic:
        "https://cdn.icon-icons.com/icons2/2335/PNG/512/courier_avatar_people_icon_142366.png",
    },
    {
      id: "4",
      name: "Abimanyu",
      address: "Jl. Nagan Tengah No. 18",
      status: "Belum Bertugas",
      profilePic:
        "https://cdn.icon-icons.com/icons2/2335/PNG/512/courier_avatar_people_icon_142366.png",
    },
    {
      id: "5",
      name: "Marteen",
      address: "Jl. Gamelan Raya No. 02",
      status: "Sedang Bertugas",
      profilePic:
        "https://cdn.icon-icons.com/icons2/2335/PNG/512/courier_avatar_people_icon_142366.png",
    },
    {
      id: "6",
      name: "Picardo",
      address: "Jl. Ireda No. 2001",
      status: "Belum Bertugas",
      profilePic:
        "https://cdn.icon-icons.com/icons2/2335/PNG/512/courier_avatar_people_icon_142366.png",
    },
  ]);

  const [newCourier, setNewCourier] = useState({ name: "", address: "" });
  const [editingCourier, setEditingCourier] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Handler untuk menambahkan kurir baru
  const handleAddCourier = () => {
    if (!newCourier.name || !newCourier.address) {
      Alert.alert("Error", "Silakan isi semua data kurir.");
      return;
    }

    const newId = (couriers.length + 1).toString();
    const newEntry = {
      id: newId,
      ...newCourier,
      status: "Belum Bertugas",
      profilePic:
        "https://cdn.icon-icons.com/icons2/2335/PNG/512/courier_avatar_people_icon_142366.png",
    };

    setCouriers([...couriers, newEntry]); // Tambahkan kurir ke daftar
    setNewCourier({ name: "", address: "" }); // Reset form
    setModalVisible(false); // Tutup modal
  };

  // Handler untuk mengedit data kurir
  const handleEditCourier = () => {
    if (!editingCourier.name || !editingCourier.address) {
      Alert.alert("Error", "Silakan isi semua data kurir.");
      return;
    }

    setCouriers((prev) =>
      prev.map((courier) =>
        courier.id === editingCourier.id ? editingCourier : courier
      )
    );

    setEditingCourier(null); // Selesai edit
    setModalVisible(false); // Tutup modal
    setIsEditing(false);
  };

  // Handler untuk menghapus kurir
  const handleDeleteCourier = (id) => {
    Alert.alert(
      "Konfirmasi Hapus",
      "Apakah Anda yakin ingin menghapus kurir ini?",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Hapus",
          onPress: () => {
            setCouriers((prev) => prev.filter((courier) => courier.id !== id));
          },
          style: "destructive",
        },
      ]
    );
  };

  // Handler untuk mengubah status kurir
  const handleChangeStatus = (id) => {
    const updatedCouriers = couriers.map((courier) => {
      if (courier.id === id) {
        return {
          ...courier,
          status:
            courier.status === "Sedang Bertugas"
              ? "Belum Bertugas"
              : "Sedang Bertugas",
        };
      }
      return courier;
    });

    setCouriers(updatedCouriers);
  };

  // Render setiap kurir dalam daftar
  const renderCourier = ({ item }) => (
    <TouchableOpacity style={styles.courierItem}>
      <Image source={{ uri: item.profilePic }} style={styles.profilePic} />
      <View style={styles.courierDetails}>
        <Text style={styles.courierName}>{item.name}</Text>
        <Text>Alamat: {item.address}</Text>
        <Text>Status: {item.status}</Text>
        <View style={styles.buttons}>
          <Button
            title="Edit"
            onPress={() => {
              setEditingCourier(item);
              setNewCourier(item);
              setIsEditing(true);
              setModalVisible(true);
            }}
            color="#4CAF50"
          />
          <Button
            title="Hapus"
            onPress={() => handleDeleteCourier(item.id)}
            color="#F44336"
          />
          <Button
            title="Ubah Status"
            onPress={() => handleChangeStatus(item.id)}
            color="#FF9800"
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manajemen Kurir</Text>
      <FlatList
        data={couriers}
        renderItem={renderCourier}
        keyExtractor={(item) => item.id}
      />
      <Button
        title="Tambah Kurir"
        onPress={() => {
          setIsEditing(false);
          setNewCourier({ name: "", address: "" });
          setModalVisible(true);
        }}
        color="#007BFF"
      />
      {/* Modal Form Tambah/Edit Kurir */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>
            {isEditing ? "Edit Kurir" : "Tambah Kurir"}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Nama Kurir"
            value={isEditing ? editingCourier.name : newCourier.name}
            onChangeText={(text) =>
              isEditing
                ? setEditingCourier({ ...editingCourier, name: text })
                : setNewCourier({ ...newCourier, name: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Alamat Kurir"
            value={isEditing ? editingCourier.address : newCourier.address}
            onChangeText={(text) =>
              isEditing
                ? setEditingCourier({ ...editingCourier, address: text })
                : setNewCourier({ ...newCourier, address: text })
            }
          />
          <View style={styles.modalButtons}>
            <Button
              title={isEditing ? "Simpan Perubahan" : "Tambah Kurir"}
              onPress={isEditing ? handleEditCourier : handleAddCourier}
            />
            <Button
              title="Batal"
              onPress={() => setModalVisible(false)}
              color="#FF5733"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  courierItem: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#f9f9f9",
    marginVertical: 8,
    borderRadius: 10,
    elevation: 2,
  },
  profilePic: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
  courierDetails: { flex: 1 },
  courierName: { fontSize: 16, fontWeight: "bold" },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FFF",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    backgroundColor: "#FFF",
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "100%",
  },
});

export default CourierManagementTab;
