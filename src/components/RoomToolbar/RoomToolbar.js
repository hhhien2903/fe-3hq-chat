import { Avatar, Button, Col, Collapse, Image, Row, Typography } from 'antd';
import { useContext } from 'react';
import { AppContext } from '../../contexts/AppProvider';
import { AuthContext } from '../../contexts/AuthProvider';
import GroupMemberItem from '../GroupMemberItem/GroupMemberItem';
import './RoomToolbar.scss';
import { BiPencil, BiExit } from 'react-icons/bi';
const { Panel } = Collapse;
function RoomToolbar() {
  const { currentRoom } = useContext(AppContext);
  const { user } = useContext(AuthContext);
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
                >
                  {currentRoom.creatorId === user._id && (
                    <Button
                      type="text"
                      size={'large'}
                      icon={<BiPencil size={18} style={{ verticalAlign: 'sub' }} />}
                    >
                      <p>Đổi tên cuộc trò chuyện</p>
                    </Button>
                  )}
                  <Button
                    type="text"
                    size={'large'}
                    icon={<BiExit size={18} style={{ verticalAlign: 'sub' }} />}
                  >
                    <p>Rời khỏi cuộc trò chuyện</p>
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
