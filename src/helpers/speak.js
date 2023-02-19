function speak(sen) {
    const message = new SpeechSynthesisUtterance();
    message.text = sen;
    const voices = window.speechSynthesis.getVoices();
    console.log(voices);
    message.voice = voices.find((voice) => voice.name === 'Microsoft Asaf - Hebrew (Israel)');
    window.speechSynthesis.speak(message);
}

module.exports = speak