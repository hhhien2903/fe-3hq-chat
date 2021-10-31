import { Avatar, Button, Col, Collapse, Image, Row, Typography } from 'antd';
import { useContext } from 'react';
import { BiExit, BiImageAlt, BiPencil } from 'react-icons/bi';
import { AppContext } from '../../contexts/AppProvider';
import GroupMemberItem from '../GroupMemberItem/GroupMemberItem';
import './RoomToolbar.scss';
const { Panel } = Collapse;
function RoomToolbar() {
  const { currentRoom } = useContext(AppContext);
  return (
    <>
      <Row className="toolbar">
        <Col span={24}>
          <div className="toolbar-room-info">
            {!currentRoom.avatarUrl ? (
              currentRoom.members.length > 1 ? (
                <Avatar.Group className="toolbar-icon" size={48}>
                  <Avatar style={{ marginTop: '15px' }} src={currentRoom.members[0].avatar} />
                  <Avatar style={{ marginLeft: '-18px' }} src={currentRoom.members[1].avatar} />
                </Avatar.Group>
              ) : (
                <Avatar
                  className="toolbar-icon"
                  size={63}
                  icon={<Image preview={false} src={currentRoom.members[0].avatar} />}
                />
              )
            ) : (
              <Avatar
                className="toolbar-icon"
                size={63}
                icon={<Image preview={false} src={currentRoom.avatarUrl} />}
              />
            )}
            <Typography.Title level={4}>{currentRoom.title}</Typography.Title>
          </div>
        </Col>
        <Col span={24}>
          <Collapse className="toolbar-menu" ghost>
            {currentRoom?.isGroup && (
              <>
                <Panel
                  className="toolbar-room-customize"
                  header="Tuỳ Chỉnh Cuộc Trò Chuyện"
                  key="1"
                >
                  {/* {currentRoom.creatorId === user._id && (
                    
                  )} */}
                  <Button type="text" size={'large'} icon={<BiPencil size={18} />}>
                    <p>Đổi tên cuộc trò chuyện</p>
                  </Button>
                  <Button type="text" size={'large'} icon={<BiImageAlt size={18} />}>
                    <p>Đổi hình đại diện cuộc trò chuyện</p>
                  </Button>
                  <Button type="text" size={'large'} icon={<BiExit size={18} color="red" />}>
                    <p style={{ color: 'red' }}>Rời khỏi cuộc trò chuyện</p>
                  </Button>
                </Panel>

                <Panel
                  className="toolbar-room-member"
                  header={`Thành Viên Nhóm (${currentRoom.members.length})`}
                  key="2"
                >
                  {currentRoom.members.map((member) => (
                    <GroupMemberItem key={member._id} member={member} />
                  ))}
                </Panel>
              </>
            )}
            <Panel header="Tệp Tin" key="3">
              <p>haha</p>
            </Panel>
          </Collapse>
        </Col>
      </Row>
    </>
  );
}

export default RoomToolbar;
