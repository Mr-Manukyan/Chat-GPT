import React from 'react';
import { ChatHeader } from './ChatHeader/ChatHeader';
import style from './ChatGPT.module.css'
import { ChatMessages } from './ChatMessages/ChatMessages';
import { ChatSendMessageForm } from './ChatSendMessageForm/ChatSendMessageForm';
import { useSelector } from 'react-redux';
import { getMessages } from '../../Redux/Selectors/Chat-Selectors';


export const ChatGPT = React.memo(() => {

  const messages = useSelector(getMessages)
  return (
    <div className={style.chatRoomContainer}>
      <ChatHeader />
      <ChatMessages messages={messages} />
      <ChatSendMessageForm />
    </div>
  )

});
