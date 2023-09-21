import { useEffect, useState } from 'react';
import './App.css';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:3001');

function App() {
  const [message, setMessage] = useState('');
  const [messageReceived, setMessageReceived] = useState('');

  const sendMessage = () => {
    socket.emit('send_message', message);
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageReceived(data);
    });
  }, [socket]);
  return (
    <div className="App">
      <input
        placeholder="message"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button onClick={sendMessage}>send message</button>
      <h1>message: {messageReceived}</h1>
    </div>
  );
}

export default App;
