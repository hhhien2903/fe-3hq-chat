import { Avatar, Modal } from 'antd';
import './LeftSidebar.scss';
import { useHistory } from 'react-router-dom';
import { IoChatbubbleEllipses, IoPeople } from 'react-icons/io5';
import { GoSignOut } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import { AppContext } from '../../contexts/AppProvider';

import { firebaseAuth } from '../../config/firebase';
function LeftSidebar() {
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const { setCurrentRoom, setRooms } = useContext(AppContext);
  const showConfirmLogoutModal = () => {
    const confirmLogoutModal = Modal.confirm({
      title: 'Xác Nhận',
      content: 'Bạn có muốn đăng xuất khỏi 3HQ - Chat?',
      okText: 'Đăng xuất',
      okType: 'danger',
      cancelText: 'Không',
      onOk() {
        firebaseAuth.signOut();
        setCurrentRoom(null);
        setRooms([]);
        history.push('/login');
      },
      onCancel() {
        confirmLogoutModal.destroy();
      },
    });
  };

  return (
    <ul className="sidebar-container">
      <li className="sidebar-item avatar">
        <span href="#" className="sidebar-link">
          <Avatar size={48} src={`${user.avatar}`} />
        </span>
      </li>

      <li className="sidebar-item">
        <Link to="/chat">
          <span className="sidebar-link">
            <IoChatbubbleEllipses size={30} color="#FFFFFF" />
          </span>
        </Link>
      </li>

      <li className="sidebar-item">
        <Link to="/contact">
          <span className="sidebar-link">
            <IoPeople size={30} width="30px" color="#FFFFFF" />
          </span>
        </Link>
      </li>

      <li onClick={showConfirmLogoutModal} className="sidebar-item setting">
        <span className="sidebar-link">
          <GoSignOut size={30} color="#FFFFFF" />
        </span>
      </li>
    </ul>
  );
}

export default LeftSidebar;
