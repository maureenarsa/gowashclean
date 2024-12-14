import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  ScrollView,
  Image,
} from 'react-native';

const AccountScreen = () => {
  const [profile, setProfile] = useState({
    name: 'Ara Sanda',
    email: 'go-washclean@gmail.com',
    phone: '080007251435',
    address: 'Jl. Bougenville, Kota Yogyakarta',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState({ ...profile });

  const handleSave = () => {
    if (!tempProfile.name || !tempProfile.email || !tempProfile.phone || !tempProfile.address) {
      Alert.alert('Error', 'All fields must be filled.');
      return;
    }
    setProfile({ ...tempProfile });
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleCancel = () => {
    setTempProfile({ ...profile });
    setIsEditing(false);
  };

  // Data laporan keuangan
  const financialReport = {
    period: '2024-07-01 to 2024-08-05',
    totalIncome: 'Rp 63.910',
    revenue: 'Rp 392.492',
    receivables: 'Rp 328.582',
    expenses: 'Rp 0',
    profit: 'Rp 63.910',
    nonCashPayment: 'Rp 32.950',
    transactions: [
      { date: '2024-07-31 12:09:53', description: 'Cash', amount: 'Rp 32.950' },
      { date: '2024-07-20 07:19:27', description: 'Tunai', amount: 'Rp 3.660' },
      { date: '2024-07-19 19:59:57', description: 'Tunai', amount: 'Rp 15.600' },
      { date: '2024-07-19 19:45:25', description: 'Tunai', amount: 'Rp 11.700' },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Gambar Profil */}
        <View style={styles.profileHeader}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/6915/6915987.png',
            }}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>{profile.name}</Text>
        </View>

        {/* Informasi Akun */}
        <View style={styles.profile}>
          {isEditing ? (
            <View style={styles.form}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                value={tempProfile.name}
                onChangeText={(text) => setTempProfile({ ...tempProfile, name: text })}
              />
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={tempProfile.email}
                onChangeText={(text) => setTempProfile({ ...tempProfile, email: text })}
              />
              <Text style={styles.label}>Phone</Text>
              <TextInput
                style={styles.input}
                value={tempProfile.phone}
                onChangeText={(text) => setTempProfile({ ...tempProfile, phone: text })}
                keyboardType="phone-pad"
              />
              <Text style={styles.label}>Address</Text>
              <TextInput
                style={styles.input}
                value={tempProfile.address}
                onChangeText={(text) => setTempProfile({ ...tempProfile, address: text })}
              />
              <View style={styles.buttonRow}>
                <Button title="Save" onPress={handleSave} color="#4CAF50" />
                <Button title="Cancel" onPress={handleCancel} color="#F44336" />
              </View>
            </View>
          ) : (
            <View>
              <Text style={styles.item}>
                <Text style={styles.label}>Email: </Text>
                {profile.email}
              </Text>
              <Text style={styles.item}>
                <Text style={styles.label}>Phone: </Text>
                {profile.phone}
              </Text>
              <Text style={styles.item}>
                <Text style={styles.label}>Address: </Text>
                {profile.address}
              </Text>
              <Button
                title="Edit Profile"
                onPress={() => setIsEditing(true)}
                color="#2196F3"
              />
            </View>
          )}
        </View>

        {/* Laporan Keuangan */}
        <View style={styles.financialReport}>
          <Text style={styles.reportTitle}>Laporan Keuangan</Text>
          <Text style={styles.reportItem}>Periode: {financialReport.period}</Text>
          <Text style={styles.reportItem}>
            Total Pemasukan: <Text style={styles.amount}>{financialReport.totalIncome}</Text>
          </Text>
          <Text style={styles.reportItem}>
            Omset: <Text style={styles.amount}>{financialReport.revenue}</Text>
          </Text>
          <Text style={styles.reportItem}>
            Piutang: <Text style={styles.amount}>{financialReport.receivables}</Text>
          </Text>
          <Text style={styles.reportItem}>
            Pengeluaran: <Text style={styles.amount}>{financialReport.expenses}</Text>
          </Text>
          <Text style={styles.reportItem}>
            Keuntungan: <Text style={styles.amount}>{financialReport.profit}</Text>
          </Text>
          <Text style={styles.reportItem}>
            Bayar Non Tunai: <Text style={styles.amount}>{financialReport.nonCashPayment}</Text>
          </Text>

          {financialReport.transactions.map((transaction, index) => (
            <View key={index} style={styles.transaction}>
              <Text style={styles.transactionText}>
                {transaction.date} - {transaction.description}:{' '}
                <Text style={styles.transactionAmount}>{transaction.amount}</Text>
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#2196F3', // Warna garis melingkar
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
  },
  profile: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  item: {
    fontSize: 18,
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  financialReport: {
    backgroundColor: '#2196F3',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
  },
  reportTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  reportItem: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 5,
  },
  amount: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  transaction: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  transactionText: {
    fontSize: 14,
    color: '#000000',
  },
  transactionAmount: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
});

export default AccountScreen;
