import { Avatar, Image, Menu, Dropdown, Modal, message as messageNotify } from 'antd';
import React, { useContext, forwardRef } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import MessageType from '../../enums/messageType';
import ReactPlayer from 'react-player/lazy';
import './Message.scss';
import { BsFileEarmarkFill } from 'react-icons/bs';
import videoThumbnail from '../../assets/images/video_thumbnail.jpg';
import { AppContext } from '../../contexts/AppProvider';
import moment from 'moment';

function Message(props, firstMessageRef) {
  const { user } = useContext(AuthContext);
  const { currentRoom } = useContext(AppContext);
  const { message, handleRevokeMessage, handleDeleteMessage } = props;

  const menu = (
    <Menu>
      <Menu.Item onClick={() => handleDeleteMessage(message)} key="0">
        <span>Xoá tin nhắn</span>
      </Menu.Item>
      <Menu.Item key="1">
        <span onClick={() => handleRevokeMessage(message)}>Thu hồi tin nhắn</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      {message.userId._id === user._id ? (
        <div ref={firstMessageRef} className="message own">
          <div className="message-content">
            {currentRoom.isGroup && <p className="group-sender-name">{message.userId.fullName}</p>}

            {message.messageType === MessageType.TEXT && (
              <Dropdown overlay={menu} trigger={['hover']}>
                <p className="messageText">{message.content}</p>
              </Dropdown>
            )}
            {message.messageType === MessageType.IMAGE && (
              <Dropdown overlay={menu} trigger={['hover']}>
                <Image className="messageImage" src={message.content} />
              </Dropdown>
            )}
            {message.messageType === MessageType.VIDEO && (
              <Dropdown overlay={menu} trigger={['hover']}>
                <ReactPlayer
                  className="messageVideo"
                  playing={false}
                  controls={true}
                  url={message.content}
                  light={videoThumbnail}
                />
              </Dropdown>
            )}
            {message.messageType === MessageType.FILE && (
              <Dropdown overlay={menu} trigger={['hover']}>
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
              </Dropdown>
            )}
          </div>
          <div className="message-avatar">
            <Avatar size={40} src={message.userId.avatar} />
          </div>
          <div className="message-ago">
            {moment(message.createdAt).endOf('year').diff(moment().endOf('year')) < 0 ? (
              <p>{moment(message.createdAt).format('HH:mm DD/MM/YY')}</p>
            ) : (
              <p>
                {moment(message.createdAt).endOf('day').diff(moment().endOf('day')) < 0
                  ? moment(message.createdAt).format('HH:mm DD/MM')
                  : moment(message.createdAt).format('HH:mm')}
              </p>
            )}
          </div>
        </div>
      ) : (
        <div ref={firstMessageRef} className="message">
          <div className="message-avatar">
            <Avatar size={40} src={message.userId.avatar} />
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
            {moment(message.createdAt).endOf('year').diff(moment().endOf('year')) < 0 ? (
              <p>{moment(message.createdAt).format('HH:mm DD/MM/YY')}</p>
            ) : (
              <p>
                {moment(message.createdAt).endOf('day').diff(moment().endOf('day')) < 0
                  ? moment(message.createdAt).format('HH:mm DD/MM')
                  : moment(message.createdAt).format('HH:mm')}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default forwardRef(Message);
