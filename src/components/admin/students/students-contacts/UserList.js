import React, { useState } from 'react';
// import Profile_Modal from './Profile_Modal';
// import Class_Info_Modal from './Class_Info_Modal';

// material-ui
import { styled } from '@mui/material/styles';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Modal,
  TextField,
  Fade,
  Button,
  Grid,
  Typography,
  InputLabel,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
} from '@mui/material';

// import { useDispatch, useSelector } from 'store';
// import { getUsersListStyle1 } from 'store/slices/user';

// const avatarImage = require.context('assets/images/users', true);

// ==============================|| USER LIST 1 ||============================== //
// user list (delete after api integration)
const data = [
  {
    id: '01',
    gender: 'M',
    sid: 112749,
    eng_name: 'Chan Siu Ming',
    chin_name: '陳小明',
    phone: 90000002,
    email: 'smchan@abc.com',
    level: '4',
    reg_date: '6/15/2022',
    address: 'Hong Kong',
    emergency_contact_mobile: '90000001',
    emergency_contact: 'Chan Siu Siu',
    school: 'Great School',
    remark: 'good student',
    birth: '10/9/1990',
  },
  {
    id: '02',
    gender: 'F',
    sid: 112750,
    eng_name: 'Yeung Ying Ying',
    chin_name: '楊瑩瑩',
    phone: 90000002,
    email: 'YYYeung@abc.com',
    level: '1',
    reg_date: '6/15/2022',
    address: 'Room 2001, Happy Garden, Kowloon',
    emergency_contact_mobile: '90000002',
    emergency_contact: 'Yeung Mama',
    school: 'Great School',
    remark: '',
    birth: '2/9/1997',
  },
  {
    id: '03',
    gender: 'M',
    sid: 112751,
    eng_name: 'Lau Chi Ming',
    chin_name: '劉志明',
    phone: 90000005,
    email: 'lming@abc.com',
    level: '4',
    reg_date: '6/15/2022',
    address: 'Room 2001, Happy Garden, Kowloon',
    emergency_contact_mobile: '90000002',
    emergency_contact: 'Lau baba',
    school: 'Great School',
    remark: '',
    birth: '11/9/2001',
  },
  {
    id: '04',
    gender: 'F',
    sid: 112752,
    eng_name: 'Yue Ho Yin',
    phone: 93145367,
    email: 'frankieyueee@abc.com',
    level: 'F3',
    reg_date: '6/16/2022',
    address: 'Room 2001, 20/F, Happy Garden, Kwai Fong, Kowloon',
    emergency_contact_mobile: '90042141',
    emergency_contact: 'Yue Mei Lin',
    school: 'CCCQOC',
    remark: '',
    birth: '10/9/1993',
  },
  {
    id: '05',
    gender: 'F',
    sid: 112753,
    eng_name: 'Chan Ka Yan',
    chin_name: '陳嘉欣',
    phone: 91234567,
    email: 'kychan@abc.com',
    level: '1',
    reg_date: '6/16/2022',
    address: 'Flat 1023, 10/F, Sad Garden, Kwai Fong, Kowloon',
    emergency_contact_mobile: '52352423',
    emergency_contact: 'Chan Kin',
    school: 'Great School',
    remark: '',
    birth: '10/9/1993',
  },
  {
    id: '06',
    gender: 'M',
    sid: 112754,
    eng_name: 'Wong Chi Hang',
    chin_name: '黃志恒',
    phone: 93000001,
    email: 'chwong@abc.com',
    level: '4',
    reg_date: '6/16/2022',
    address: 'Room 2001, Happy Garden, Kowloon',
    emergency_contact_mobile: '90000002',
    emergency_contact: 'Yeung Mama',
    school: 'Great School',
    remark: '',
    birth: '10/9/1993',
  },
  {
    id: '07',
    gender: 'M',
    sid: 123124,
    eng_name: 'Wong Tin',
    chin_name: '黃天',
    phone: 9301231,
    email: 'twong@abc.com',
    level: '7',
    reg_date: '6/14/2022',
    address: 'Room 2001, Happy Garden, Kowloon',
    emergency_contact_mobile: '90566502',
    emergency_contact: 'Wong',
    school: 'Bad School',
    remark: '',
    birth: '10/9/1993',
  },
  {
    id: '08',
    gender: 'M',
    sid: 118691,
    eng_name: 'Wong Chun Fu',
    chin_name: '黃晉虎',
    phone: 93000001,
    email: 'cfwong@abc.com',
    level: '8',
    reg_date: '7/16/2022',
    address: 'Room 2001, Happy Garden, Kowloon',
    emergency_contact_mobile: '90000002',
    emergency_contact: 'Yeung Mama',
    school: 'Great School',
    remark: '',
    birth: '10/9/1993',
  },
  {
    id: '09',
    gender: 'M',
    sid: 199912,
    eng_name: 'Wong Tin Kei',
    chin_name: '黃天璣',
    phone: 93000001,
    email: 'tkwong@abc.com',
    level: '3',
    reg_date: '6/26/2022',
    address: 'Room 2001, Happy Garden, Kowloon',
    emergency_contact_mobile: '90000002',
    emergency_contact: 'Yeung Mama',
    school: 'Great School',
    remark: '',
    birth: '10/9/1993',
  },
  {
    id: '10',
    gender: 'M',
    sid: 112754,
    eng_name: 'Kam Yin',
    chin_name: '金言',
    phone: 93000001,
    email: 'ky@abc.com',
    level: '4',
    reg_date: '6/16/2022',
    address: 'Room 2001, Happy Garden, Kowloon',
    emergency_contact_mobile: '90000002',
    emergency_contact: 'Yeung Mama',
    school: 'Great School',
    remark: '',
    birth: '10/9/1993',
  },
  {
    id: '11',
    gender: 'F',
    sid: 189640,
    eng_name: 'Liu Cheung Kong',
    chin_name: '廖長江',
    phone: 54151247,
    email: 'liuck@abc.com',
    level: '4',
    reg_date: '6/16/2022',
    address: 'Room 2001, Happy Garden, Kowloon',
    emergency_contact_mobile: '90000002',
    emergency_contact: 'Yeung Mama',
    school: 'Great School',
    remark: '',
    birth: '10/9/1993',
  },
];

const CustomTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: '#5576CA',
    color: '#FFF',
    cursor: 'pointer',
    '& td': {
      color: 'white',
    },
  },
}));

export default function UserList(props) {
  // const theme = useTheme();
  // const [modalStyle] = React.useState(getModalStyle);
  // const dispatch = useDispatch();

  // const [data, setData] = React.useState([]);
  // const { usersS1 } = useSelector((state) => state.user);

  // React.useEffect(() => {
  //     setData(usersS1);
  // }, [usersS1]);

  // React.useEffect(() => {
  //     dispatch(getUsersListStyle1());
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleRowClick = (rowData) => {
    setModalData(rowData);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Level</TableCell>
              <TableCell align="center" sx={{ pr: 3 }}>
                Registration Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data &&
              props.data.map((row, index) => (
                <CustomTableRow key={index} onClick={() => handleRowClick(row)}>
                  <TableCell>{row.sid}</TableCell>
                  <TableCell>
                    {row.eng_name} {row.chin_name}
                  </TableCell>
                  <TableCell>{row.phone}</TableCell>

                  <TableCell>
                    <a href={`mailto: ${row.email}`}>{row.email}</a>
                  </TableCell>

                  <TableCell>{row.level}</TableCell>
                  <TableCell align="center" sx={{ pr: 3 }}>
                    {row.reg_date}
                  </TableCell>
                </CustomTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Modals */}
      {/* <Profile_Modal
        isModalOpen={isModalOpen}
        handleModalClose={handleModalClose}
        modalData={modalData} */}
      {/* /> */}
      {/* Modals */}
    </>
  );
}
