import React, { useContext, useEffect, useState } from 'react';

import io from 'socket.io-client';
import { Context } from './store';

let socket;

const Chat = (props) => {
  const { name } = useContext(Context);
  const { chatStore } = useContext(Context);
  const [message, setmessage] = useState('');
  const [loading, setloading] = useState(false);
  const room = 'global';
  const Dis = () => {
    socket.emit('disconnect', () => {
      socket.emit('sendMessage', { name, message: `${name} left` });
    });
  };
  useEffect(() => {}, [chatStore[0]]);

  useEffect(() => {
    socket = io('https://socket-msg.herokuapp.com/');
    // socket = io('192.168.0.103:4000');
    setloading(true);
    socket.emit('join', { name, room }, () => {});
    return Dis;
  }, []);
  useEffect(() => {
    socket.on('message', (message) => {
      chatStore[1]([...chatStore[0], message]);
    });
    document.getElementById('dis').scrollBy(0, 100);
    props.history.push('/chat');
  }, [chatStore[0]]);

  const msg = (e) => {
    e.preventDefault();
    socket.emit('sendMessage', { name, message }, () => setmessage(''));
    document.getElementById('textarea').value = '';
    props.history.push('/chat');
  };
  return (
    <div className='chat'>
      <div id='user_name'>
        <div id='logo'>
          <div className='logo_wrapper'>{name[0][0].toUpperCase()}</div>
        </div>
        <span>{name[0]}</span>
      </div>
      <div className='display' id='dis'>
        {loading ? (
          chatStore[0].map((i, indx) => {
            return (
              <div id='details' key={indx}>
                <div id='name'>{i.user}</div>
                <div id='message'>{i.message}</div>
                <div id='time'>{i.time}</div>
              </div>
            );
          })
        ) : (
          <div id='name'>Loading Connecting to Server</div>
        )}
      </div>
      <div id='box'>
        <form onSubmit={msg}>
          <textarea
            id='textarea'
            maxLength='55'
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                msg(e);
              }
            }}
            required
            placeholder='Type Your Meassage'
            onChange={(e) => setmessage(e.target.value)}
          />
          <button>Send</button>
        </form>
      </div>
      <button
        id='setting'
        onClick={() => {
          localStorage.setItem('name', '');
          window.location.reload();
        }}>
        Logout
      </button>
    </div>
  );
};
export default Chat;
