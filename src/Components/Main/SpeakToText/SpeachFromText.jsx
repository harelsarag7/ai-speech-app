import { useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { apiService } from "../../../Service/ApiService";
import speak from '../../../helpers/speak'
import './SpeachFromText.css'
import MicIcon from '@mui/icons-material/Mic';
import EqGif from "./EqAnimation.gif";
import CancelIcon from '@mui/icons-material/Cancel';

function SpeechFromText() {
    const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition()
    // const [userMessages, setUserMessages] = useState([]);
    // const [aiMessages, setAiMessages] = useState([]);

    const [messages,setMessages] = useState([])

    useEffect(() => {
        if (!browserSupportsSpeechRecognition) {
            return <span>Your Browser doesnt support speech to text</span>
        }

        
        if(transcript && !listening){
            stopListening();
        }

        
    }, [listening]);
    
    async function startListening() {
        await SpeechRecognition.startListening({ language: 'he' });
    }
    
    
    async function stopListening() {
        const id = window.localStorage.getItem("VoiceChatToken")
        
        SpeechRecognition.stopListening()
        const res = await apiService.sendMessageToChatGPT({ message: transcript, id: id });
        console.log(res);
        if (res.status !== 200) {
            alert('error')
        } else {
            const reply = await res.json()
            speak(reply)
            resetTranscript();
            // const messages = apiService.getMessagesByUser().then(async ( res) => console.log( await res.json()));
            
        }
    }


    return (
        <div className="SpeachFromText">

            <div className="SpeachFromTextMicrophone">
                <p className="Label">Speak naturally, we'll do the typing</p>
                {/* <p>Microphone: {listening ? 'on' : 'off'}</p> */}
            </div>

            <div className="chatDiv">
                <div className="chat">
                    {/* {messages? messages.map((m) => <p>{m.message}</p>) : <></>} */}
                </div>



                <div className="SpeachFromTextButtons">
                    <div className="Start_Record" onClick={() => startListening()}>
                        {listening ? 
                        <img src={EqGif} />
                        : 
                        <MicIcon fontSize="large" sx={{color:"white"}}/>
                        }
                    </div>
                    {/* <button onClick={() => stopListening()}>Stop</button> */}
                    
                    <div className="cancel_record" onClick={() => window.speechSynthesis.cancel()}><CancelIcon fontSize="large"/></div>
                </div>
            </div>
        </div>
    );
}

export default SpeechFromText;