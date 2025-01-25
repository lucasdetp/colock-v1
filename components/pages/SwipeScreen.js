// components/SwipeScreen.js
import React, { useState, useEffect, useRef } from "react";
import { View, SafeAreaView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DeckSwiper from "react-native-deck-swiper";
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { firestoreDB, firebaseAuth } from '../../config/firebase.config';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import SvgPlus from "../../assets/svg/plus";
import { Container, Text} from '../atoms';
import { SwipeCard } from "../organims";

const SwipeScreen = () => {
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const auth = getAuth();
  const [swipedAll, setSwipedAll] = useState(false);
  const swiperRef = useRef(null);
  const navigation = useNavigation();
  const user = firebaseAuth.currentUser;
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
  }, [user]);

  useEffect(() => {
    if (currentUser) {
      const fetchUsers = async () => {
        try {
          const currentUserSwipeDocRef = doc(firestoreDB, "userSwipe", currentUser.id);
          const currentUserSwipeDocSnap = await getDoc(currentUserSwipeDocRef);
  
          const currentUserSwipedUsers = currentUserSwipeDocSnap.exists()
            ? currentUserSwipeDocSnap.data()?.swipedUsers || []
            : [];
          const currentUserDislikedUsers = currentUserSwipeDocSnap.exists()
            ? currentUserSwipeDocSnap.data()?.dislikedUsers || []
            : [];
  
          const excludedUsers = [...currentUserSwipedUsers, ...currentUserDislikedUsers];
  
          const usersCollection = collection(firestoreDB, "users");
          const usersSnapshot = await getDocs(usersCollection);
  
          if (!usersSnapshot.empty) {
            const usersData = usersSnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }));
  
            const filteredUsers = usersData.filter(user => {
              return user.id !== currentUser.id && !excludedUsers.includes(user.id);
            });
  
            setCards(filteredUsers);
  
            if (filteredUsers.length === 0) {
              setSwipedAll(true);
            } else {
              setSwipedAll(false);
            }
          } else {
            console.warn("No users found in Firestore.");
            setCards([]);
            setSwipedAll(true);
          }
        } catch (error) {
          console.error("Error fetching users:", error);
          setCards([]);
          setSwipedAll(false);
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
    const profilePic2 = userData?.profilePic2;
    const profilePic3 = userData?.profilePic3;
    const bio = userData?.bio || "Pas de description";
    const name = userData?.fullName;
    const citySearch = userData?.citySearch;
    const loisirs = userData?.loisirs || [];
  
    return (
      <TouchableOpacity style={{ flex: 1, backgroundColor: "white", borderRadius: 15, overflow: "hidden" }}>
            <SwipeCard.NameSwipe name={name} />
            <SwipeCard.ImageSwipe profilePic={profilePic} />

            <Container.BasicView style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 10, marginBottom: 20 }}>
              <SwipeCard.SpecialSwipe caractere={citySearch} />
              <SwipeCard.SpecialSwipe caractere={loisirs[0]} />
              <SwipeCard.SpecialSwipe caractere={loisirs[1]} />
            </Container.BasicView>

            {/* Localisation et Date */}
            <SwipeCard.DateSwipe date="12/12/2021" />

          {/* Description */}
          <SwipeCard.DescriptionSwipe bio={bio} />  
  
          <TouchableOpacity
            onPress={() => navigation.navigate('SwipePlusScreen', { 
              name: name, 
              profilePic: profilePic,
              profilePic2: profilePic2,
              profilePic3: profilePic3,
              location: citySearch,
              carac2: loisirs[0],
              carac3: loisirs[1],
              date: "12/12/2021",
              bio: bio,
            })}
            style={{ 
              position: "absolute", 
              bottom: 250, 
              left: "50%", 
              transform: [{ translateX: -100 }], 
              width: 200, 
              alignItems: "center",
            }}
          >
            <View 
              style={{
                padding: 10,
                backgroundColor: "white", 
                borderRadius: 20, 
                boxShadow: "0px 0px 6px 0px rgba(0, 0, 0, 0.10)", 
                shadowColor: "rgba(0, 0, 0, 0.1)", 
                shadowOffset: { width: 0, height: 2 }, 
                shadowOpacity: 0.1, 
                shadowRadius: 6, 
                flexDirection: "row", 
                alignItems: "center", 
                justifyContent: "center",
              }}
            >
              <SvgPlus />
              <Text.Base style={{ marginLeft: 5 }}>Voir plus</Text.Base>
            </View>
          </TouchableOpacity>


        {/* Boutons fixés en bas */}
        <SwipeCard.ActionButtonSwipe simulateSwipeLeft={simulateSwipeLeft} simulateSwipeRight={simulateSwipeRight} />
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


  const dislikeUser = async (index, userData) => {
    if (userData && userData.id) {
      try {
        // Référence à la collection userSwipe pour l'utilisateur actuel
        const currentUserSwipeDocRef = doc(firestoreDB, "userSwipe", currentUser.id);
  
        // Si le document n'existe pas encore, initialisez-le avec une liste vide
        const currentUserSwipeDocSnap = await getDoc(currentUserSwipeDocRef);
        if (!currentUserSwipeDocSnap.exists()) {
          await setDoc(currentUserSwipeDocRef, { dislikedUsers: [] });
        }
  
        // Ajoutez l'utilisateur disliké dans la liste
        await updateDoc(currentUserSwipeDocRef, {
          dislikedUsers: arrayUnion(userData.id),
        });
  
        console.log(`User ${userData.id} disliked`);
      } catch (error) {
        console.error("Error updating disliked users: ", error);
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
        {!swipedAll && cards.length > 0 && (
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
            onSwipedLeft={dislikeUser}
          />
        )}
        {swipedAll && cards.length === 0 && (
          <Text.Base style={{ flex: 1, justifyContent: 'center', alignItems: 'center', textAlign: 'center', fontWeight: '600' }}>
            Plus de swipe :/
          </Text.Base>
        )}
      </View>
    </SafeAreaView>
  );
  
};

export default SwipeScreen;
