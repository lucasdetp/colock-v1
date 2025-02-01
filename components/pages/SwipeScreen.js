// components/SwipeScreen.js
import React, { useState, useEffect, useRef } from "react";
import { View, SafeAreaView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DeckSwiper from "react-native-deck-swiper";
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { firestoreDB, firebaseAuth } from '../../config/firebase.config';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import SvgPlus from "../../assets/svg/plus";
import { Container, Text} from '../atoms';
import { SwipeCard } from "../organims";
import { API_KEY } from '@env';

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


  const getCoordinates = async (city) => {
      if (!API_KEY) {
        console.error("❌ La clé API est manquante !");
        return null;
      }
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)}&key=${API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.results.length > 0) {
          return {
              lat: data.results[0].geometry.lat,
              lon: data.results[0].geometry.lng
          };
      } else {
          console.error("❌ Ville non trouvée :", city);
          return null;
      }
  };

  const haversineDistance = (coords1, coords2) => {
    const R = 6378; // Rayon de la Terre en km
    const dLat = (coords2.lat - coords1.lat) * (Math.PI / 180);
    const dLon = (coords2.lon - coords1.lon) * (Math.PI / 180);

    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(coords1.lat * (Math.PI / 180)) * 
        Math.cos(coords2.lat * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };



  useEffect(() => {
    if (currentUser) {
      const fetchUsers = async () => {
        if (!currentUser) return;
    
        try {
            const userRef = doc(firestoreDB, "users", currentUser.id);
            const userSnap = await getDoc(userRef);
    
            if (!userSnap.exists()) {
                console.error("Utilisateur introuvable");
                return;
            }
    
            const userData = userSnap.data();
            const { citySearch, loisirs = [], lookingFor } = userData;
    
            const currentUserCoords = await getCoordinates(citySearch);
            if (!currentUserCoords) return;
    
            const swipeDocRef = doc(firestoreDB, "userSwipe", currentUser.id);
            const swipeSnap = await getDoc(swipeDocRef);
            const swipedUsers = swipeSnap.exists() ? swipeSnap.data().swipedUsers || [] : [];
            const dislikedUsers = swipeSnap.exists() ? swipeSnap.data().dislikedUsers || [] : [];
            const excludedUsers = [...swipedUsers, ...dislikedUsers];
    
            const querySnapshot = await getDocs(collection(firestoreDB, "users"));
            
            let usersData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
    
            const countCommonLoisirs = (userLoisirs = []) => {
                if (!Array.isArray(userLoisirs)) return 0;
    
                const normalizedLoisirs = loisirs.map(l => l.trim().toLowerCase());
                const normalizedUserLoisirs = userLoisirs.map(l => l.trim().toLowerCase());
    
                return normalizedUserLoisirs.filter(loisir => normalizedLoisirs.includes(loisir)).length;
            };
          
            let perfectMatch = [];
            let mediumMatch = [];
            let lightMatch = [];
    
            for (let user of usersData) {
                if (user.id === currentUser.id || excludedUsers.includes(user.id)) continue;
    
                const userLoisirs = user.loisirs || user.traitsCaracterePrincipaux || [];
                const commonLoisirs = countCommonLoisirs(userLoisirs);
    
                const userCoords = await getCoordinates(user.citySearch);
                if (!userCoords) continue;
    
                const distance = haversineDistance(currentUserCoords, userCoords);
                if (distance > 100) continue; 
    
                if (lookingFor === "Peu importe" || user.gender === lookingFor) {
                    if (commonLoisirs >= 3) {
                        perfectMatch.push(user);
                    } else if (commonLoisirs === 2) {
                        mediumMatch.push(user);
                    } else if (commonLoisirs === 1) {
                        lightMatch.push(user);
                    }
                }
            }
    
            const finalUsers = perfectMatch.length > 0 
                ? perfectMatch 
                : mediumMatch.length > 0 
                    ? mediumMatch 
                    : lightMatch.length > 0
                        ? lightMatch
                        : usersData.filter(user => user.id !== currentUser.id && !excludedUsers.includes(user.id));
    
            setCards(finalUsers);
            setSwipedAll(finalUsers.length === 0);
    
        } catch (error) {
            console.error("❌ Erreur lors du chargement des utilisateurs :", error);
            setCards([]);
            setSwipedAll(true);
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

  const simulateSaveSwipe = async () => {
    if (swiperRef.current && cards.length > 0) {
        const swipedUser = cards[0];

        try {
            const userSwipeSaveRef = doc(firestoreDB, "swipeSave", currentUser.id);
            const userSwipeSaveSnap = await getDoc(userSwipeSaveRef);
            let savedUsers = userSwipeSaveSnap.exists() ? userSwipeSaveSnap.data() : {};

            if (savedUsers[swipedUser.id]) {
                delete savedUsers[swipedUser.id];
            } else {
                savedUsers[swipedUser.id] = {
                    name: swipedUser.fullName || "",
                    profilePic: swipedUser.profilePic || "",
                };
            }

            await setDoc(userSwipeSaveRef, savedUsers);
        } catch (error) {
            console.error("Erreur lors de l'enregistrement/suppression du swipe :", error);
        }
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
    const dateDispo = userData?.dateDispo;
  
    return (
      <TouchableOpacity style={{ flex: 1, backgroundColor: "white", borderRadius: 15, overflow: "hidden", padding: 20 }}>
            <SwipeCard.NameSwipe name={name} />
            <SwipeCard.ImageSwipe profilePic={profilePic} />

            <Container.BasicView style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 10, marginBottom: 20 }}>
              <SwipeCard.SpecialSwipe caractere={citySearch} />
              <SwipeCard.SpecialSwipeNoImage caractere={loisirs[0]} />
              <SwipeCard.SpecialSwipeNoImage caractere={loisirs[1]} />
            </Container.BasicView>

            {/* Localisation et Date */}
            {dateDispo && <SwipeCard.DateSwipe date={dateDispo} />}

          {/* Description */}
          <SwipeCard.DescriptionSwipe bio={bio} />  
  
          <TouchableOpacity
            onPress={() => navigation.navigate('SwipePlusScreen', { 
              name: name, 
              profilePic: profilePic,
              profilePic2: profilePic2,
              profilePic3: profilePic3,
              dateDispo: dateDispo,
              location: citySearch,
              carac2: loisirs[0],
              carac3: loisirs[1],
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
        <SwipeCard.ActionButtonSwipe simulateSwipeLeft={simulateSwipeLeft} simulateSwipeRight={simulateSwipeRight} simulateSaveSwipe={simulateSaveSwipe} />
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
