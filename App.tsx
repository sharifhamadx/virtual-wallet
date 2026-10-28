import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, TextInput, Alert } from 'react-native';

const App = () => {
  // حالة التنقل بين التبويبات ('home' | 'transfer' | 'settings')
  const [activeTab, setActiveTab] = useState('home');

  const [sendModalVisible, setSendModalVisible] = useState(false);
  const [receiveModalVisible, setReceiveModalVisible] = useState(false);
  const [amount, setAmount] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [balance, setBalance] = useState(1250.00);
  
  const [transactions, setTransactions] = useState([
    { id: '1', title: 'إيداع من Binance', amount: 500.00, type: 'positive', date: '10:30 ص' }
  ]);

  const walletAddress = "TRC20: TQ4x...9mA1";

  const getCurrentTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
    const ampm = hours >= 12 ? 'م' : 'ص';
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
  };

  const confirmSend = () => {
    const numAmount = parseFloat(amount);
    if (!recipientAddress.trim()) {
      Alert.alert('خطأ', 'الرجاء إدخال أو لصق عنوان المحفظة');
      return;
    }
    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      Alert.alert('خطأ', 'الرجاء إدخال مبلغ صحيح');
      return;
    }
    if (numAmount > balance) {
      Alert.alert('رصيد غير كافٍ', 'المبلغ المطلوب أكبر من رصيدك الحالي');
      return;
    }
    
    const time = getCurrentTime();

    if (recipientAddress.trim() === walletAddress.trim()) {
      const receiveTx = { id: 'rcv-' + Date.now(), title: 'استلام (تحويل ذاتي)', amount: numAmount, type: 'positive', date: time };
      const sendTx = { id: 'snd-' + Date.now(), title: 'إرسال (تحويل ذاتي)', amount: numAmount, type: 'negative', date: time };
      setTransactions(prev => [receiveTx, sendTx, ...prev]);
      Alert.alert('نجاح', `تم إرسال واستلام $${numAmount} لمحفظتك بنجاح!`);
    } else {
      setBalance(prev => prev - numAmount);
      const sendTx = { id: 'snd-' + Date.now(), title: `تحويل إلى ${recipientAddress.substring(0,6)}...`, amount: numAmount, type: 'negative', date: time };
      setTransactions(prev => [sendTx, ...prev]);
      Alert.alert('نجاح', `تم إرسال $${numAmount} بنجاح!`);
    }

    setSendModalVisible(false);
    setAmount('');
    setRecipientAddress('');
  };

  const simulateReceive = () => {
    const receivedAmount = 150.00;
    setBalance(prev => prev + receivedAmount);
    const newTx = { id: 'rcv-' + Date.now(), title: 'إيداع خارجي', amount: receivedAmount, type: 'positive', date: getCurrentTime() };
    setTransactions(prev => [newTx, ...prev]);
    setReceiveModalVisible(false);
    Alert.alert('رصيد جديد 🤑', `تم استلام $${receivedAmount} بنجاح!`);
  };

  const clearHistory = () => {
    Alert.alert('مسح السجل', 'هل أنت متأكد من حذف جميع المعاملات؟', [
      { text: 'إلغاء', style: 'cancel' },
      { text: 'مسح', onPress: () => setTransactions([]), style: 'destructive' }
    ]);
  };

  // محتوى الصفحة الرئيسية
  const renderHome = () => (
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
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>المعاملات الأخيرة</Text>
          {transactions.length > 0 && (
            <TouchableOpacity onPress={clearHistory}>
              <Text style={styles.clearBtnText}>مسح</Text>
            </TouchableOpacity>
          )}
        </View>

        {transactions.length === 0 ? (
          <Text style={styles.emptyText}>لا توجد معاملات حالية.</Text>
        ) : (
          transactions.map((tx) => (
            <View key={tx.id} style={styles.transactionItem}>
              <View style={styles.txInfo}>
                <Text style={styles.transactionTitle}>{tx.title}</Text>
                <Text style={styles.txDate}>{tx.date}</Text>
              </View>
              <Text style={tx.type === 'positive' ? styles.transactionAmountPositive : styles.transactionAmountNegative}>
                {tx.type === 'positive' ? '+' : '-'} $ {tx.amount.toFixed(2)}
              </Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );

  // محتوى صفحة التحويلات والشبكات
  const renderTransfer = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>شبكات التحويل 🌐</Text>
      </View>
      <View style={styles.pageCard}>
        <Text style={styles.pageCardTitle}>شبكة TRON (TRC20)</Text>
        <Text style={styles.pageCardDesc}>الرسوم منخفضة والتحويل فوري. المدعومة رئيسياً في المحفظة.</Text>
        <View style={styles.statusBadge}><Text style={styles.statusText}>نشطة وآمنة ✅</Text></View>
      </View>
      <View style={styles.pageCard}>
        <Text style={styles.pageCardTitle}>شبكة Ethereum (ERC20)</Text>
        <Text style={styles.pageCardDesc}>شبكة عالية الأمان لكن رسوم الغاز مرتفعة نسبياً.</Text>
        <View style={[styles.statusBadge, {backgroundColor: '#333'}]}><Text style={[styles.statusText, {color: '#aaa'}]}>قريباً...</Text></View>
      </View>
    </ScrollView>
  );

  // محتوى صفحة الإعدادات والحساب
  const renderSettings = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>إعدادات الحساب ⚙️</Text>
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>اسم المالك</Text>
        <Text style={styles.settingValue}>SHARIF HAMAD</Text>
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>الوكالة</Text>
        <Text style={styles.settingValue}>وكالة الشريف</Text>
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>إصدار التطبيق</Text>
        <Text style={styles.settingValue}>1.0.0 (Beta)</Text>
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* عرض الصفحة النشطة */}
      <View style={styles.contentContainer}>
        {activeTab === 'home' && renderHome()}
        {activeTab === 'transfer' && renderTransfer()}
        {activeTab === 'settings' && renderSettings()}
      </View>

      {/* شريط التنقل السفلي */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('home')}>
          <Text style={[styles.navText, activeTab === 'home' && styles.navTextActive]}>🏠 الرئيسية</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('transfer')}>
          <Text style={[styles.navText, activeTab === 'transfer' && styles.navTextActive]}>🌐 الشبكات</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('settings')}>
          <Text style={[styles.navText, activeTab === 'settings' && styles.navTextActive]}>⚙️ الإعدادات</Text>
        </TouchableOpacity>
      </View>

      {/* نافذة الإرسال */}
      <Modal visible={sendModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>إرسال أموال (USDT)</Text>
            <TextInput style={styles.input} placeholder="الصق عنوان المحفظة هنا..." placeholderTextColor="#888" value={recipientAddress} onChangeText={setRecipientAddress} />
            <TextInput style={styles.input} placeholder="أدخل المبلغ..." placeholderTextColor="#888" keyboardType="numeric" value={amount} onChangeText={setAmount} />
            <View style={styles.modalActions}>
              <TouchableOpacity style={[styles.modalBtn, styles.cancelBtn]} onPress={() => setSendModalVisible(false)}><Text style={styles.modalBtnText}>إلغاء</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.modalBtn, styles.confirmBtn]} onPress={confirmSend}><Text style={styles.modalBtnText}>تأكيد</Text></TouchableOpacity>
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
              <Text style={styles.addressText} selectable={true}>{walletAddress}</Text>
            </View>
            <Text style={styles.hintText}>(اضغط مطولاً على العنوان أعلاه لنسخه)</Text>

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
  container: { flex: 1, backgroundColor: '#121212' },
  contentContainer: { flex: 1, padding: 20 },
  header: { marginTop: 10, marginBottom: 20, alignItems: 'center' },
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
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-space', alignItems: 'center', marginBottom: 15, justifyContent: 'space-between' },
  sectionTitle: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' },
  clearBtnText: { color: '#FF5252', fontSize: 14, fontWeight: 'bold' },
  emptyText: { color: '#888', textAlign: 'center', marginTop: 20, fontSize: 16 },
  transactionItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1E1E1E', padding: 15, borderRadius: 10, marginBottom: 10 },
  txInfo: { flex: 1 },
  transactionTitle: { color: '#ffffff', fontSize: 16, marginBottom: 5 },
  txDate: { color: '#888', fontSize: 12 },
  transactionAmountPositive: { color: '#00FFA3', fontSize: 16, fontWeight: 'bold' },
  transactionAmountNegative: { color: '#FF5252', fontSize: 16, fontWeight: 'bold' },
  bottomNav: { flexDirection: 'row', backgroundColor: '#1E1E1E', borderTopWidth: 1, borderTopColor: '#333', paddingVertical: 12 },
  navItem: { flex: 1, alignItems: 'center' },
  navText: { color: '#888', fontSize: 14, fontWeight: 'bold' },
  navTextActive: { color: '#00FFA3' },
  pageCard: { backgroundColor: '#1E1E1E', padding: 20, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#333' },
  pageCardTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  pageCardDesc: { color: '#aaa', fontSize: 14, marginBottom: 15 },
  statusBadge: { backgroundColor: 'rgba(0,255,163,0.1)', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, alignSelf: 'flex-start' },
  statusText: { color: '#00FFA3', fontSize: 12, fontWeight: 'bold' },
  settingItem: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#1E1E1E', padding: 18, borderRadius: 10, marginBottom: 12, borderWidth: 1, borderColor: '#333' },
  settingText: { color: '#fff', fontSize: 16 },
  settingValue: { color: '#00FFA3', fontSize: 16, fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#1E1E1E', width: '90%', padding: 25, borderRadius: 15, borderWidth: 1, borderColor: '#333' },
  modalTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { backgroundColor: '#2C2C2C', color: '#fff', padding: 15, borderRadius: 10, fontSize: 16, textAlign: 'right', marginBottom: 15 },
  modalActions: { flexDirection: 'row', justifyContent: 'space-between' },
  modalBtn: { flex: 1, padding: 12, borderRadius: 10, alignItems: 'center', marginHorizontal: 5 },
  cancelBtn: { backgroundColor: '#FF5252' },
  confirmBtn: { backgroundColor: '#00FFA3' },
  modalBtnText: { color: '#121212', fontSize: 16, fontWeight: 'bold' },
  addressBox: { backgroundColor: '#2C2C2C', padding: 15, borderRadius: 10, marginBottom: 10, alignItems: 'center' },
  addressText: { color: '#00FFA3', fontSize: 18, letterSpacing: 1, fontWeight: 'bold' },
  hintText: { color: '#888', fontSize: 12, textAlign: 'center', marginBottom: 25 },
  simulateBtn: { backgroundColor: '#00FFA3', padding: 15, borderRadius: 10, alignItems: 'center' },
  simulateBtnText: { color: '#121212', fontSize: 16, fontWeight: 'bold' },
});

export default App;
