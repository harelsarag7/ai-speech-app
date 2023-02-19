import logo from './logo.svg';
import './App.css';
import Main from "../src/Components/Main/Main"
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import LandingPage from './Components/LandingPage/LandingPage';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

function App() {
  const token = window.localStorage.getItem("VoiceChatToken") 

  useEffect(() => {
    }, [token])
  return (
    <div className="App">
      <Header/>
      <Routes>
        
      {
        token ? 
          <Route path='*' element={<Main />}></Route>
        : 
          <Route path='*' element={ <LandingPage />}></Route>
      }
      </Routes>
    </div>
  );
}

export default App;
