import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Text } from '../atoms';
import { SwipeCard } from "../organims";
import SvgFlecheRetour from '@/assets/svg/flecheRetour';
import { useNavigation } from 'expo-router';

const SwipePlusScreen = ({ route }) => {
  const { name, profilePic, profilePic2, profilePic3, dateDispo, location, carac2, carac3, date, bio } = route.params;
  const navigation = useNavigation();
  return (
    <Container.BasicView style={{ flex: 1, backgroundColor: "white", marginTop:30, padding: 20}}>
        <Container.BasicView 
          style={{ 
            flexDirection: "row", 
            alignItems: "center", 
            marginBottom: 20, 
            justifyContent: "center", 
            position: "relative" 
          }}
        >
          <TouchableOpacity 
            style={{ position: "absolute", left: 0 }} 
            onPress={() => navigation.goBack()}
          >
            <SvgFlecheRetour />
          </TouchableOpacity>

          <Text.Base
            style={{
              fontSize: 24,
              fontWeight: "bold",
              textTransform: "uppercase",
              fontFamily: "CustomFontBold",
            }}
          >
            {name}
          </Text.Base>
        </Container.BasicView>
        <Container.BasicScrollView>
            <Container.BasicView style={{ flex: 1, backgroundColor: "white", paddingBottom: 20, borderRadius: 15, overflow: "hidden" }}>
                <SwipeCard.ImageSwipe profilePic={profilePic} />

                <Container.BasicView style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 10, marginBottom: 20 }}>
                    <SwipeCard.SpecialSwipe caractere={location} />
                    <SwipeCard.SpecialSwipeNoImage caractere={carac2} />
                    <SwipeCard.SpecialSwipeNoImage caractere={carac3} />
                </Container.BasicView>

                {dateDispo && <SwipeCard.DateSwipe date={dateDispo} />}
                {profilePic2 && <SwipeCard.ImageSwipe profilePic={profilePic2} />}

                <SwipeCard.DescriptionSwipe bio={bio} />
                {profilePic3 && <SwipeCard.ImageSwipe profilePic={profilePic3} />}
                
            </Container.BasicView>
        </Container.BasicScrollView>
    </Container.BasicView>
  );
};

export default SwipePlusScreen;
