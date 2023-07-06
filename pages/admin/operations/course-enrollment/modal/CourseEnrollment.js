import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import {
  Card,
  Button,
  CardContent,
  CardActions,
  Divider,
  InputAdornment,
  TextField,
  Grid,
  IconButton,
  Paper,
  Modal,
  Typography,
  Radio,
  Avatar,
} from '@mui/material';

// project imports
import MainCard from '../../../../../src/components/extended/MainCard';
import SubCard from '../../../../../src/components/extended/SubCard';

// assets
import { Icon } from '@iconify/react';
import SearchIcon from '@iconify/icons-carbon/search';
import CloseIcon from '@iconify/icons-carbon/close';

// third-party
import { useIntl } from 'react-intl';

//table
import CourseTable from './CourseTable';
import { Box } from '@mui/system';
import StudentListModal from '../../../../../src/components/extended/operations/student-list-table/StudentListModal';
import MessageModal from '../../../../../src/components/extended/operations/message-modal/MessageModal';
import CreateInvoiceModal from '../../../../../src/components/extended/operations/create-invoice/CreateInvoiceModal';

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
      handleSearch,
      search,
      openSelectStudent,
      handleOpenSelectStudent,
      handleCloseSelectStudent,
      studentInfoHandler,
      studentInfo,
      openMessage,
      handleCloseMessage,
      handleOpenMessage,
      selected,
      setSelected,
      message,
      showVouchers,
      openInvoice,
      handleCloseInvoice,
      studentInvoiceDetails,
    },
    ref
  ) => (
    <div ref={ref} tabIndex={-1}>
      <MainCard
        sx={{
          position: 'absolute',
          // maxWidth: { xs: '400px', md: '800px', lg: '1140px' },
          width: { xs: '400px', sm: '600px', md: '992px', lg: '1140px' },
          height: {
            xs: 'calc(100% - 3.5rem)',
            md: 'calc(100% - 3.5rem)',
            lg: 'calc(100% - 3.5rem)',
          },
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          overflow: 'auto',
        }}
        title={intl.formatMessage({ id: 'course enrollment' })}
        content={false}
        secondary={
          <IconButton onClick={handleClose} size="large">
            <Icon icon={CloseIcon} />
          </IconButton>
        }
      >
        <Paper>
          <CardContent>
            <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
              <Grid item xs={12} sm={12} lg={12}>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment sx={{ color: '#9ec5fe' }} position="start">
                        <Icon icon={SearchIcon} />
                      </InputAdornment>
                    ),
                  }}
                  value={studentInfo}
                  onChange={handleSearch}
                  placeholder={search}
                  size="medium"
                  sx={{
                    cursor: 'pointer',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#5599fd',
                      },
                      '&:hover fieldset': {
                        borderColor: '#9ec5fe',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#5599fd',
                      },
                    },
                    input: {
                      '&::placeholder': {
                        color: '#9ec5fe',
                      },
                    },
                  }}
                  fullWidth
                  onClick={handleOpenSelectStudent}
                />
              </Grid>
            </Grid>
          </CardContent>
          <CourseTable
            studentInfo={studentInfo}
            handleOpenMessage={handleOpenMessage}
            selected={selected}
            setSelected={setSelected}
            showVouchers={showVouchers}
          />
        </Paper>
      </MainCard>
      <StudentListModal
        open={openSelectStudent}
        handleClose={handleCloseSelectStudent}
        studentInfoHandler={studentInfoHandler}
      />
      <MessageModal message={message} open={openMessage} handleClose={handleCloseMessage} />
      <CreateInvoiceModal
        openInvoice={openInvoice}
        handleCloseInvoice={handleCloseInvoice}
        condition={'course-enrollment'}
        studentInvoiceDetails={studentInvoiceDetails}
      />
    </div>
  )
);

Body.propTypes = {
  modalStyle: PropTypes.object,
  handleClose: PropTypes.func,
  intl: PropTypes.object,
  handleSearch: PropTypes.func,
  search: PropTypes.string,
  openSelectStudent: PropTypes.bool,
  handleOpenSelectStudent: PropTypes.func,
  handleCloseSelectStudent: PropTypes.func,
  studentInfoHandler: PropTypes.func,
  studentInfo: PropTypes.string,
  openMessage: PropTypes.bool,
  handleCloseMessage: PropTypes.func,
  handleOpenMessage: PropTypes.func,
  selected: PropTypes.array,
  setSelected: PropTypes.func,
  message: PropTypes.string,
  showVouchers: PropTypes.bool,
  handleShowVouchers: PropTypes.func,
  handleCloseInvoice: PropTypes.func,
  openInvoice: PropTypes.bool,
  studentInvoiceDetails: PropTypes.object,
};

export default function CourseEnrollment({ open, handleClose }) {
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const intl = useIntl();
  const [search, setSearch] = React.useState(intl.formatMessage({ id: 'select a student' }));
  //modal
  const [openSelectStudent, setOpenSelectStudent] = React.useState(false);
  const [studentInfo, setStudentInfo] = React.useState('');
  const [openMessage, setOpenMessage] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [selected, setSelected] = React.useState([]);
  const [showVouchers, setShowVouchers] = React.useState(false);
  const [openInvoice, setOpenInvoice] = React.useState(false);
  const [studentInvoiceDetails, setStudentInvoiceDetails] = React.useState({
    code: '',
    name: '',
  });

  React.useEffect(() => {
    setShowVouchers((prev) => {
      if (
        studentInvoiceDetails !==
          {
            code: '',
            name: '',
          } &&
        selected.length > 0
      )
        return true;
      if (
        studentInvoiceDetails !==
          {
            code: '',
            name: '',
          } &&
        selected.length === 0
      )
        return false;
      return prev;
    });
  }, [selected, studentInvoiceDetails]);

  const handleOpenSelectStudent = () => {
    setOpenSelectStudent(true);
  };

  const handleCloseSelectStudent = () => {
    setOpenSelectStudent(false);
  };

  const handleSearch = (event) => {
    console.log(event.target.value);
  };

  const studentInfoHandler = (data) => {
    if (data) {
      console.log(
        '----------------------------------------data----------------------------------------'
      );
      console.log(data);
      const value = `${data.FirstName} - ${data.LastName} - (M:${data.Mobile}) - ${data.SchoolName}`;
      setStudentInfo(value);
      setStudentInvoiceDetails({
        code: data.StudentCode,
        name: `${data.FirstName} - ${data.LastName} - ${data.Mobile}`,
      });
    }
  };

  const handleCloseInvoice = () => {
    setOpenInvoice(false);
  };

  const handleOpenMessage = () => {
    if (studentInvoiceDetails.name === '' && selected.length === 0) {
      setMessage('Please Select Student and Course');
      setOpenMessage(true);
      return;
    }
    if (studentInvoiceDetails.name === '') {
      setMessage('Please Select Student');
      setOpenMessage(true);
      return;
    }
    if (selected.length === 0) {
      setMessage('Please Select Course');
      setOpenMessage(true);
      return;
    }
    setSelected([]);
    setOpenInvoice(true);
  };

  const handleCloseMessage = () => {
    setOpenMessage(false);
  };

  return (
    <Grid container justifyContent="flex-end">
      {/* <Button variant="contained" type="button" onClick={handleOpen}>
                Open Modal
            </Button> */}
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
          handleSearch={handleSearch}
          search={search}
          openSelectStudent={openSelectStudent}
          handleOpenSelectStudent={handleOpenSelectStudent}
          handleCloseSelectStudent={handleCloseSelectStudent}
          studentInfoHandler={studentInfoHandler}
          studentInfo={studentInfo}
          openMessage={openMessage}
          handleCloseMessage={handleCloseMessage}
          handleOpenMessage={handleOpenMessage}
          selected={selected}
          setSelected={setSelected}
          message={message}
          showVouchers={showVouchers}
          handleCloseInvoice={handleCloseInvoice}
          openInvoice={openInvoice}
          studentInvoiceDetails={studentInvoiceDetails}
        />
      </Modal>
    </Grid>
  );
}

CourseEnrollment.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};
