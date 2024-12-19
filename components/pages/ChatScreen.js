import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { addDoc, collection, doc, getDoc, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from 'firebase/firestore';
import { firestoreDB } from '../../config/firebase.config';
import { getAuth } from 'firebase/auth';
import ChatTemplate from '../templates/ChatTemplate';

const ChatScreen = ({ route }) => {
  const { room } = route.params;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [otherUserProfilePic, setOtherUserProfilePic] = useState(null);
  const user = useSelector((state) => state.user.user);
  const scrollViewRef = useRef();
  const auth = getAuth();

  const getOtherUserProfilePic = async () => {
    if (auth.currentUser && room && room.users) {
      const otherUserId = room.users.find(uid => uid !== auth.currentUser.uid);
      if (otherUserId) {
        const userDoc = await getDoc(doc(firestoreDB, "users", otherUserId));
        if (userDoc.exists()) {
          setOtherUserProfilePic(userDoc.data().profilePic || "N/A");
        } else {
          setOtherUserProfilePic("N/A");
        }
      }
    }
  };

  const sendMessage = async () => {
    const timeStamp = serverTimestamp();
    const id = `${Date.now()}`;
    const _doc = {
      _id: id,
      roomId: room._id,
      timeStamp: timeStamp,
      message: message,
      lastMessage: message,
      user: user,
    };
    setMessage("");
    await addDoc(
        collection(doc(firestoreDB, "chats", room._id), "messages"),
        _doc
      )
        .then(() => {
        // console.log(_doc);
          updateDoc(doc(firestoreDB, "chats", room._id), {
            lastMessage: message,
            timeStamp: new Date(),
          });
        })
        .catch((err) => alert(err));
  };

  useLayoutEffect(() => {
    getOtherUserProfilePic();

    const msgQuery = query(collection(firestoreDB, "chats", room?._id, "messages"), orderBy("timeStamp", "asc"));
    const unsubscribe = onSnapshot(msgQuery, (querySnap) => {
      const upMsg = querySnap.docs.map((doc) => doc.data());
      setMessages(upMsg);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const getOtherUserFullName = () => {
    if (auth.currentUser && room && room.userFullName) {
      const otherUserIndex = room.users.findIndex(uid => uid !== auth.currentUser.uid);
      if (otherUserIndex !== -1) {
        return room.userFullName[otherUserIndex];
      }
    }
    return "N/A";
  };

  return (
    <ChatTemplate 
      messages={messages} 
      otherUserProfilePic={otherUserProfilePic} 
      sendMessage={sendMessage} 
      message={message} 
      setMessage={setMessage} 
      isLoading={isLoading} 
      user={user} 
      otherUserName={getOtherUserFullName()}
      onBackPress={() => navigation.goBack()} 
    />
  );
};

export default ChatScreen;
