import React from 'react'
import Chatboticon from './Chatboticon'

function Chatmessage({chat}) {
  return (
    <div>
      <div className={`message ${chat.role === "model" ? "bot" : "user" }-message`}>
        {chat.role==="model" && <Chatboticon/>}
          <p className="message-text">{chat.text } </p>
          </div>
    </div>
  )
}

export default Chatmessage