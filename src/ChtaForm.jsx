import React, { useRef } from 'react';

function ChatForm({charHistory,setChatHistory,generateBotResponse}) {
  const inputRef = useRef();


  const handleSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    
    inputRef.current.value = ''; // Clear input after submit
    //Update chat history 
    setChatHistory(history =>[...history, {role: "user" , text :userMessage}]);
   
   
   //Update chat history 
   setTimeout(()=>{setChatHistory(history =>[...history, {role: "model" , text :"Thinking..."}]);
  
    //call function to genbotresponce 
    generateBotResponse([...charHistory,{role: "user" , text :userMessage}]);
  
  
  
  
  },); 
    console.log(userMessage);
   
  };

  return (
    <div>
      <form className="chat-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Message..."
          className="message-input"
          ref={inputRef}
        />
        <button type="submit" className="material-symbols-outlined">
          <span className="material-symbols-outlined">arrow_upward</span>
        </button>
      </form>
    </div>
  );
}

export default ChatForm;
