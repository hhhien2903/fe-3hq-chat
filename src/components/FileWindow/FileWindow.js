import { Table, Typography } from 'antd';
import './FileWindow.scss';
import { AiFillFile, AiOutlineClockCircle, AiFillFileImage, AiFillFileText } from 'react-icons/ai';
import { useEffect } from 'react';
import userApi from '../../api/userApi';
import { useState } from 'react';
import moment from 'moment';
export default function FileWindow() {
  const [file, setFile] = useState([]);
  useEffect(() => {
    const listFile = async () => {
      try {
        const listFile = await userApi.getListFile();
        if (listFile) {
          setFile(listFile);
        } else {
          return;
        }
      } catch (error) {
        console.log(error);
      }
    };
    listFile();
  }, []);
  const colums = [
    {
      title: 'Loại',
      dataIndex: 'type',
      key: 'type',
      width: '70px',
      render: (type) => (
        <>
          {type === 'image/jpeg' ? (
            <>
              <AiFillFileImage size={24} />
            </>
          ) : (
            <>{type === 'text/plain' ? <AiFillFileText size={24} /> : <AiFillFile size={24} />}</>
          )}
        </>
      ),
    },
    {
      title: 'Tên file',
      dataIndex: 'fileName',
      key: 'fileName',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Hội thoại',
      dataIndex: 'userId',
      width: '500px',
      render: (userId) => <a>{userId.fullName}</a>,
    },
    {
      title: 'Thời gian',
      dataIndex: 'createdAt',
      width: '200px',
      render: (createdAt) => <>{moment(createdAt).format('HH:mm DD/MM/YYYY')}</>,
    },
  ];
  return (
    <div className="file container">
      <div className="file title">
        <AiOutlineClockCircle />
        <Typography.Text style={{ marginLeft: '20px' }}>Gần đây</Typography.Text>
      </div>
      <Table
        columns={colums}
        dataSource={file}
        pagination={{ pageSize: 50, position: ['none', 'none'] }}
        locale={{ emptyText: 'Không có file nào' }}
        scroll={{ y: 800 }}
      />
    </div>
  );
}
