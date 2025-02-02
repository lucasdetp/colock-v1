import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, ActivityIndicator, Text, StyleSheet } from 'react-native';
import AccountScreenTemplate from '../templates/AccountScreenTemplate';
import { firebaseAuth, firestoreDB } from '../../config/firebase.config';
import { doc, onSnapshot } from 'firebase/firestore';

const AccountScreen = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);

  const user = firebaseAuth.currentUser;

  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(doc(firestoreDB, 'users', user.uid), (docSnap) => {
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      });

      return () => unsubscribe();
    }
  }, [user]);

  const calculateFillPercentage = () => {
    const totalFields = 8;
    let filledFields = 0;

    if (userData?.fullName) filledFields++;
    if (userData?.lastName) filledFields++;
    if (userData?.birthdate) filledFields++;
    if (userData?.facturationAddress) filledFields++;
    if (userData?.nameCard) filledFields++;
    if (userData?.numberCard) filledFields++;
    if (userData?.dateCard) filledFields++;
    if (userData?.ccvCard) filledFields++;

    return Math.round((filledFields / totalFields) * 100);
  };

  const AboutMePourcentage = calculateFillPercentage(); 


  const calculateCompletionAboutMe2 = () => {
    let filledFields = 0;
    const totalFields = 6;

    if (userData?.showGender !== undefined) filledFields++;
    if (userData?.rythme !== undefined) filledFields++;

    if (userData?.traitsCaracterePrincipaux?.[0] !== null) filledFields++;
    if (userData?.traitsCaracterePrincipaux?.[1] !== null) filledFields++;
    if (userData?.traitsCaracterePrincipaux?.[2] !== null) filledFields++;

    if (userData?.gender !== undefined) filledFields++;
    return Math.round((filledFields / totalFields) * 100);
  };

  const AboutMe2Pourcentage = calculateCompletionAboutMe2(); 

  const boxImages = [
    {
      svg1: `<svg width="39" height="30" viewBox="0 0 39 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.91" d="M38.2463 9.15644C38.2463 11.4996 37.3495 13.8428 35.5449 15.6323L22.2074 28.8848C20.7128 30.3699 18.2844 30.3736 16.7898 28.8848L3.44867 15.6323C-0.149557 12.0534 -0.149557 6.25953 3.44867 2.68423C5.24594 0.891076 7.60785 0 9.96608 0C12.3243 0 14.6862 0.891076 16.4835 2.68423L19.5023 5.67648L22.3514 2.84557C25.9644 -0.744396 31.8802 -0.920411 35.5117 2.64756C37.3384 4.44071 38.25 6.79491 38.25 9.16011L38.2463 9.15644Z" fill="#7790ED"/>
      </svg>`,
      text1: "Profils likés",
    },
    {
      svg2: `<svg width="35" height="36" viewBox="0 0 35 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_236_6498)">
          <path d="M-0.00439453 29.2279V34.3772C-0.00439453 34.675 0.113902 34.9606 0.324472 35.1711C0.535041 35.3817 0.820634 35.5 1.11842 35.5H6.2789C6.57611 35.4999 6.86118 35.382 7.07161 35.1721L28.2884 13.9554L21.5515 7.21846L0.325715 28.4352C0.114994 28.6453 -0.0037357 28.9304 -0.00439453 29.2279ZM24.3316 4.43612L31.0685 11.173L34.3471 7.8944C34.7681 7.47328 35.0046 6.9022 35.0046 6.30673C35.0046 5.71127 34.7681 5.14019 34.3471 4.71907L30.7878 1.15749C30.3667 0.736499 29.7956 0.5 29.2001 0.5C28.6046 0.5 28.0336 0.736499 27.6124 1.15749L24.3316 4.43612Z" fill="#FF0004"/>
        </g>
        <defs>
          <clipPath id="clip0_236_6498">
            <rect width="35.009" height="35" fill="white" transform="translate(-0.00439453 0.5)"/>
          </clipPath>
        </defs>
      </svg>`,
      text2: "La vie de la coloc",
    },
    {
      svg3: `<svg width="19" height="40" viewBox="0 0 19 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.81819 15.2726L13.8155 0L0.269043 20.8067L7.65442 20.4182L1.80666 40L18.7306 14.4745L9.81819 15.2726Z" fill="#7790ED"/>
      </svg>`,
      text3: "Mes boosts",
    },
  ];

  const infoBoxData = [
    {
      svgSource: ` <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.64142 8.48995L6.5 8.3673L7.35858 8.48995C8.88403 8.70787 9.89495 9.343 10.535 10.1597C11.1859 10.9901 11.5192 12.0939 11.5192 13.3425C11.5192 13.9792 10.9984 14.5 10.3617 14.5H2.63794C2.00128 14.5 1.48047 13.9792 1.48047 13.3425C1.48047 12.0762 1.81472 10.9739 2.46362 10.1492C3.10201 9.33788 4.11219 8.70841 5.64142 8.48995ZM6.5 6.77924L5.81623 6.55132C4.66446 6.16739 3.8962 5.14599 3.8962 4.10695C3.8962 2.67097 5.06719 1.5 6.50319 1.5C7.93918 1.5 9.11013 2.67095 9.11013 4.10695C9.11013 5.12126 8.33386 6.16795 7.18377 6.55132L6.5 6.77924Z" stroke="#7790ED" stroke-width="2" stroke-miterlimit="10"/>
                </svg>
                `,
      text: 'Mes informations personnelles',
      percentage: AboutMePourcentage,
      onPress: () => navigation.navigate('AboutMeScreen'),
    },
    {
      svgSource: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16" fill="none">
                    <path opacity="0.91" d="M18.2995 4.96903C18.2637 4.09992 17.9155 3.24701 17.2521 2.58498L17.2517 2.5846C15.8714 1.20581 13.5663 1.23759 12.1328 2.65717C12.1327 2.65721 12.1327 2.65724 12.1327 2.65727L10.7136 4.06475L10.0042 4.76833L9.29999 4.05956L7.80882 2.55872L7.80728 2.55717C7.11475 1.8571 6.20248 1.50459 5.28529 1.50004C4.3693 1.4955 3.45427 1.84004 2.75548 2.5343L2.75471 2.53506C1.35409 3.9236 1.3432 6.18385 2.73187 7.58649C2.73189 7.58651 2.73191 7.58653 2.73193 7.58656C2.73203 7.58665 2.73212 7.58674 2.73221 7.58684L9.32091 14.2336L18.2995 4.96903ZM18.2995 4.96903L18.2987 5.12913C18.2942 6.04567 17.9421 6.95668 17.2408 7.65189L10.596 14.2387C10.5959 14.2388 10.5958 14.2389 10.5957 14.239C10.2413 14.5894 9.67124 14.5863 9.32125 14.2339L18.2995 4.96903Z" stroke="#7790ED" stroke-width="2" stroke-miterlimit="10"/>
                  </svg>
                `,
      text: 'À propos de moi',
      percentage: AboutMe2Pourcentage,
      onPress: () => navigation.navigate('AboutMeScreen2'),
    },
    {
      svgSource: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.1603 13.8226L12.1785 10.8408C12.9931 9.75903 13.4755 8.41563 13.4755 6.9609C13.4755 3.39831 10.5772 0.5 7.01461 0.5C3.45202 0.5 0.553711 3.39831 0.553711 6.9609C0.553711 10.5235 3.45202 13.4218 7.01461 13.4218C8.41553 13.4218 9.71068 12.9728 10.7702 12.212L13.7706 15.2124C13.9617 15.4035 14.214 15.5 14.4645 15.5C14.715 15.5 14.9674 15.4035 15.1585 15.2124C15.5426 14.8283 15.5426 14.2067 15.1585 13.8226H15.1603ZM7.01461 11.455C4.53564 11.455 2.5187 9.43802 2.5187 6.95905C2.5187 4.48007 4.53564 2.46313 7.01461 2.46313C9.49359 2.46313 11.5105 4.48007 11.5105 6.95905C11.5105 9.43802 9.49359 11.455 7.01461 11.455Z" fill="#7790ED"/>
<path d="M7.66441 8.81139V6.15984C7.63843 5.90935 7.41578 5.66997 7.16528 5.63472C6.98159 5.60874 6.44906 5.60874 6.26536 5.63472C5.70129 5.71079 5.55283 6.52539 6.04454 6.81485C6.13546 6.86866 6.37668 6.90019 6.39338 6.94844C6.40266 7.45499 6.39339 7.96154 6.3971 8.4681C6.39895 8.80023 6.35071 9.32349 6.3971 9.6278C6.43235 9.85231 6.7014 10.0935 6.92592 10.1251C7.14672 10.1548 7.75162 10.1511 7.94645 10.0639C7.97057 10.0527 7.9947 10.036 7.9947 10.036C8.05407 9.99891 8.13014 9.95066 8.19323 9.86902C8.23219 9.81892 8.2526 9.77439 8.26374 9.74841C8.45857 9.27525 8.12643 8.88373 7.66069 8.81322L7.66441 8.81139Z" fill="#7790ED"/>
<path d="M6.92598 4.96656C7.94837 5.07603 7.90569 3.52855 6.87216 3.70668C6.22273 3.81801 6.23202 4.89234 6.92598 4.96656Z" fill="#7790ED"/>
</svg>

                `,
      text: 'Tu cherches...',
      percentage: 50,
      onPress: () => navigation.navigate('SearchScreen'),
    },
  ];
  

  const largeBoxData = {
    imageSource: `
      <svg width="315" height="28" viewBox="0 0 315 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_236_6469)">
      <path d="M52.2701 1.47266C56.3654 1.47266 59.1551 3.09679 61.8026 5.42591L57.6011 10.2282C55.9409 8.35768 53.9643 7.82705 52.2701 7.82705C48.421 7.82705 45.9157 10.6508 45.9157 14.2174C45.9157 17.7841 48.4229 20.6078 52.2701 20.6078C53.9643 20.6078 55.9409 20.0791 57.6011 18.2067L61.8026 23.009C59.1551 25.3381 56.3654 26.9622 52.2701 26.9622C43.9371 26.9622 38.5 21.1025 38.5 14.2174C38.5 7.33242 43.9371 1.47266 52.2701 1.47266Z" fill="#7790ED"/>
      <path d="M73.0995 26.9617C66.7432 26.9617 62.3655 22.6541 62.3655 17.2889C62.3655 11.9238 66.7432 7.61426 73.0995 7.61426C79.4558 7.61426 83.8317 11.9219 83.8317 17.2889C83.8317 22.6559 79.4539 26.9617 73.0995 26.9617ZM73.0995 21.3142C75.3945 21.3142 77.0888 19.6559 77.0888 17.2889C77.0888 14.9219 75.3945 13.2637 73.0995 13.2637C70.8045 13.2637 69.1103 14.9579 69.1103 17.2889C69.1103 19.6199 70.7685 21.3142 73.0995 21.3142Z" fill="#7790ED"/>
      <path d="M106.778 26.9617C100.422 26.9617 96.0439 22.6541 96.0439 17.2889C96.0439 11.9238 100.422 7.61426 106.778 7.61426C113.134 7.61426 117.51 11.9219 117.51 17.2889C117.51 22.6559 113.132 26.9617 106.778 26.9617ZM106.778 21.3142C109.073 21.3142 110.767 19.6559 110.767 17.2889C110.767 14.9219 109.073 13.2637 106.778 13.2637C104.483 13.2637 102.789 14.9579 102.789 17.2889C102.789 19.6199 104.447 21.3142 106.778 21.3142Z" fill="#7790ED"/>
      <path d="M93.5746 26.5753H86.301V1.04785H93.5746V26.5753Z" fill="#7790ED"/>
      <path d="M129.902 7.61426C132.656 7.61426 135.692 8.49739 137.775 10.51L134.28 14.7817C132.832 13.51 131.35 13.2276 130.397 13.2276C127.996 13.2276 126.266 14.9219 126.266 17.2889C126.266 19.6559 127.996 21.3502 130.397 21.3502C131.314 21.3502 132.834 21.0678 134.28 19.7962L137.775 24.0678C135.692 26.0805 132.656 26.9617 129.902 26.9617C123.546 26.9617 118.992 22.6541 118.992 17.2889C118.992 11.9238 123.546 7.61426 129.902 7.61426Z" fill="#7790ED"/>
      <path d="M147.095 15.4168L151.579 8.003H159.169V8.95625L153.555 16.6183L155.322 19.7604C156.063 20.996 156.84 21.1382 157.547 21.1382C158.005 21.1382 158.888 20.8558 159.383 20.5734L161.502 24.9512C159.631 26.3991 157.689 26.9638 155.782 26.9638C152.782 26.9638 150.381 25.7983 148.721 22.1274L147.097 18.4206V26.5772H139.823V1.04785H147.097V15.4168H147.095Z" fill="#7790ED"/>
      <path d="M52.0464 18.2419C54.2496 18.2419 56.0357 16.4398 56.0357 14.2167C56.0357 11.9936 54.2496 10.1914 52.0464 10.1914C49.8432 10.1914 48.0571 11.9936 48.0571 14.2167C48.0571 16.4398 49.8432 18.2419 52.0464 18.2419Z" fill="#7790ED"/>
      </g>
      <g clip-path="url(#clip1_236_6469)">
      <path d="M265.921 28H176.654C173.262 28 170.997 25.4942 171.596 22.4073L174.848 5.59274C175.447 2.50584 178.689 0 182.071 0H271.338C274.73 0 276.995 2.50584 276.396 5.59274L273.134 22.4163C272.536 25.5032 269.303 28.0091 265.911 28.0091L265.921 28Z" fill="url(#paint0_linear_236_6469)"/>
      <path d="M187.598 19H184.943V8.5H189.758C192.038 8.5 193.283 10.135 193.283 12.055C193.283 13.975 192.023 15.505 189.758 15.505H187.598V19ZM187.598 13.405H189.443C190.148 13.405 190.613 12.805 190.613 12.07C190.613 11.29 190.148 10.69 189.443 10.69H187.598V13.405ZM197.127 16.81H201.852V19H194.472V8.5H197.127V16.81ZM204.596 19H201.851L205.916 8.5H208.391L212.516 19H209.726L209.006 17.14H205.286L204.596 19ZM207.161 11.32L205.856 15.01H208.406L207.161 11.32ZM211.329 8.5H219.759V10.69H216.849V19H214.194V10.69H211.329V8.5ZM223.561 8.5V19H220.906V8.5H223.561ZM232.324 19L228.139 13.165V19H225.484V8.5H227.539L231.709 14.26V8.5H234.364V19H232.324ZM238.942 8.5V19H236.287V8.5H238.942ZM246.925 8.5H249.58V14.995C249.58 17.71 247.555 19.165 245.155 19.165C242.755 19.165 240.745 17.71 240.745 14.995V8.5H243.4V14.995C243.4 16.27 244.21 16.915 245.155 16.915C246.1 16.915 246.925 16.27 246.925 14.995V8.5ZM258.081 18.88H256.356L254.061 13.255L253.581 19H250.926L251.901 8.5H254.496L257.211 15.13L259.941 8.5H262.536L263.511 19H260.856L260.376 13.255L258.081 18.88Z" fill="#F6F6F6"/>
      </g>
      <defs>
      <linearGradient id="paint0_linear_236_6469" x1="171.702" y1="0.0673301" x2="197.191" y2="61.2161" gradientUnits="userSpaceOnUse">
      <stop offset="0.45" stop-color="#7790ED"/>
      <stop offset="1" stop-color="#9900FF"/>
      </linearGradient>
      <clipPath id="clip0_236_6469">
      <rect width="123" height="25.9141" fill="white" transform="translate(38.5 1.04785)"/>
      </clipPath>
      <clipPath id="clip1_236_6469">
      <rect width="105" height="28.0091" fill="white" transform="translate(171.5)"/>
      </clipPath>
      </defs>
      </svg>
    `,
    text: "Trouver votre colocataire plus rapidement avec notre formule platinium !",
  };
  

  if (!user) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text>Chargement des données utilisateur...</Text>
      </SafeAreaView>
    );
  }

  return (
    <AccountScreenTemplate
      userName={userData?.fullName || "Utilisateur"}
      profilePic={userData?.profilePic || "https://example.com/default-profile.png"}
      additionalDetails={userData?.bio || "Aucun détail supplémentaire disponible"}
      boxImages={boxImages}
      largeBoxData={largeBoxData}
      infoBoxData={infoBoxData}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
});

export default AccountScreen;
