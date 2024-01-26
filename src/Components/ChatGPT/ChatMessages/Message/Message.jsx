import React, { useState } from "react";
import Speech from 'react-speech';
import { ru } from 'date-fns/locale'
import defalutAvatar from "../../../../Assets/user-icons/defaultIcon.png";
import GPTAvatar from "../../../../Assets/user-icons/robot3D.png";
import distanceInWordsToNow from 'date-fns/formatDistanceToNow';

import style from "./Message.module.css";


export const Message = React.memo(({ message }) => {
  const [val, setVal] = useState(false)

  return (
    <>

      <div className={style.messageBody}>
        <div className={style.userIconWrapper}>
          <div
            className={
              message.userName !== 'USER'
                ? style.messageArrowOwner
                : style.messageArrow
            }>
          </div>
          <p className={style.userName}>{message.userName}</p>
          <img
            src={message.userName === 'USER' ? defalutAvatar : GPTAvatar}
            alt="userIcon"
            className={style.userIcon}
          />

        </div>
        <div
          className={
            message.userName !== 'USER'
              ? style.messageWrapperOwner
              : style.messageWrapper
          }
        >
          <p className={style.message}>{message.text}</p>
          <div className={style.speechWrapper}>
            <Speech
              text={message.text}
              pitch="1"
              rate="1"
              volume="1"
              lang="ru-RU"
              stop={(val) => setVal(!val)}
            />
          </div>
        </div>
        <div className={style.date}>
          {
            distanceInWordsToNow(new Date(message.createdAt),
              { addSuffix: true, locale: ru }
            )
          }
        </div>
      </div>

    </>
  );
}
);
