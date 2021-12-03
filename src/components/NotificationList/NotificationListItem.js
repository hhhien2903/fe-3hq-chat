import { Avatar } from 'antd';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import moment from 'moment';
import './NotificationList.scss';
const NotificationListItem = (props) => {
  const { noti } = props;
  const { user } = useContext(AuthContext);
  return (
    <div className="noti content">
      <div className="noti icon">
        <Avatar size={55} src={user.avatar} />
      </div>
      <div className="noti title" title={noti.message}>
        <p>{noti.message}</p>
      </div>
      <div className="noti time">
        {moment(noti.createdAt).endOf('year').diff(moment().endOf('year')) < 0 ? (
          <p className="noti time">{moment(noti.createdAt).format('HH:mm DD/MM/YY')}</p>
        ) : (
          <p className="noti time">
            {moment(noti.createdAt).endOf('day').diff(moment().endOf('day')) < 0
              ? moment(noti.createdAt).format('HH:mm DD/MM')
              : moment(noti.createdAt).format('HH:mm')}
          </p>
        )}
      </div>
    </div>
  );
};
export default NotificationListItem;
