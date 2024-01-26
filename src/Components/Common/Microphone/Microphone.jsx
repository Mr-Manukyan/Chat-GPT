import React, { useState, useRef, useEffect } from 'react'
import { IoMicOutline } from "react-icons/io5"
import { v4 as uuidv4 } from 'uuid';
import style from './Microphone.module.css'

export const Microphone = ({ sendNewVoiceMessage }) => {

    const [recording, setRecording] = useState(false);
    const [transcription, setTranscription] = useState('');
    const recognitionRef = useRef(new window.webkitSpeechRecognition());


    useEffect(() => {
        if (transcription !== '') {
            sendNewVoiceMessage({
                text: transcription,
                id: uuidv4(),
                userName: 'USER',
                createdAt: Date.now(),
            });
            setTranscription('')

        }
    }, [transcription]);


    const startRecording = () => {
        recognitionRef.current.onresult = handleRecognitionResult;
        recognitionRef.current.start();
        setRecording(true);
    };

    const stopRecording = () => {
        recognitionRef.current.stop()
        setRecording(false)
    };

    const handleRecognitionResult = (event) => {
        const transcript = Array.from(event.results)
            .map((result) => result[0].transcript)
            .join('')
        setTranscription(transcript)
    }



    return (
        <>
            <button className={!recording ? style.micOFF : style.micON}
                onMouseDown={startRecording}
                onMouseUp={stopRecording}>
                <IoMicOutline className={style.micIcon} />
            </button>
        </>
    )
}

