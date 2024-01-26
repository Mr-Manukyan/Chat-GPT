import React, { useState } from "react";
import style from "./ChatSendMessageForm.module.css";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { addNewMessage } from "../../../Redux/Reducers/Chat-reducer";
import { Microphone } from "../../Common/Microphone/Microphone";
import { messageSound } from '../../../Helpers/helpers'


export const ChatSendMessageForm = () => {

  const [message, setMessage] = useState("");
  const [photo, setPhoto] = useState([]);
  const [height, setHeight] = useState(45);
  const dispatch = useDispatch()

  const TextareaChangeHendler = (e) => {
    setMessage(e.target.value);
  };

  const autoResizeTextareaHandler = (e) => {
    setHeight(e.target.scrollHeight);
    if (e.target.value === "") {
      setHeight(40);
    }
  };


  // const sendPhoto = (e) => {
  //   if (e.target.files.length) {
  //     for (let i = 0; i < e.target.files.length; i++) {
  //       setPhoto(photo => [...photo, e.target.files[i].name])
  //     }
  //   }
  // }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendNewMessage()
    }
  }

  const sendNewMessage = () => {
    if (message) {
      dispatch(addNewMessage({
        text: message,
        id: uuidv4(),
        userName: 'USER',
        createdAt: Date.now(),
      }))
      setMessage('')
    }
  };



  const sendNewVoiceMessage = (newVoiceMessage) => {
    dispatch(addNewMessage(newVoiceMessage))
    messageSound()
  };


  return (
    <div className={style.sendMessageFormContainer}>
      <div className={style.formWrapper}>

        <div className={style.textariaWrapper}>
          <textarea
            placeholder="Enter messages..."
            required
            onChange={TextareaChangeHendler}
            value={message}
            className={style.textarea}
            style={{ height: `${height}px` }}
            onKeyUp={autoResizeTextareaHandler}
            onKeyPress={(e) => handleKeyPress(e)}
          ></textarea>
        </div>

        <div className={style.sendMessageWrapper}>
          <div className={style.messageButtonBody}>
            {(message || photo.length)
              ? <button className={style.messageButton} onClick={sendNewMessage}></button>
              : <button className={style.messageButtonDisable}></button>
            }

            {
              !!photo.length && <div className={style.photoCountInfo} onClick={() => setPhoto([])}>
                <span>{photo.length}</span>
              </div>
            }
          </div>
        </div>
        <div className={style.micWrapper}>
          <Microphone sendNewVoiceMessage={sendNewVoiceMessage} />
        </div>
      </div>
    </div>
  )

}
