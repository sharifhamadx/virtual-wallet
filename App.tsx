import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, TextInput, Alert } from 'react-native';

const App = () => {
  const [sendModalVisible, setSendModalVisible] = useState(false);
  const [receiveModalVisible, setReceiveModalVisible] = useState(false);
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(1250.00);
  
  const [transactions, setTransactions] = useState([
    { id: '1', title: 'إيداع من Binance', amount: 500.00, type: 'positive' }
  ]);

  const walletAddress = "TRC20: TQ4x...9mA1";

  // دالة الإرسال (الخصم)
  const confirmSend = () => {
    const numAmount = parseFloat(amount);
    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      Alert.alert('خطأ', 'الرجاء إدخال مبلغ صحيح');
      return;
    }
    if (numAmount > balance) {
      Alert.alert('رصيد غير كافٍ', 'المبلغ المطلوب أكبر من رصيدك الحالي');
      return;
    }
    
    setBalance(balance - numAmount);
    setTransactions([{ id: Math.random().toString(), title: 'تحويل صادر', amount: numAmount, type: 'negative' }, ...transactions]);
    setSendModalVisible(false);
    setAmount('');
  };

  // دوال الاستلام (الزيادة)
  const handleCopy = () => Alert.alert('نجاح', 'تم نسخ عنوان المحفظة للحافظة!');
  
  const simulateReceive = () => {
    const receivedAmount = 150.00;
    setBalance(balance + receivedAmount);
    setTransactions([{ id: Math.random().toString(), title: 'إيداع خارجي', amount: receivedAmount, type: 'positive' }, ...transactions]);
    setReceiveModalVisible(false);
    Alert.alert('رصيد جديد 🤑', `تم استلام $${receivedAmount} بنجاح!`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>محفظة شريف 🚀</Text>
        </View>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>الرصيد الإجمالي (USDT)</Text>
          <Text style={styles.balanceAmount}>$ {balance.toFixed(2)}</Text>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={() => setSendModalVisible(true)}>
            <Text style={styles.actionText}>إرسال ↗️</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => setReceiveModalVisible(true)}>
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

        <View style={styles.transactionsSection}>
          <Text style={styles.sectionTitle}>المعاملات الأخيرة</Text>
          {transactions.map((tx) => (
            <View key={tx.id} style={styles.transactionItem}>
              <Text style={styles.transactionTitle}>{tx.title}</Text>
              <Text style={tx.type === 'positive' ? styles.transactionAmountPositive : styles.transactionAmountNegative}>
                {tx.type === 'positive' ? '+' : '-'} $ {tx.amount.toFixed(2)}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* نافذة الإرسال */}
      <Modal visible={sendModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>إرسال أموال (USDT)</Text>
            <TextInput style={styles.input} placeholder="أدخل المبلغ..." placeholderTextColor="#888" keyboardType="numeric" value={amount} onChangeText={setAmount} />
            <View style={styles.modalActions}>
              <TouchableOpacity style={[styles.modalBtn, styles.cancelBtn]} onPress={() => setSendModalVisible(false)}>
                <Text style={styles.modalBtnText}>إلغاء</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalBtn, styles.confirmBtn]} onPress={confirmSend}>
                <Text style={styles.modalBtnText}>تأكيد</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* نافذة الاستلام */}
      <Modal visible={receiveModalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>استلام USDT</Text>
            
            <View style={styles.addressBox}>
              <Text style={styles.addressText}>{walletAddress}</Text>
            </View>
            
            <TouchableOpacity style={styles.copyBtn} onPress={handleCopy}>
              <Text style={styles.copyBtnText}>نسخ العنوان 📋</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.simulateBtn} onPress={simulateReceive}>
              <Text style={styles.simulateBtnText}>+ محاكاة استلام 150$</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.modalBtn, styles.cancelBtn, {marginTop: 20}]} onPress={() => setReceiveModalVisible(false)}>
              <Text style={styles.modalBtnText}>إغلاق</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#1E1E1E', width: '90%', padding: 25, borderRadius: 15, borderWidth: 1, borderColor: '#333' },
  modalTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { backgroundColor: '#2C2C2C', color: '#fff', padding: 15, borderRadius: 10, fontSize: 18, textAlign: 'center', marginBottom: 20 },
  modalActions: { flexDirection: 'row', justifyContent: 'space-between' },
  modalBtn: { flex: 1, padding: 12, borderRadius: 10, alignItems: 'center', marginHorizontal: 5 },
  cancelBtn: { backgroundColor: '#FF5252' },
  confirmBtn: { backgroundColor: '#00FFA3' },
  modalBtnText: { color: '#121212', fontSize: 16, fontWeight: 'bold' },
  addressBox: { backgroundColor: '#2C2C2C', padding: 15, borderRadius: 10, marginBottom: 15, alignItems: 'center' },
  addressText: { color: '#00FFA3', fontSize: 16, letterSpacing: 1 },
  copyBtn: { backgroundColor: '#333', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 20 },
  copyBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  simulateBtn: { backgroundColor: '#00FFA3', padding: 15, borderRadius: 10, alignItems: 'center' },
  simulateBtnText: { color: '#121212', fontSize: 16, fontWeight: 'bold' },
});

export default App;
