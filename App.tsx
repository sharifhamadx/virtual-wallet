import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* رأس الصفحة */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>المحفظة الافتراضية</Text>
      </View>

      {/* بطاقة الرصيد */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>الرصيد الإجمالي (USDT)</Text>
        <Text style={styles.balanceAmount}>$ 1,250.00</Text>
      </View>

      {/* أزرار العمليات */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>إرسال ↗️</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>استلام ↙️</Text>
        </TouchableOpacity>
      </View>

      {/* البطاقة البنكية الافتراضية */}
      <View style={styles.virtualCard}>
        <Text style={styles.cardType}>VISA</Text>
        <Text style={styles.cardNumber}>**** **** **** 4242</Text>
        <View style={styles.cardFooter}>
          <Text style={styles.cardHolder}>SHARIF HAMAD</Text>
          <Text style={styles.cardExpiry}>12/28</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f4', padding: 20 },
  header: { marginTop: 20, marginBottom: 30, alignItems: 'center' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  balanceCard: { backgroundColor: '#1E1E1E', padding: 30, borderRadius: 15, alignItems: 'center', elevation: 5 },
  balanceLabel: { color: '#aaa', fontSize: 16, marginBottom: 10 },
  balanceAmount: { color: '#00FFA3', fontSize: 36, fontWeight: 'bold' },
  actionsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  actionButton: { backgroundColor: '#007BFF', flex: 1, padding: 15, borderRadius: 10, marginHorizontal: 5, alignItems: 'center' },
  actionText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  virtualCard: { backgroundColor: '#FF9800', padding: 20, borderRadius: 15, marginTop: 30, elevation: 5 },
  cardType: { fontSize: 22, fontWeight: 'bold', color: '#fff', textAlign: 'right', fontStyle: 'italic' },
  cardNumber: { fontSize: 22, color: '#fff', marginTop: 20, letterSpacing: 2 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  cardHolder: { color: '#fff', fontSize: 16, textTransform: 'uppercase' },
  cardExpiry: { color: '#fff', fontSize: 16 },
});

export default App;
