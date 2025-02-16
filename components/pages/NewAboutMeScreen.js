import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg'; // Assurez-vous que vous avez installé 'react-native-svg'
import { InfoBox } from '../atoms/Container'; // Importez votre InfoBox si ce n'est pas déjà fait
import { Container, Text } from '../atoms';
import SvgFlecheRetour from '../../assets/svg/flecheRetour'; 
import { useNavigation } from 'expo-router';

const titleData = [
  {
    svgSource: `
      <svg width="40" height="52" viewBox="0 0 40 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.91" d="M24.3222 24.1503C28.7975 22.3331 31.9796 17.8049 31.9796 12.5013C31.9796 5.61138 26.6081 0 20 0C13.3919 0 8.02042 5.61138 8.02042 12.5013C8.02042 17.8049 11.2082 22.3331 15.6778 24.1503C6.7215 26.222 0 34.5621 0 44.5182C0 48.6438 3.21611 52 7.1696 52H32.8304C36.7839 52 40 48.6438 40 44.5182C40 34.5562 33.2785 26.222 24.3222 24.1503Z" fill="#7790ED"/>
      </svg>
    `,
    title: 'Mes informations personnelles',
  },
];

export default function NewAboutMeScreen() {
    
const aboutMeData = [
    {
      svgSource: `<svg width="29" height="35" viewBox="0 0 29 35" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M10.6329 24.5443H17.7215C18.2236 24.5443 18.6448 24.3742 18.9851 24.0339C19.3253 23.6937 19.4949 23.2731 19.4937 22.7722V17.4557C19.4937 16.9536 19.3235 16.533 18.9833 16.1939C18.643 15.8549 18.2224 15.6847 17.7215 15.6835V13.9114C17.7215 12.9367 17.3748 12.1026 16.6813 11.4091C15.9878 10.7156 15.1531 10.3683 14.1772 10.3671C13.2014 10.3659 12.3673 10.7132 11.6749 11.4091C10.9826 12.105 10.6353 12.9391 10.6329 13.9114V15.6835C10.1308 15.6835 9.71021 15.8537 9.37114 16.1939C9.03207 16.5342 8.86194 16.9548 8.86076 17.4557V22.7722C8.86076 23.2743 9.03089 23.6954 9.37114 24.0357C9.71139 24.3759 10.132 24.5455 10.6329 24.5443ZM12.4051 15.6835V13.9114C12.4051 13.4093 12.5752 12.9887 12.9154 12.6496C13.2557 12.3105 13.6763 12.1404 14.1772 12.1392C14.6781 12.1381 15.0993 12.3082 15.4408 12.6496C15.7822 12.9911 15.9517 13.4116 15.9494 13.9114V15.6835H12.4051ZM14.1772 35C13.9705 35 13.7785 34.9852 13.6013 34.9557C13.4241 34.9262 13.2468 34.8819 13.0696 34.8228C9.08228 33.4937 5.90717 31.0345 3.5443 27.4453C1.18143 23.8561 0 19.9946 0 15.8608V7.48734C0 6.74895 0.21443 6.08439 0.643291 5.49367C1.07215 4.90295 1.62565 4.47468 2.3038 4.20886L12.9367 0.221519C13.3502 0.0738397 13.7637 0 14.1772 0C14.5907 0 15.0042 0.0738397 15.4177 0.221519L26.0506 4.20886C26.73 4.47468 27.2841 4.90295 27.7129 5.49367C28.1418 6.08439 28.3556 6.74895 28.3544 7.48734V15.8608C28.3544 19.9958 27.173 23.8579 24.8101 27.4471C22.4473 31.0363 19.2722 33.4949 15.2848 34.8228C15.1076 34.8819 14.9304 34.9262 14.7532 34.9557C14.576 34.9852 14.384 35 14.1772 35ZM14.1772 32.375C17.2489 31.4003 20.9193 29.1741 22.9277 26.25C24.9362 23.3259 25.5527 19.4346 25.5527 15.8608V7L14.1772 2.625L2.80273 7V15.8608C2.80273 19.4346 4.2943 23.3259 6.30273 26.25C8.31117 29.1741 11.1055 31.4003 14.1772 32.375Z" fill="#7790ED"/>
  </svg>
  `,
      text: 'Nom, date de naissance, adresse',
      onPress: () => navigation.navigate('UserInfoScreen'),
    },
    {
      svgSource: `
        <svg width="41" height="31" viewBox="0 0 41 31" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4.09091 1.25H36.8182C38.6633 1.25 40.1591 2.74578 40.1591 4.59091V26.4091C40.1591 28.2542 38.6633 29.75 36.8182 29.75H4.09091C2.24578 29.75 0.75 28.2542 0.75 26.4091V4.59091C0.75 2.74578 2.24578 1.25 4.09091 1.25Z" stroke="#7790ED" stroke-width="1.5"/>
  <mask id="path-2-inside-1_1093_7111" fill="white">
  <path d="M40.9091 8.68164H0H40.9091Z"/>
  </mask>
  <path d="M40.9091 7.18164H0V10.1816H40.9091V7.18164Z" fill="#7790ED" mask="url(#path-2-inside-1_1093_7111)"/>
  <path d="M19.0927 16.8633H8.18359M16.3654 22.3178H8.18359" stroke="#7790ED" stroke-width="1.5" stroke-linecap="round"/>
  </svg>
  `,
      text: 'Mes moyens de payement',
      onPress: () => navigation.navigate('PaymentInfoScreen'),
    },
    {
      svgSource: `
     <svg width="35" height="31" viewBox="0 0 35 31" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M32.1429 0.5H2.14286C1.57454 0.5 1.02949 0.725765 0.627628 1.12763C0.225765 1.52949 0 2.07454 0 2.64286V28.3571C0 28.9255 0.225765 29.4705 0.627628 29.8724C1.02949 30.2742 1.57454 30.5 2.14286 30.5H32.1429C32.7112 30.5 33.2562 30.2742 33.6581 29.8724C34.06 29.4705 34.2857 28.9255 34.2857 28.3571V2.64286C34.2857 2.07454 34.06 1.52949 33.6581 1.12763C33.2562 0.725765 32.7112 0.5 32.1429 0.5ZM2.14286 28.3571V2.64286H32.1429V28.3571H2.14286Z" fill="#7790ED"/>
  <path d="M7.35882 11.9286C7.99454 11.9286 8.61599 11.7401 9.14458 11.3869C9.67316 11.0337 10.0851 10.5317 10.3284 9.94434C10.5717 9.35701 10.6354 8.71072 10.5113 8.08721C10.3873 7.4637 10.0812 6.89097 9.63166 6.44144C9.18213 5.99192 8.6094 5.68579 7.98589 5.56176C7.36238 5.43774 6.7161 5.50139 6.12876 5.74467C5.54143 5.98796 5.03943 6.39994 4.68624 6.92853C4.33305 7.45711 4.14453 8.07856 4.14453 8.71429C4.14453 9.56677 4.48318 10.3843 5.08597 10.9871C5.68877 11.5899 6.50634 11.9286 7.35882 11.9286ZM7.35882 7C7.69832 6.99788 8.03081 7.09661 8.31412 7.28369C8.59744 7.47076 8.81883 7.73775 8.95023 8.0508C9.08162 8.36385 9.1171 8.70887 9.05217 9.04211C8.98724 9.37535 8.82482 9.68181 8.58551 9.92263C8.34619 10.1635 8.04076 10.3278 7.70793 10.3948C7.3751 10.4618 7.02987 10.4285 6.716 10.2991C6.40213 10.1697 6.13376 9.94994 5.94492 9.6678C5.75607 9.38566 5.65525 9.0538 5.65525 8.71429C5.65806 8.26334 5.83844 7.83166 6.15732 7.51279C6.47619 7.19391 6.90787 7.01353 7.35882 7.01072V7Z" fill="#7790ED"/>
  <path d="M22.2791 13.8116L16.4934 19.5973L12.2077 15.3116C12.007 15.112 11.7354 15 11.4523 15C11.1693 15 10.8977 15.112 10.697 15.3116L4.21484 21.8794V24.9116L11.4898 17.6366L15.0148 21.108L10.997 25.1258H13.9434L22.997 16.0723L30.0148 23.058V20.0366L23.7898 13.8116C23.5891 13.612 23.3175 13.5 23.0345 13.5C22.7514 13.5 22.4799 13.612 22.2791 13.8116Z" fill="#7790ED"/>
  </svg>
  
  `,
      text: 'Mes photos',
      onPress: () => navigation.navigate('UserPhotosScreen'),
    },
  ];

    const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {titleData.map((item, index) => (
          <Container.BasicView key={index} style={styles.headerContainer}>
            <TouchableOpacity style={styles.goBack} onPress={() => navigation.goBack()}>
              <SvgFlecheRetour />
              <SvgXml xml={item.svgSource} style={styles.image} />
            </TouchableOpacity>
            <Text.Base style={styles.title}>{item.title}</Text.Base>
            </Container.BasicView>
          
        ))}

        {aboutMeData.map((data, index) => (
            <Container.BasicView key={index} style={styles.infoBoxContainer}>
            <InfoBox 
                key={index} 
                svgSource={data.svgSource} 
                text={data.text} 
                onPress={data.onPress} 
            />
            </Container.BasicView>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  goBack: {
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    marginLeft: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'left',
    marginLeft: 10,
    fontFamily: "CustomFontBoldLight",
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '90%',
    padding: 15,
    elevation: 3,
  },
  infoBoxContainer: {
    width: '100%',
    alignItems: 'center',
  },
});
