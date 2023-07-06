import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import {
  Button,
  CardContent,
  CardActions,
  Divider,
  Grid,
  IconButton,
  Modal,
  Typography,
  Radio,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  TablePagination,
} from '@mui/material';

// project imports
import MainCard from '../../../../../src/components/extended/MainCard';
import SubCard from '../../../../../src/components/extended/SubCard';

// assets
import { Icon } from '@iconify/react';
import CloseIcon from '@iconify/icons-carbon/close';

// third-party
import { useIntl } from 'react-intl';

//modal import
import StudentDetails from '../../../../../src/components/extended/operations/StudentDetails';

//headcell
const headCells = [
  {
    id: 'CourseCode',
    numeric: false,
    label: 'student code',
    align: 'left',
  },
  {
    id: 'CourseTitle',
    numeric: true,
    label: 'student name',
    align: 'left',
  },
  {
    id: 'Name',
    numeric: true,
    label: 'attendance',
    align: 'left',
  },
];

// modal position
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const Body = React.forwardRef(
  (
    {
      modalStyle,
      handleClose,
      intl,
      handleChange,
      students,
      rowsPerPage,
      page,
      handleChangePage,
      handleChangeRowsPerPage,
      openStudentDetails,
      closeStudentDetailsHandler,
      openStudentDetailsHandler,
      contactDetails,
      openTeacherModal,
      closeTeacherModalHandler,
    },
    ref
  ) => (
    <div ref={ref} tabIndex={-1}>
      <MainCard
        sx={{
          position: 'absolute',
          maxWidth: { xs: 300, lg: '70%' },
          minHeight: { xs: 900, lg: '30%' },
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        title={intl.formatMessage({ id: 'attendance' })}
        content={false}
        secondary={
          <IconButton onClick={handleClose} size="large">
            <Icon icon={CloseIcon} />
          </IconButton>
        }
      >
        <CardContent>
          <TableContainer>
            <Table aria-labelledby="tableTitle">
              <TableHead>
                <TableRow>
                  {headCells.map((headCell) => (
                    <TableCell
                      key={headCell.id}
                      align={headCell.align}
                      padding={headCell.disablePadding ? 'none' : 'normal'}
                      sx={{ fontWeight: '600' }}
                    >
                      {intl.formatMessage({ id: `${headCell.label}` })}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student, index) => {
                  return (
                    <TableRow
                      key={index}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell component="th" scope="row" sx={{ cursor: 'pointer' }}>
                        <Typography>{student.StudentCode}</Typography>
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ cursor: 'pointer' }}
                        onClick={() => openStudentDetailsHandler(student)}
                      >
                        <Typography>{`${student.FirstName} ${student.LastName}`}</Typography>
                      </TableCell>
                      <TableCell component="th" scope="row" sx={{ cursor: 'pointer' }}>
                        <Checkbox
                          checked={student.Attended}
                          onChange={(e) => handleChange(e, student)}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={students.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={intl.formatMessage({ id: 'Show' })}
          />
        </CardContent>
        <StudentDetails
          open={openStudentDetails}
          handleClose={closeStudentDetailsHandler}
          contactDetails={contactDetails}
        />
      </MainCard>
    </div>
  )
);

Body.propTypes = {
  modalStyle: PropTypes.object,
  handleClose: PropTypes.func,
  intl: PropTypes.object,
  handleChange: PropTypes.func,
  checked: PropTypes.bool,
  students: PropTypes.array,
  rowsPerPage: PropTypes.number,
  handleChangePage: PropTypes.func,
  handleChangeRowsPerPage: PropTypes.func,
  openStudentDetails: PropTypes.bool,
  closeStudentDetailsHandler: PropTypes.func,
  openStudentDetailsHandler: PropTypes.func,
};

// ==============================|| SIMPLE MODAL ||============================== //

export default function Attendance({ open, handleClose, classCode }) {
  //   const [checked, setChecked] = React.useState(false);
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [students, setStudents] = React.useState([
    {
      AttendaceStr: null,
      FirstName: 'Lau Chi Ming',
      Idx: 9990,
      StudentCode: '112751',
      CourseCode: '2304DO00001',
      ClassCode: '2304DO00001#20230424#MON@1500-1700',
      BookingDate: '2023-03-07T18:25:19.350Z',
      AttendaceTime: null,
      Cancelled: false,
      Attended: false,
      CartID: '4779C542-7558-42F8-93EA-811934643496',
      PaymentCode: '000084',
      Active: true,
      BranchCode: 'CCBC-CEC',
      LastName: '劉志明',
      Email: 'lming@abc.com',
      Mobile: '90000005',
      MaterialShared: '',
      QuizShared: '',
      Material: null,
      Remarks: null,
      AcademicPerformance: 0,
      LearningAttitude: 0,
      Participation: 0,
      Perseverance: 0,
      SocialInteraction: 0,
      UpdateBy: null,
      WeekDay: 'MON',
      StartTime: '2023-04-24T15:00:00.000Z',
      EndTime: '2023-04-24T17:00:00.000Z',
      UserCode: 'U0012',
      ClassDesc: 'DoClever Training (Mon)',
      CourseTitle: 'DoClever Training (Mon)',
      Subject: 'DoClever Training (Mon)',
      CourseDesc: 'DoClever Training (Mon)',
      ClassRemark: '',
      CancelTime: null,
      CancelRequest: null,
      CancelRequestTime: null,
      CancelApproved: null,
      CancelApprovedBy: null,
      CancelApprovedTime: null,
      OnlineMeeting: '',
      AttendeePW: null,
      HostPW: null,
      Name: 'AlanL',
      TeacherCode: 'U0012',
      VenueCode: '01',
      Points: null,
      PointsGivenBy: null,
      InvoiceNo: '000225',
      StudentClassActive: true,
      Color: '#D8D8D8',
    },
    {
      AttendaceStr: null,
      FirstName: 'Chan Siu Ming',
      Idx: 10990,
      StudentCode: '112749',
      CourseCode: '2304DO00001',
      ClassCode: '2304DO00001#20230424#MON@1500-1700',
      BookingDate: '2023-03-24T15:14:51.150Z',
      AttendaceTime: null,
      Cancelled: false,
      Attended: false,
      CartID: '57A83EA2-DA33-4BA3-8F5B-314C0FF11437',
      PaymentCode: '000091',
      Active: true,
      BranchCode: 'CCBC-CEC',
      LastName: '陳小明',
      Email: 'smchan1@abc.com',
      Mobile: '90000002',
      MaterialShared: '',
      QuizShared: '',
      Material: null,
      Remarks: null,
      AcademicPerformance: 0,
      LearningAttitude: 0,
      Participation: 0,
      Perseverance: 0,
      SocialInteraction: 0,
      UpdateBy: null,
      WeekDay: 'MON',
      StartTime: '2023-04-24T15:00:00.000Z',
      EndTime: '2023-04-24T17:00:00.000Z',
      UserCode: 'U0012',
      ClassDesc: 'DoClever Training (Mon)',
      CourseTitle: 'DoClever Training (Mon)',
      Subject: 'DoClever Training (Mon)',
      CourseDesc: 'DoClever Training (Mon)',
      ClassRemark: '',
      CancelTime: null,
      CancelRequest: null,
      CancelRequestTime: null,
      CancelApproved: null,
      CancelApprovedBy: null,
      CancelApprovedTime: null,
      OnlineMeeting: '',
      AttendeePW: null,
      HostPW: null,
      Name: 'AlanL',
      TeacherCode: 'U0012',
      VenueCode: '01',
      Points: null,
      PointsGivenBy: null,
      InvoiceNo: '000226',
      StudentClassActive: true,
      Color: '#D8D8D8',
    },
  ]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [openStudentDetails, setOpenStudentDetails] = React.useState(false);
  const [contactDetails, setContactDetails] = React.useState({});
  const intl = useIntl();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChange = (event, student) => {
    setStudents((prevState) =>
      prevState.map((item) => {
        if (student.Idx === item.Idx) {
          return { ...item, Attended: event.target.checked };
        }
        return item;
      })
    );
  };

  const handleChangeRowsPerPage = (event) => {
    if (event.target.value) setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const openStudentDetailsHandler = (studentInfo) => {
    setOpenStudentDetails(true);
    setContactDetails(studentInfo);
  };

  const closeStudentDetailsHandler = () => {
    setOpenStudentDetails(false);
  };

  return (
    <Grid container justifyContent="flex-end">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Body
          modalStyle={modalStyle}
          handleClose={handleClose}
          intl={intl}
          handleChange={handleChange}
          students={students}
          rowsPerPage={rowsPerPage}
          page={page}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          openStudentDetails={openStudentDetails}
          openStudentDetailsHandler={openStudentDetailsHandler}
          closeStudentDetailsHandler={closeStudentDetailsHandler}
          contactDetails={contactDetails}
        />
      </Modal>
    </Grid>
  );
}
