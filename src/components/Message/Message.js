import { Avatar, Image } from 'antd';
import React, { useContext } from 'react';
import Moment from 'react-moment';
import { AuthContext } from '../../contexts/AuthProvider';
import MessageType from '../../enums/messageType';
import ReactPlayer from 'react-player/lazy';
import './Message.scss';
import { BsFileEarmarkFill } from 'react-icons/bs';
import videoThumbnail from '../../assets/images/video_thumbnail.jpg';
import { AppContext } from '../../contexts/AppProvider';

function Message(props) {
  const { user } = useContext(AuthContext);
  const { currentRoom } = useContext(AppContext);
  const { message } = props;

  return (
    <>
      {message.userId._id === user._id ? (
        <div className="message own">
          <div className="message-content">
            {currentRoom.isGroup && <p className="group-sender-name">{message.userId.fullName}</p>}
            {message.messageType === MessageType.TEXT && (
              <p className="messageText">{message.content}</p>
            )}
            {message.messageType === MessageType.IMAGE && (
              <Image className="messageImage" src={message.content} />
            )}
            {message.messageType === MessageType.VIDEO && (
              <ReactPlayer
                className="messageVideo"
                playing={false}
                controls={true}
                url={message.content}
                light={videoThumbnail}
              />
            )}
            {message.messageType === MessageType.FILE && (
              <a href={message.content}>
                <div className="messageFile">
                  <Avatar
                    className="file-icon"
                    style={{
                      backgroundColor: '#FFFFFF',
                    }}
                    size={35}
                    icon={<BsFileEarmarkFill color={'#000000'} />}
                  />
                  <p className="file-name">{message.fileName}</p>
                </div>
              </a>
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
            {currentRoom.isGroup && <p className="group-sender-name">{message.userId.fullName}</p>}
            {message.messageType === MessageType.TEXT && (
              <p className="messageText">{message.content}</p>
            )}
            {message.messageType === MessageType.IMAGE && (
              <Image className="messageImage" src={message.content} />
            )}
            {message.messageType === MessageType.VIDEO && (
              <ReactPlayer
                controls={true}
                playing={false}
                className="messageVideo"
                light={videoThumbnail}
                url={message.content}
              />
            )}
            {message.messageType === MessageType.FILE && (
              <a href={message.content}>
                <div className="messageFile">
                  <Avatar
                    className="file-icon"
                    style={{
                      backgroundColor: '#FFFFFF',
                    }}
                    size={35}
                    icon={<BsFileEarmarkFill color={'#000000'} />}
                  />
                  <p className="file-name">{message.fileName}</p>
                </div>
              </a>
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
