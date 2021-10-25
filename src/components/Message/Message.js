import { Avatar, Image } from 'antd';
import React, { useContext } from 'react';
import Moment from 'react-moment';
import { AuthContext } from '../../contexts/AuthProvider';
import MessageType from '../../enums/messageType';
import ReactPlayer from 'react-player';
import './Message.scss';
function Message(props) {
  const { user } = useContext(AuthContext);
  const { message } = props;

  return (
    <>
      {message.userId._id === user._id ? (
        <div className="message own">
          <div className="message-content">
            {message.messageType === MessageType.TEXT && (
              <p className="messageText">{message.content}</p>
            )}
            {message.messageType === MessageType.IMAGE && (
              <Image className="messageImage" src={message.content} />
            )}
            {message.messageType === MessageType.VIDEO && (
              <ReactPlayer controls={true} height={280} playing={true} url={message.content} />
            )}
          </div>
          <div className="message-avatar">
            <Avatar size={40} icon={<Image preview={false} src={message.userId.avatar} />} />
          </div>
          <div className="message-ago">
            <p>
              <Moment fromNow>{message.createdAt}</Moment>
            </p>
          </div>
        </div>
      ) : (
        <div className="message">
          <div className="message-avatar">
            <Avatar size={40} icon={<Image preview={false} src={message.userId.avatar} />} />
          </div>
          <div className="message-content">
            {message.messageType === MessageType.TEXT && (
              <p className="messageText">{message.content}</p>
            )}
            {message.messageType === MessageType.IMAGE && (
              <Image className="messageImage" src={message.content} />
            )}
            {message.messageType === MessageType.VIDEO && (
              <ReactPlayer controls={true} height={280} playing={true} url={message.content} />
            )}
          </div>
          <div className="message-ago">
            <p>
              <Moment fromNow>{message.createdAt}</Moment>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Message;
