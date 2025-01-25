import React from 'react';
import { TouchableOpacity, ScrollView } from 'react-native';
import { Container } from '../atoms';
import { SwipeCard } from "../organims";

const SwipePlusScreen = ({ route }) => {
  const { name, profilePic, profilePic2, profilePic3, location, carac2, carac3, date, bio } = route.params;

  return (
    <Container.BasicView style={{ flex: 1, backgroundColor: "white", marginTop: 50, marginBottom: 50 }}>
        <ScrollView>
            <TouchableOpacity style={{ flex: 1, backgroundColor: "white", paddingBottom: 20, borderRadius: 15, overflow: "hidden" }}>
                <SwipeCard.NameSwipe name={name} />
                <SwipeCard.ImageSwipe profilePic={profilePic} />

                <Container.BasicView style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 10, marginBottom: 20 }}>
                    <SwipeCard.SpecialSwipe caractere={location} />
                    <SwipeCard.SpecialSwipe caractere={carac2} />
                    <SwipeCard.SpecialSwipe caractere={carac3} />
                </Container.BasicView>

                <SwipeCard.DateSwipe date={date} />
                {profilePic2 && <SwipeCard.ImageSwipe profilePic={profilePic2} />}

                <SwipeCard.DescriptionSwipe bio={bio} />
                {profilePic3 && <SwipeCard.ImageSwipe profilePic={profilePic3} />}
                
            </TouchableOpacity>
        </ScrollView>
    </Container.BasicView>
  );
};

export default SwipePlusScreen;
