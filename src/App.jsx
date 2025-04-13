import React, { useState } from 'react'
import Chatboticon from './Chatboticon'
import ChtaForm from './ChtaForm'
import ChatMessage from './Chatmessage'
import myInfo from './myinfo.js'
function App() {
  const [charHistory , setChatHistory] =useState([{
    hideInchat:true,
    role:"model",
    text: JSON.stringify(myInfo)
  }]);
  const generateBotResponse = async (history) => {
    const updateHistory = (text) => {
      setChatHistory(prev => [...prev.filter(msg=>msg.text !== "Thinking..."), {role: "model",text}])
    }
    history =history.map(({role,text})=>({role,parts:[{text}]}));
   const requestOptions ={
    method: "POST",
    headers:{"Content-Type" : "application/json"},
    body:JSON.stringify({contents:history})

   }
   try{
    const response = await fetch(import.meta.env.VITE_API_URL ,requestOptions);
    const data =await response.json();
    if(!response.ok) throw new Error(data.error.message || "Something went wrong!");
    const apiResponseText =data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1").trim();
    
    console.log(data);
    updateHistory(apiResponseText);

   } catch(error){
    console.error("Error calling Gemini API:", error.message);
    
   }

  }
 
 
 
 
  return (
    <div className="container">
      <div className="chatbot-popup">
        <div className="chat-header">
          <div className="header-info">
            <Chatboticon />
            <h2 className="logo-text"> Chat Bot </h2>
          </div>

          <button className="material-symbols-outlined">
            <span className="material-symbols-outlined">
              keyboard_arrow_down
            </span>
          </button>
        </div>

        {/* Chatbot body */}
        <div className='chat-body'>
          <div className="message bot-message">
            <Chatboticon />
            <p className="message-text">
              hey debu I can be your personal bot<br /> how can i help you today?
            </p>
          </div>

          {charHistory.map ((chat ,index)=>(
            <ChatMessage key={index} chat= {chat}/>
          ))}


          
          
        </div>
     
      {/* Chatbot Footer*/}
      <div className="chat-footer">
        <ChtaForm charHistory={charHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse}/>
      </div>
      </div>
    </div>
  )
}

export default App
