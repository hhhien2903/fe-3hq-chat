import { Avatar, Button, Col, Collapse, Image, Row, Typography } from 'antd';
import { useContext } from 'react';
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
            <Avatar
              className="toolbar-icon"
              size={63}
              icon={<Image preview={false} src={currentRoom.avatarUrl} />}
            />
            <Typography.Title level={4}>{currentRoom.title}</Typography.Title>
          </div>
        </Col>
        <Col span={24}>
          <Collapse className="toolbar-menu" ghost>
            {currentRoom?.creatorId && (
              <>
                <Panel
                  className="toolbar-room-customize"
                  header="Tuỳ Chỉnh Cuộc Trò Chuyện"
                  key="1"
                ></Panel>

                <Panel
                  className="toolbar-room-member"
                  header={`Thành Viên Nhóm (${currentRoom.members.length})`}
                  key="2"
                >
                  {currentRoom.members.map((user, index) => (
                    <GroupMemberItem key={index} user={user} />
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
