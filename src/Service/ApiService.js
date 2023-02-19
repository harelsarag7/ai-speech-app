class ApiService {
    sendMessageToChatGPT(message) {
        const results = fetch(`http://localhost:3046/message`, {
            method: 'POST',
            body: JSON.stringify(message),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'accept-charset': 'utf-8'
            },
        })
        return results;
    }


    getMessagesByUser(){
        const id = window.localStorage.getItem("VoiceChatToken")
        const results = fetch(`http://localhost:3046/message`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'authorization': id,
                'accept-charset': 'utf-8'
            },
        })    
    return results;
    }
}

export const apiService = new ApiService()