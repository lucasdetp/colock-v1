// components/SwipeScreen.js
import React, { useState, useEffect, useRef } from "react";
import { View, Text, SafeAreaView, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DeckSwiper from "react-native-deck-swiper";
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { firestoreDB } from '../../config/firebase.config';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { LinearGradient } from 'expo-linear-gradient';
import SvgNop from "../../assets/svg/nop";
import SvgYes from "../../assets/svg/yes";
import SvgLoc from "../../assets/svg/loc";
import SvgCalandar from "../../assets/svg/calandar";
import {Button} from '../atoms'; 

const SwipeScreen = () => {
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const auth = getAuth();
  const [swipedAll, setSwipedAll] = useState(false);
  const swiperRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(firestoreDB, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setCurrentUser({
              id: user.uid,
              email: userData?.email,
              fullName: userData?.fullName, 
            });
          } else {
            console.error("User document not found");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        console.log("User not authenticated");
      }
    });
  
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (currentUser) {
      const fetchUsers = async () => {
        try {
          const currentUserSwipeDocRef = doc(firestoreDB, "userSwipe", currentUser.id);
          const currentUserSwipeDocSnap = await getDoc(currentUserSwipeDocRef);
          const currentUserSwipedUsers = currentUserSwipeDocSnap.data()?.swipedUsers || [];
          const usersCollection = collection(firestoreDB, "users");
          const usersSnapshot = await getDocs(usersCollection);
          const usersData = usersSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
  
          const filteredUsers = usersData.filter(user => {
            return user.id !== currentUser.id && !currentUserSwipedUsers.includes(user.id);
          });
  
          setCards(filteredUsers);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };
      fetchUsers();
    }
  }, [currentUser]);
  
  const simulateSwipeLeft = () => {
    if (swiperRef.current) {
      swiperRef.current.swipeLeft();
    }
  };
  
  const simulateSwipeRight = () => {
    if (swiperRef.current) {
      swiperRef.current.swipeRight();
    }
  };

  const renderCard = (userData) => {
    const profilePic = userData?.profilePic;
    const bio = userData?.bio || "Pas de description";
    const name = userData?.fullName;
  
    return (
      <TouchableOpacity style={{ flex: 1, backgroundColor: "white" }}>
        <Image source={{ uri: profilePic }} style={{ width: "100%", height: "100%", position: "absolute" }} resizeMode="cover" />
        <LinearGradient
          colors={['rgba(217, 217, 217, 0.00)', 'rgba(153, 0, 255, 0.30)']}
          start={[0.5, 0]}
          end={[0.5, 1]}
          style={{ flex: 1, position: "absolute", width: "100%", height: "100%" }}
        />
        <View style={{ position: "absolute", bottom: "45%", left: "5%", width: "90%", justifyContent: "center", alignItems: "center" }}>
          <Text className="text-xl text-boldW" style={{ textShadowRadius: 5, textShadowColor: "rgba(0, 0, 0, 1)", textShadowOffset: { width: 1, height: -1 }, fontWeight: "bold", textTransform: "uppercase" }}>{name}</Text>
        </View>

        <View style={{ position: "absolute", bottom: "40%", left: "5%", width: "90%", backgroundColor: "white", padding: 10, borderRadius: 15, justifyContent: "center", alignItems: "center" }}>
          <Text className="font-default" style={{ fontSize: 16, color: "black" }}>{bio}</Text>
        </View>

        <View style={{ position: "absolute", bottom: "35%", left: "12%", width: "90%", padding: 10 }}>
          <Text>
            <SvgLoc />
            Localisation
          </Text>
        </View>
        
        <View style={{ position: "absolute", bottom: "30%", left: "12%", width: "90%", padding: 10 }}>
          <Text>
            <SvgCalandar />
            Date
          </Text>
        </View>

        <View style={{ position: "absolute", bottom: "20%", flexDirection: "row", justifyContent: "space-around", width: "100%" }}>
          <Button.Swipe onPress={simulateSwipeLeft}>
            <SvgNop />
          </Button.Swipe>
          <Button.Swipe onPress={simulateSwipeRight}>
            <SvgYes />
          </Button.Swipe>
        </View>
      </TouchableOpacity>
    );
  };

  const onMatchs = async (index, userData) => {
    if (userData && userData.id) {
      try {
        const currentUserSwipeDocRef = doc(firestoreDB, "userSwipe", currentUser.id);
        const currentUserSwipeDocSnap = await getDoc(currentUserSwipeDocRef);
        if (!currentUserSwipeDocSnap.exists()) {
          await setDoc(currentUserSwipeDocRef, { swipedUsers: [] });
        }
  
        await updateDoc(currentUserSwipeDocRef, {
          swipedUsers: arrayUnion(userData.id)
        });
        
        const otherUserSwipeDocRef = doc(firestoreDB, "userSwipe", userData.id);
        const otherUserSwipeDocSnap = await getDoc(otherUserSwipeDocRef);
        const otherUserSwipedUsers = otherUserSwipeDocSnap.data()?.swipedUsers || [];
        const hasSwipedRight = otherUserSwipedUsers.includes(currentUser.id);
  
        if (hasSwipedRight) {
          const newDocRef = await addDoc(collection(firestoreDB, "matchs"), {
            currentUser: currentUser.id,
            swipedUser: userData.id,
            active: true,
            timestamp: new Date(),
          });
  
          createNewChat(currentUser.id, userData.id, userData.fullName);
        }
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    } else {
      console.error("Invalid userData object:", userData);
    }
  };
  
  
  const onSwipedAll = () => {
    setSwipedAll(true);
  };
  
  const createNewChat = async (user1Email, user2Email, user2FullName) => {
    try {
      const id = `${Date.now()}`;
      const chatData = {
        _id: id,
        users: [user1Email, user2Email], 
        chatName: "", 
        active: true,
        userFullName: [currentUser.fullName, user2FullName],
        timeStamp: new Date(),
      };
  
      await setDoc(doc(firestoreDB, "chats", id), chatData);
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };
  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <DeckSwiper
          ref={swiperRef}
          cards={cards}
          renderCard={renderCard}
          stackSize={3}
          stackSeparation={15}
          backgroundColor="transparent"
          cardVerticalMargin={0}
          cardHorizontalMargin={-2}
          borderRadius={0}
          onSwipedAll={onSwipedAll}
          disableBottomSwipe={true}
          disableTopSwipe={true}
          onSwipedRight={onMatchs}
        />
      </View>
      {swipedAll && 
        <Text className="flex-1 justify-center items-center text-center font-semibold">
          Plus de swipe :/
        </Text>
      }
    </SafeAreaView>
  );
};

export default SwipeScreen;
