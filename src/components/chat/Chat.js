import React from 'react';
import './chat.css';
import dp from '../../asstes/cover.jpg';

const Chat = () => {
  return (
    <div className="chat-area-section">
      <div className="personal-info">
        <div className="active-user">
          <i className='bx bx-left-arrow-alt'></i>
          <div className="user-img">
            <img src={dp} alt="" />
          </div>
          <div className="user-name">
            <p>Peterson Wabley</p>
            <span>Online</span>
          </div>
        </div>
        <div className="user-option">
          <i className='bx bx-dots-vertical-rounded'></i>
        </div>
      </div>
      <div className="chat-area">
        <div className="chat-send chat-popup">
          <div className="send-box"></div>
          <p>i am a sender</p>
        </div>
        <div className="chat-receive chat-popup">
          <div className="receive-box"></div>
          <p>i am a receiver</p>
        </div>
      </div>
      <div className="chat-input">
        <form>
          <div className="chat-type">
            <input type="text" placeholder='Type Here' />
          </div>
          <div className="chat-submit">
            <button type='submit'><i className='bx bxs-send'></i></button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Chat