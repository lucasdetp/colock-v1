import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { firebaseAuth, firestoreDB } from '../../config/firebase.config';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { SvgXml } from 'react-native-svg';
import SvgFlecheRetour from '../../assets/svg/flecheRetour';
import { useNavigation } from 'expo-router';
import { Container, Text, TextInput } from '../atoms';

// 📅 Configurer le calendrier en français
LocaleConfig.locales['fr'] = {
  monthNames: [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ],
  monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avr.', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
  dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
  today: "Aujourd'hui"
};
LocaleConfig.defaultLocale = 'fr';

const WhenBudgetTemplate = ({ svgSource, title }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const user = firebaseAuth.currentUser;
    if (user) {
      const docRef = doc(firestoreDB, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.dateDispo) {
          setSelectedDate(data.dateDispo);
        }
      }
    }
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const handleSave = async () => {
    if (!selectedDate) return;

    setSaving(true);
    setMessage(null);

    try {
      const user = firebaseAuth.currentUser;
      if (user) {
        await setDoc(doc(firestoreDB, 'users', user.uid), {
          dateDispo: selectedDate,
        }, { merge: true });

        setMessage('Enregistré avec succès ✅');
        setTimeout(() => setMessage(null), 5000);
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      setMessage('Un problème est survenu ❌');
      setTimeout(() => setMessage(null), 5000);
    }

    setSaving(false);
  };

  return (
    <Container.BasicView style={styles.mainContainer}>
      <Container.BasicView style={styles.headerContainer}>
        <TouchableOpacity style={styles.goBack} onPress={() => navigation.goBack()}>
          <SvgFlecheRetour />
        </TouchableOpacity>
        <SvgXml xml={svgSource} style={styles.image} />
        <Text.Base style={styles.title}>{title}</Text.Base>
      </Container.BasicView>

      <Container.BasicView style={{ width: '100%'}}>
        <Calendar
          locale='fr'
          firstDay={1}
          markedDates={selectedDate ? { [selectedDate]: { selected: true, selectedColor: '#7790ED' } } : {}}
          onDayPress={handleDayPress}
          style={{ width: '100%' }}
          theme={{
            selectedDayBackgroundColor: '#7790ED',
            todayTextColor: '#FF5733',
            arrowColor: '#7790ED',
            textMonthFontWeight: 'bold',
            textDayFontSize: 16,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 14,
          }}
        />
        
      </Container.BasicView>
      <Container.BasicView style={{ width: '100%', alignItems: 'center' }}> 
        <Text.Base style={{ textAlign: 'left', width: '100%', alignItems: 'left', marginTop: 50, marginLeft: 40, fontSize: 21, justifyContent: 'flex-start' }}>
          Ton budget est entre :
        </Text.Base>

        <Container.BasicView 
          style={{ 
            width: '100%', 
            flexDirection: 'row', 
            justifyContent: 'center', 
            alignItems: 'center', 
            gap: 10, 
            marginTop: 10 
          }}
        > 
          <TextInput.Base 
            placeholder='0€' 
            placeholderTextColor="#999"
            style={{ 
              flex: 1, 
              maxWidth: 170, 
              textAlign: 'center', 
              paddingVertical: 10, 
              borderWidth: 2, 
              borderColor: '#7790ED', 
              borderRadius: 15, 
              paddingHorizontal: 10 
            }} 
          />
          <TextInput.Base 
            placeholder='800€' 
            placeholderTextColor="#999"
            style={{ 
              flex: 1, 
              maxWidth: 170, 
              textAlign: 'center', 
              paddingVertical: 10, 
              borderWidth: 2, 
              borderColor: '#7790ED', 
              borderRadius: 15, 
              paddingHorizontal: 10 
            }} 
          />
        </Container.BasicView>
      </Container.BasicView>


      {/* 🔘 Bouton Enregistrer */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={saving}>
        <Text.Base style={styles.saveButtonText}>{saving ? 'Enregistrement...' : 'Enregistrer'}</Text.Base>
      </TouchableOpacity>

      {/* 🛑 Message */}
      {message && (
        <View style={[styles.messageContainer, message.includes('✅') ? styles.successMessage : styles.errorMessage]}>
          <Text.Base style={styles.messageText}>{message}</Text.Base>
        </View>
      )}
    </Container.BasicView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'left',
    width: '100%',
    padding: 15,
    backgroundColor: '#fff',
    elevation: 3,
  },
  image: {
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: 10,
  },
  goBack: {
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: '#6A7CFF',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 10,
    marginTop: 20,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  messageContainer: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    width: '90%',
    alignItems: 'center',
  },
  successMessage: {
    backgroundColor: '#28a745',
  },
  errorMessage: {
    backgroundColor: '#dc3545',
  },
  messageText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default WhenBudgetTemplate;
