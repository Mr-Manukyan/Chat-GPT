import React from "react";
import style from "./Modal.module.css";
import { motion } from "framer-motion";


const animateQuestion = {
  hidden: {
    y: "-100%",
    opacity: 0,
  },

  visible: (custom) => ({
    y: "0%",
    opacity: 1,
    transition: {
      delay: custom * 0.5,
      duration: 0.7,
      type: "spring",
      // stiffness: 100,
      damping: 9,
    },
  }),
  exit: {
    y: "-100%",
    opacity: 0,
  },
};

export const Modal = React.memo(({ setShowModal, removeAllChatMessages }) => {


  const removeAllMessages = () => {
    removeAllChatMessages()
    setShowModal(false);
  };
  const donotRemoveMessages = () => {
    setShowModal(false);
  };

  return (
    <div className={style.modalContainer}>
      <motion.div
        className={style.body}
        initial="hidden"
        animate="visible"
        custom={0.3}
        exit="exit"
        variants={animateQuestion}
      >
        <div className={style.titleWrapper}>
          <p className={style.title}>Do You want remove all messages?</p>
        </div>
        <div className={style.buttonWrapper}>
          <button className={style.buttonNo} onClick={donotRemoveMessages}>
            No
          </button>
          <button className={style.buttonYes} onClick={removeAllMessages}>
            Yes
          </button>
        </div>
      </motion.div>
    </div>
  );
});
