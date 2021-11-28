import { Collapse, Typography } from 'antd';
import { useContext, useEffect } from 'react';
import { AppContext } from '../../contexts/AppProvider';
import './NotificationList.scss';
import NotificationListItem from './NotificationListItem';

export default function NotificationList() {
  const { listNotification, getListNotification } = useContext(AppContext);
  useEffect(() => {
    getListNotification();
  }, []);
  return (
    <div className="notification container">
      <p className="notification title">Thông báo</p>

      {listNotification ? (
        <>
          <Collapse ghost defaultActiveKey={'1'}>
            <Collapse.Panel header={`Thông báo (${listNotification.length})`} key="1">
              {listNotification.map((noti) => {
                return <NotificationListItem key={noti._id} noti={noti} />;
              })}
            </Collapse.Panel>
          </Collapse>
        </>
      ) : (
        <Typography.Text>Không có thông báo</Typography.Text>
      )}
    </div>
  );
}
