import React from 'react'
import { Message } from './Message/Message'
import style from './ChatMessages.module.css'
import iconRobot from '../../../Assets/message-icons/robotHello.png'
import { useScrollToBottom } from '../../Common/Hooks/useScrollToBottom'
import { Loading } from '../../Common/Loading/Loading'
import { useSelector } from 'react-redux'
import { getIsLoading } from '../../../Redux/Selectors/Chat-Selectors'


export const ChatMessages = React.memo(({ messages }) => {

  const { scrollHandler, elementEndBottomRef } = useScrollToBottom(messages)
  const isLoading = useSelector(getIsLoading)


  return (
    <div className={style.messagesContainer} onScroll={scrollHandler}>
      <div className={style.messagesWrapper}>

        {!messages.length ? (
          <div className={style.welcomeWrapper}>
            <div className={style.iconBody}>
              <p className={style.welcomeText}>Welcome` My Friend</p>
              <p className={style.welcomeText2}>Can I Help you today</p>
              <img src={iconRobot} alt='robot' className={style.robot} />
              <div className={style.titleBody}>
                <p className={style.title}>No message yet</p>
              </div>
            </div>
          </div>
        ) : messages.map(message => (<Message message={message} key={message.id} />))
        }
        {
          isLoading && <div className={style.loadingWrapper}>
            <p>Ожидайте ответа GPT : </p>
            <Loading />
          </div>
        }

        <div ref={elementEndBottomRef} />
      </div>
    </div>
  )
})

