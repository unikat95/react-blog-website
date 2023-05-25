import { createContext, useContext, useEffect, useState } from "react";
import BlogContext from "./BlogContext";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

const MessageContext = createContext();

export function MessageProvider({ children }) {
  const { setLoading } = useContext(BlogContext);
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState(false);
  const messagesCollectionRef = collection(db, "messages");

  const sendMessage = async ({ messageData }) => {
    setLoading(true);
    const newMessageData = {
      ...messageData,
    };

    await addDoc(messagesCollectionRef, newMessageData);
    setLoading(false);
  };

  const getMessageList = async () => {
    try {
      const data = await getDocs(messagesCollectionRef);
      const messageDetail = data.docs.map((msg) => ({
        ...msg.data(),
        id: msg.id,
      }));
      setMessageList(messageDetail);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMessageList();
  }, []);

  return (
    <MessageContext.Provider
      value={{ message, setMessage, sendMessage, getMessageList, messageList }}
    >
      {children}
    </MessageContext.Provider>
  );
}

export default MessageContext;
