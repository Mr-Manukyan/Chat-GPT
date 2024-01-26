import React, { useState } from 'react'
import style from './ChatHeader.module.css'
import robotIcon from '../../../Assets/header-icons/robotRead.png'
import prargraphIcon from '../../../Assets/header-icons/ChatGptText.png'
import { Modal } from '../../Common/Modal/Modal'
import { useDispatch } from 'react-redux'
import { actions } from '../../../Redux/Reducers/Chat-reducer'
import { messages } from '../../../Dialog-context'

export const ChatHeader = () => {

   const [showModal, setShowModal] = useState(false)
   const dispatch = useDispatch()

   const removeAllChatMessages = () => {
      messages.length = 0
      dispatch(actions.removeAllMessages())
   }

   return (
      <>
         {showModal && <Modal setShowModal={setShowModal} removeAllChatMessages={removeAllChatMessages} />}
         <div className={style.headerContainer}>
            <div className={style.headerWrapper}>
               <div className={style.logo}><span>MK</span></div>
               <div className={style.headerParagraph}>
                  <img src={prargraphIcon} alt="GPT CHAT" className={style.prargraphIcon} />
               </div>
               <div className={style.robotIcon} onClick={() => setShowModal(true)}>
                  <img src={robotIcon} alt="Robot" className={style.robotIcon} />
               </div>
            </div>
         </div>

      </>


   )
}

