import { Avatar, Image } from 'antd';
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import './Message.scss';
import moment from 'moment';

function Message(props) {
  const { user } = useContext(AuthContext);
  const { message } = props;

  return (
    <>
      {message.user.userId === user._id ? (
        <div className="message own">
          <div className="message-content">
            {message.messageType === 'text' && <p className="messageText">{message.content}</p>}
            {message.messageType === 'image' && (
              <Image className="messageImage" src={message.content} />
            )}
          </div>
          <div className="message-avatar">
            <Avatar size={40} icon={<Image preview={false} src={message.user.avatar} />} />
          </div>
          <div className="message-ago">
            <p>{moment(message.createdAt).fromNow()}</p>
          </div>
        </div>
      ) : (
        <div className="message">
          <div className="message-avatar">
            <Avatar size={40} icon={<Image preview={false} src={message.user.avatar} />} />
          </div>
          <div className="message-content">
            {message.messageType === 'text' && <p className="messageText">{message.content}</p>}
            {message.messageType === 'image' && (
              <Image className="messageImage" src={message.content} />
            )}
          </div>
          <div className="message-ago">
            <p>{moment(message.createdAt).fromNow()}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Message;
