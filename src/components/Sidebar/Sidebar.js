import { Avatar } from 'antd';
import './Sidebar.scss';
import { IoChatbubbleEllipses, IoPeople } from 'react-icons/io5';
import { GoSignOut } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
function Sidebar() {
  const { user } = useContext(AuthContext);
  return (
    <ul className="sidebar-container">
      <li className="sidebar-item avatar">
        <span href="#" className="sidebar-link">
          <Avatar size={48} src={`${user.avatar}`} />
        </span>
      </li>

      <li className="sidebar-item message">
        <Link to="/chat">
          <span className="sidebar-link">
            <IoChatbubbleEllipses size={30} color="#FFFFFF" />
          </span>
        </Link>
      </li>

      <li className="sidebar-item contact">
        <span className="sidebar-link">
          <IoPeople size={30} width="30px" color="#FFFFFF" />
        </span>
      </li>
      <li className="sidebar-item setting">
        <Link to="/logout">
          <span className="sidebar-link">
            <GoSignOut size={30} color="#FFFFFF" />
          </span>
        </Link>
      </li>
    </ul>
  );
}

/* <Col className={currentRoute.includes('chat') ? 'tab-active' : 'tab'} span={24}> */

export default Sidebar;
