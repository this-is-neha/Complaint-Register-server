

import axios from 'axios';
import { useFormContext } from '../MessageContext';
import { HeaderComponent, FooterComponent } from '../components/common';
import {useState, useEffect} from "react"

interface Message {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}

const MessagesPage: React.FC = () => {
  const { messages, deleteMessage } = useFormContext();
  const [loadedMessages, setLoadedMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('https://complaint-register-server-3.onrender.com/feedback/getid');
        setLoadedMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`http://localhost:9006/feedback/delete/${id}`);
      if (response.status === 200) {
        deleteMessage(id);
        setLoadedMessages(prevMessages => prevMessages.filter(message => message._id !== id)); 
      } else {
        console.error('Failed to delete message', response);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  return (
    <>
      <HeaderComponent />
      <br />
      <br />
      <div className="mx-auto mt-8 max-w-4xl p-8 border-4 border-black rounded-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold sm:text-3xl">Messages and Feedback</h1>
          <p className="mt-4 text-gray-500 text-2xl">All feedback messages</p>
        </div>
        <div className="mt-8 space-y-4">
          {loadedMessages.length === 0 ? (
            <p className="text-center text-xl">No messages yet.</p>
          ) : (
            loadedMessages.map((message: Message) => (
              <div key={message._id} className="border-b border-gray-300 py-4 flex justify-between items-center">
                <div>
                  <p className="text-xl"><strong>Name:</strong> {message.name}</p>
                  <p className="text-xl"><strong>Email:</strong> {message.email}</p>
                  <p className="text-xl"><strong>Phone:</strong> {message.phone}</p>
                  <p className="text-xl"><strong>Message:</strong> {message.message}</p>
                </div>
                <button 
                  onClick={() => handleDelete(message._id)} 
                  className="ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
      <br />
      <br />
      <FooterComponent />
    </>
  );
};

export default MessagesPage;
