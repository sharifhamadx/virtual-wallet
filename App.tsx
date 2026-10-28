import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';

const App = () => {
  const handleSend = () => Alert.alert('إرسال', 'سيتم فتح شاشة تحويل الرصيد قريباً');
  const handleReceive = () => Alert.alert('استلام', 'سيتم عرض كود الـ QR الخاص بك لاستلام USDT');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>محفظة شريف 🚀</Text>
        </View>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>الرصيد الإجمالي (USDT)</Text>
          <Text style={styles.balanceAmount}>$ 1,250.00</Text>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={handleSend}>
            <Text style={styles.actionText}>إرسال ↗️</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleReceive}>
            <Text style={styles.actionText}>استلام ↙️</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.virtualCard}>
          <Text style={styles.cardType}>VISA</Text>
          <Text style={styles.cardNumber}>**** **** **** 4242</Text>
          <View style={styles.cardFooter}>
            <Text style={styles.cardHolder}>SHARIF HAMAD</Text>
            <Text style={styles.cardExpiry}>12/28</Text>
          </View>
        </View>

        {/* سجل المعاملات */}
        <View style={styles.transactionsSection}>
          <Text style={styles.sectionTitle}>المعاملات الأخيرة</Text>
          <View style={styles.transactionItem}>
            <Text style={styles.transactionTitle}>إيداع من Binance</Text>
            <Text style={styles.transactionAmountPositive}>+ $ 500.00</Text>
          </View>
          <View style={styles.transactionItem}>
            <Text style={styles.transactionTitle}>دفع اشتراك Netflix</Text>
            <Text style={styles.transactionAmountNegative}>- $ 15.99</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 20 },
  header: { marginTop: 20, marginBottom: 20, alignItems: 'center' },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#ffffff' },
  balanceCard: { backgroundColor: '#1E1E1E', padding: 30, borderRadius: 15, alignItems: 'center', borderWidth: 1, borderColor: '#333' },
  balanceLabel: { color: '#aaaaaa', fontSize: 16, marginBottom: 10 },
  balanceAmount: { color: '#00FFA3', fontSize: 36, fontWeight: 'bold' },
  actionsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  actionButton: { backgroundColor: '#2962FF', flex: 1, padding: 15, borderRadius: 10, marginHorizontal: 5, alignItems: 'center' },
  actionText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  virtualCard: { backgroundColor: '#FF9800', padding: 20, borderRadius: 15, marginTop: 30, elevation: 5 },
  cardType: { fontSize: 22, fontWeight: 'bold', color: '#ffffff', textAlign: 'right', fontStyle: 'italic' },
  cardNumber: { fontSize: 22, color: '#ffffff', marginTop: 20, letterSpacing: 2 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  cardHolder: { color: '#ffffff', fontSize: 16, textTransform: 'uppercase' },
  cardExpiry: { color: '#ffffff', fontSize: 16 },
  transactionsSection: { marginTop: 30, marginBottom: 20 },
  sectionTitle: { color: '#ffffff', fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  transactionItem: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#1E1E1E', padding: 15, borderRadius: 10, marginBottom: 10 },
  transactionTitle: { color: '#ffffff', fontSize: 16 },
  transactionAmountPositive: { color: '#00FFA3', fontSize: 16, fontWeight: 'bold' },
  transactionAmountNegative: { color: '#FF5252', fontSize: 16, fontWeight: 'bold' },
});

export default App;
