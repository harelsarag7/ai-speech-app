import { useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { apiService } from "../../Service/ApiService";
import speak from '../../helpers/speak'
import './SpeachFromText.css'

function SpeechFromText() {
    const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition()
    const [userMessages, setUserMessages] = useState([]);
    const [aiMessages, setAiMessages] = useState([]);

    useEffect(() => {
        if (!browserSupportsSpeechRecognition) {
            return <span>Your Browser doesnt support speech to text</span>
        }
    }, []);

    async function startListening() {
        await SpeechRecognition.startListening({ language: 'he' });
    }

    async function stopListening() {
        SpeechRecognition.stopListening()
        const res = await apiService.sendMessageToChatGPT({ message: transcript });
        console.log(res);
        if (res.status !== 200) {
            alert('error')
        } else {
            const reply = await res.json()
            speak(reply)
        }
    }

    return (
        <div className="SpeachFromText">
            <div className="SpeachFromTextMicrophone">
                <p>Microphone: {listening ? 'on' : 'off'}</p>
            </div>
            <div className="chatDiv">
                <div className="chat">
                    
                </div>
                <div className="SpeachFromTextButtons">
                    <button onClick={() => startListening()}>Start</button>
                    <button onClick={() => stopListening()}>Stop</button>
                    <button onClick={() => resetTranscript()}>Reset</button>
                </div>
            </div>
        </div>
    );
}

export default SpeechFromText;