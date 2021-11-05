import './SuggetionFriendWindow.scss';
import { Avatar, Button, Col, Collapse, Row, Typography } from 'antd';
import SuggetionFriendItem from './SuggetionFriendItem';
export default function SuggetionFriendWindow() {
  return (
    <div className="suggetion-window">
      <Row className="header" align="middle">
        <Col flex="70px">
          <Row justify="center">
            <Avatar
              style={{ margin: '0 auto' }}
              size={50}
              src={'https://chat.zalo.me/assets/NewFr@2x.820483766abed8ab03205b8e4a8b105b.png'}
            />
          </Row>
        </Col>
        <Col className="title" flex="1 1 0%">
          <Typography.Text className="title" style={{ margin: '0px 5px', fontSize: '20px' }}>
            Danh sách gợi ý kết bạn
          </Typography.Text>
        </Col>
      </Row>
      <div className="suggetion-box">
        <Collapse ghost defaultActiveKey={'1'}>
          <Collapse.Panel header={`Gợi ý kết bạn ()`} key="1">
            <Row gutter={[8, 16]}>
              <SuggetionFriendItem />
            </Row>
          </Collapse.Panel>
        </Collapse>
      </div>
    </div>
  );
}
