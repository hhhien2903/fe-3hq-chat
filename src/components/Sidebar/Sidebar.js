import { Avatar } from 'antd';
import './Sidebar.scss';
import { IoChatbubbleEllipses, IoPeople } from 'react-icons/io5';
import { GoSignOut } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { firebase } from '../../config/firebase';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
function Sidebar() {
  const { setUser } = useContext(AuthContext);
  const history = useHistory();
  const handleLogout = async () => {
    await firebase.auth().signOut();
    setUser({});
    history.push('/login');
  };
  return (
    <ul className="sidebar-container">
      <li className="sidebar-item avatar">
        <span href="#" className="sidebar-link">
          <Avatar size={48} src="https://randomuser.me/api/portraits/men/72.jpg" />
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
      <li onClick={handleLogout} className="sidebar-item setting">
        <span className="sidebar-link">
          <GoSignOut size={30} color="#FFFFFF" />
        </span>
      </li>
    </ul>
  );
}

/* <Col className={currentRoute.includes('chat') ? 'tab-active' : 'tab'} span={24}> */

export default Sidebar;
