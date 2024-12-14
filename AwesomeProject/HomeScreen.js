import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faTshirt,
  faCogs,
  faTachometerAlt,
  faTruck,
  faSprayCan,
  faShippingFast,
  faBoxesPacking,
  faBoxesStacked,  
  faFire, 
  faJugDetergent,
  faChalkboardTeacher,
  faFunnelDollar
} from '@fortawesome/free-solid-svg-icons';

const categories = [
  {
    id: 1,
    title: 'Paket Bulanan',
    description: 'Layanan laundry setiap bulan dengan harga ekonomis.',
    image: { uri: 'https://www.solomediabisnis.com/wp-content/uploads/2021/10/bl-daftar-harga-laundry-satuan-jakarta.png' },
  },
  {
    id: 2,
    title: 'Paket Setrika',
    description: 'Layanan setrika tanpa cuci, cocok bagi Anda yang ingin pakaian tetap rapi.',
    image: { uri: 'https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1635578558/y2addzbiukhatgjceqnp.jpg' },
  },
  {
    id: 3,
    title: 'Paket Premium',
    description: 'Layanan cuci reguler dengan opsi ekspres untuk Anda yang membutuhkan pakaian bersih dengan cepat.',
    image: { uri: 'https://watermark.lovepik.com/photo/20211209/large/lovepik-housewife-puts-laundry-in-the-washing-machine-picture_501714212.jpg' },
  },
];

const offersForLaundry = [
  {
    id: 1,
    title: 'Mesin Cuci Baru',
    description: 'Tukarkan poin Anda untuk mendapatkan mesin cuci baru.',
    icon: faBoxesPacking,  
  },
  {
    id: 2,
    title: 'Setrika Listrik',
    description: 'Tukarkan poin Anda untuk mendapatkan setrika listrik.',
    icon: faFire,  
  },
  {
    id: 3,
    title: 'Sabun Cuci Grosir',
    description: 'Tukarkan poin Anda untuk mendapatkan sabun cuci dalam jumlah grosir.',
    icon: faBoxesStacked,
  },
  {
    id: 4,
    title: 'Pewangi Laundry',
    description: 'Tukarkan poin Anda untuk mendapatkan pewangi laundry dalam jumlah besar.',
    icon: faJugDetergent,
  },
  {
    id: 5,
    title: 'Pelatihan Karyawan',
    description: 'Tukarkan poin Anda untuk mengikuti pelatihan atau kursus untuk karyawan.',
    icon: faChalkboardTeacher,
  },
  {
    id: 6,
    title: 'Promosi Iklan',
    description: 'Tukarkan poin Anda untuk mendapatkan paket promosi iklan untuk bisnis laundry.',
    icon: faFunnelDollar,
  },
  {
    id: 7,
    title: 'Jasa Pengiriman Peralatan',
    description: 'Tukarkan poin Anda untuk layanan pengiriman peralatan laundry.',
    icon: faTruck,
  },
];

const ServiceScreen = () => {
  const [redeemClicked, setRedeemClicked] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);

  const handleRedeemClick = () => {
    setRedeemClicked(true);
  };

  const handleOfferSelect = (offer) => {
    setSelectedOffer(offer);
  };

  const handleGoBack = () => {
    setRedeemClicked(false);
    setSelectedOffer(null);
  };

  if (redeemClicked) {
    return (
      <View style={styles.redeemScreen}>
        <Text style={styles.redeemMessage}>Pilih Penawaran Penukaran Poin Anda</Text>
        <ScrollView style={styles.offersContainer}>
          {offersForLaundry.map((offer) => (
            <TouchableOpacity
              key={offer.id}
              style={styles.offerCard}
              onPress={() => handleOfferSelect(offer)}
            >
              <FontAwesomeIcon icon={offer.icon} size={40} color="#2196F3" />
              <Text style={styles.offerTitle}>{offer.title}</Text>
              <Text style={styles.offerDescription}>{offer.description}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity
          style={styles.goBackButton}
          onPress={handleGoBack}
        >
          <Text style={styles.goBackButtonText}>Kembali</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://www.dhobilite.com/image/og-image/best-laundry-services-in-india.webp' }}
          style={styles.headerImage}
        />
        <Text style={styles.headerText}>Selamat Datang di GoWash</Text>
        <Text style={styles.subHeaderText}>Premium Laundry Services Near You | Free Pickup & Delivery</Text>
      </View>

      {/* Horizontal Menu */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalMenu}>
        <View style={styles.menuItem}>
          <FontAwesomeIcon icon={faTshirt} size={30} color="#2196F3" />
          <Text style={styles.menuText}>Wash</Text>
        </View>
        <View style={styles.menuItem}>
          <FontAwesomeIcon icon={faCogs} size={30} color="#2196F3" />
          <Text style={styles.menuText}>Wash & Iron</Text>
        </View>
        <View style={styles.menuItem}>
          <FontAwesomeIcon icon={faTachometerAlt} size={30} color="#2196F3" />
          <Text style={styles.menuText}>Laundry Self-Service</Text>
        </View>
        <View style={styles.menuItem}>
          <FontAwesomeIcon icon={faTruck} size={30} color="#2196F3" />
          <Text style={styles.menuText}>Laundry On Demand</Text>
        </View>
        <View style={styles.menuItem}>
          <FontAwesomeIcon icon={faSprayCan} size={30} color="#2196F3" />
          <Text style={styles.menuText}>Dry Cleaning</Text>
        </View>
        <View style={styles.menuItem}>
          <FontAwesomeIcon icon={faShippingFast} size={30} color="#2196F3" />
          <Text style={styles.menuText}>Pickup & Delivery</Text>
        </View>
      </ScrollView>

      {/* Points Section */}
      <View style={styles.pointsSection}>
        <Text style={styles.pointsText}>23.600 Point</Text>
        <TouchableOpacity style={styles.redeemButton} onPress={handleRedeemClick}>
          <Text style={styles.redeemButtonText}>Redeem</Text>
        </TouchableOpacity>
      </View>

      {/* Category Section */}
      <Text style={styles.categoryTitle}>Kategori</Text>
      <View style={styles.categoryContainer}>
        {categories.map((category) => (
          <View key={category.id} style={styles.categoryCard}>
            <Image source={category.image} style={styles.categoryImage} />
            <Text style={styles.categoryName}>{category.title}</Text>
            <Text style={styles.categoryDescription}>{category.description}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2196F3',
    paddingBottom: 20,
    alignItems: 'center',
  },
  headerImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  subHeaderText: {
    fontSize: 14,
    color: '#fff',
  },
  horizontalMenu: {
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  menuItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    elevation: 3,
  },
  menuText: {
    marginTop: 5,
    fontSize: 12,
    color: '#333',
  },
  pointsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    elevation: 3,
  },
  pointsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  redeemButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  redeemButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 15,
    marginBottom: 10,
    marginTop: 20,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  categoryCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    width: '48%',
    marginBottom: 15,
    elevation: 3,
  },
  categoryImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  categoryDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  redeemScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  redeemMessage: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 20,
  },
  goBackButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  goBackButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  offersContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  offerCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 3,
    alignItems: 'center',
  },
  offerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  offerDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});

export default ServiceScreen;
