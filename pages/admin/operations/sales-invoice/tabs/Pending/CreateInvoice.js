import PropTypes from 'prop-types';
import * as React from 'react';
// material-ui
import { styled } from '@mui/material/styles';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Divider,
  IconButton,
  Modal,
  TextField,
  InputLabel,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';

// third-party
import { useIntl } from 'react-intl';

// project imports
import MainCard from '../../../../../../src/components/extended/MainCard';

// assets
import { Icon } from '@iconify/react';
import CloseIcon from '@iconify/icons-carbon/close';

//modals
import GetStudentList from './GetStudentList';
import AddItem from './AddItem';
import MessageModal from '../../../../../../src/components/extended/operations/message-modal/MessageModal';

// styles
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-of-type td, &:last-of-type th': {
    border: 0,
  },
}));

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
      handleClose,
      intl,
      rows,
      setValueLabel,
      valueLabel,
      handleOpenGetStudentModal,
      handleCloseGetStudentModal,
      openGetStudentModal,
      openAddItem,
      handleOpenAddItem,
      handleCloseAddItem,
      studentInfo,
      setStudentInfo,
      openMessage,
      handleCloseMessage,
      handleOpenMessage,
      setRows,
      handleDeleteItem,
    },
    ref
  ) => (
    <div ref={ref} tabIndex={-1}>
      <MainCard
        title=" "
        content={false}
        secondary={
          <IconButton onClick={handleClose} size="large">
            <Icon icon={CloseIcon} />
          </IconButton>
        }
        sx={{
          position: 'absolute',
          width: { xs: 380, sm: '80%', lg: '55%' },
          height: { xs: '90%', lg: '90%' },
          top: '50%',
          left: '50%',
          padding: '10px',
          transform: 'translate(-50%, -50%)',
          overflow: 'auto',
        }}
      >
        <Grid
          container
          spacing={2}
          alignItems="center"
          sx={{
            padding: '20px',
            color: 'black',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#bdbdbd',
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#bdbdbd',
            },
            '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#bdbdbd',
            },
          }}
        >
          <Grid
            item
            xs={6}
            lg={6}
            sx={{
              padding: '20px',
            }}
          >
            <InputLabel>{intl.formatMessage({ id: 'invoice to:' })}</InputLabel>
            <TextField
              InputProps={{
                readOnly: true,
                value: `${studentInfo.code}`,
              }}
              sx={{ input: { cursor: 'pointer' } }}
              size="small"
              margin="normal"
              fullWidth
              onClick={handleOpenGetStudentModal}
            />
            <TextField
              InputProps={{
                readOnly: true,
                value: `${studentInfo.name}`,
                style: { cursor: 'pointer' },
              }}
              sx={{ input: { cursor: 'pointer' } }}
              margin="normal"
              size="small"
              fullWidth
              onClick={handleOpenGetStudentModal}
            />
          </Grid>
          <Grid
            item
            xs={6}
            lg={6}
            sx={{
              padding: '20px',
            }}
            container
            direction="column"
            alignItems="flex-end"
          >
            <Typography variant="h2" gutterBottom>
              {intl.formatMessage({ id: 'invoice' })}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              {`Date of Invoice:  ${new Date().toLocaleDateString('en-CA', {
                timeZone: 'GMT',
              })}`}
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <TableContainer>
              <Table sx={{ minWidth: 320 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell sx={{ pl: 3 }}>
                      {intl.formatMessage({ id: 'description' })}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {intl.formatMessage({ id: 'qty' })}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {intl.formatMessage({ id: 'price' })}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {intl.formatMessage({ id: 'total' })}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {intl.formatMessage({ id: ' ' })}
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.length === 0 ? (
                    <StyledTableRow>
                      <StyledTableCell
                        sx={{ pl: 3 }}
                        component="td"
                        scope="row"
                        colSpan={5}
                        align="center"
                      >
                        {intl.formatMessage({ id: 'no data available' })}
                      </StyledTableCell>
                    </StyledTableRow>
                  ) : (
                    rows.map((row, index) => (
                      <StyledTableRow hover key={row.ProductCode}>
                        <StyledTableCell sx={{ pl: 3 }} component="th" scope="row">
                          {row.ProductDescription}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <TextField
                            type="number"
                            inputProps={{
                              inputMode: 'numeric',
                              style: { textAlign: 'center', fontSize: 17, padding: 12 },
                            }}
                            defaultValue={row.Qty}
                            sx={{ width: 80 }}
                          />
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.ProductPrice}</StyledTableCell>
                        <StyledTableCell align="right">{row.ProductPrice}</StyledTableCell>
                        <StyledTableCell sx={{ width: 50 }} align="right">
                          <IconButton size="large">
                            <Icon icon={CloseIcon} onClick={() => handleDeleteItem(index)} />
                          </IconButton>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid
            item
            xs={12}
            lg={12}
            container
            justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
          >
            <Typography variant="subtitle1">
              {`${intl.formatMessage({
                id: 'grand total',
              })} \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 ${rows.reduce(
                (total, item) => total + item.ProductPrice,
                0
              )}\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0`}
            </Typography>
          </Grid>
          <Grid item lg={12} container justifyContent="flex-start">
            <CardActions>
              <Grid container spacing={1}>
                <Grid item>
                  <Button
                    variant="contained"
                    sx={{ marginRight: 2, fontSize: 18 }}
                    onClick={studentInfo.code === '' ? handleOpenMessage : handleOpenAddItem}
                  >
                    {intl.formatMessage({ id: 'add item' })}
                  </Button>
                </Grid>
              </Grid>
            </CardActions>
          </Grid>

          {/* Payment Method */}

          <Grid container spacing={1} item lg={12}>
            <Grid item lg={12}>
              <Typography variant="subtitle1">
                {intl.formatMessage({ id: 'payment method' })}
              </Typography>
            </Grid>
            <Grid container item lg={12}>
              <FormControl sx={{ ml: 2, width: '100%' }}>
                <RadioGroup
                  row
                  aria-label="gender"
                  value={valueLabel}
                  onChange={(e) => setValueLabel(e.target.value)}
                  name="row-radio-buttons-group"
                >
                  <Grid item xs={6} lg={3} xl={3}>
                    <FormControlLabel
                      value="cash"
                      control={<Radio />}
                      label={intl.formatMessage({ id: 'cash' })}
                    />
                  </Grid>
                  <Grid item xs={6} lg={3} xl={3}>
                    <FormControlLabel
                      value="visa/master"
                      control={<Radio />}
                      label={intl.formatMessage({ id: 'visa/master' })}
                    />
                  </Grid>
                  <Grid item xs={6} lg={3} xl={3}>
                    <FormControlLabel
                      value="eps"
                      control={<Radio />}
                      label={intl.formatMessage({ id: 'eps' })}
                    />
                  </Grid>
                  <Grid item xs={6} lg={3} xl={3}>
                    <FormControlLabel
                      value="payme"
                      control={<Radio />}
                      label={intl.formatMessage({ id: 'payme' })}
                    />
                  </Grid>
                  <Grid item xs={6} lg={3} xl={3}>
                    <FormControlLabel
                      value="fps"
                      control={<Radio />}
                      label={intl.formatMessage({ id: 'fps' })}
                    />
                  </Grid>
                  <Grid item xs={6} lg={3} xl={3}>
                    <FormControlLabel
                      value="octopus"
                      control={<Radio />}
                      label={intl.formatMessage({ id: 'octopus' })}
                    />
                  </Grid>
                  <Grid item xs={6} lg={3} xl={3}>
                    <FormControlLabel
                      value="cheque"
                      control={<Radio />}
                      label={intl.formatMessage({ id: 'cheque' })}
                    />
                  </Grid>
                  <Grid item xs={6} lg={3} xl={3}>
                    <FormControlLabel
                      value="bank transfer"
                      control={<Radio />}
                      label={intl.formatMessage({ id: 'bank transfer' })}
                    />
                  </Grid>
                  <Grid item xs={6} lg={3} xl={3}>
                    <FormControlLabel
                      value="alipay"
                      control={<Radio />}
                      label={intl.formatMessage({ id: 'alipay' })}
                    />
                  </Grid>
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>

          <Grid item lg={12} justifyContent="center" alignContent="center">
            <Divider sx={{ mt: '10px', mb: '10px' }} />
          </Grid>

          {/* Remarks */}
          <Grid
            container
            spacing={2}
            justifyContent="center"
            sx={{
              color: 'black',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#bdbdbd',
              },
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#bdbdbd',
              },
              '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#bdbdbd',
              },
            }}
          >
            <Grid item xs={12} lg={12}>
              <TextField
                id="outlined-multiline-static"
                label="Remarks"
                multiline
                rows={4}
                fullWidth
                defaultValue=""
                sx={{ ml: 2, mt: 2 }}
              />
            </Grid>
          </Grid>

          <Grid item lg={12} justifyContent="center">
            <Divider sx={{ mt: '10px', mb: '10px' }} />
          </Grid>

          {/* Submit/Confirm */}
          <Grid item lg={12} container justifyContent="flex-end">
            <CardActions>
              <Grid container alignItems="center" justifyContent="flex-end">
                <Grid item>
                  <Button variant="contained" sx={{ marginRight: 2, fontSize: 18 }}>
                    {intl.formatMessage({ id: 'confirm invoice' })}
                  </Button>
                </Grid>
              </Grid>
            </CardActions>
          </Grid>
        </Grid>
      </MainCard>
      <GetStudentList
        setStudentInfo={setStudentInfo}
        handleClose={handleCloseGetStudentModal}
        open={openGetStudentModal}
      />
      <AddItem handleClose={handleCloseAddItem} open={openAddItem} setRows={setRows} />
      <MessageModal
        handleClose={handleCloseMessage}
        open={openMessage}
        message={`Please Select a Student`}
      />
    </div>
  )
);

Body.propTypes = {
  modalStyle: PropTypes.object,
  handleClose: PropTypes.func,
  intl: PropTypes.object,
  rows: PropTypes.array,
  setValueLabel: PropTypes.func,
  valueLabel: PropTypes.string,
  handleOpenGetStudentModal: PropTypes.func,
  handleCloseGetStudentModal: PropTypes.func,
  openGetStudentModal: PropTypes.bool,
  handleCloseAddItem: PropTypes.func,
  handleOpenAddItem: PropTypes.func,
  openAddItem: PropTypes.bool,
  studentInfo: PropTypes.object,
  setStudentInfo: PropTypes.func,
  openMessage: PropTypes.bool,
  handleCloseMessage: PropTypes.func,
  handleOpenMessage: PropTypes.func,
  setRows: PropTypes.func,
  handleDeleteItem: PropTypes.func,
};

CreateInvoice.propTypes = {
  openInvoice: PropTypes.bool,
  handleCloseInvoice: PropTypes.func,
};

export default function CreateInvoice({ openInvoice, handleCloseInvoice }) {
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const intl = useIntl();
  const [rows, setRows] = React.useState([]);
  const [valueLabel, setValueLabel] = React.useState('checked');
  const [openGetStudentModal, setOpenGetStudentModal] = React.useState(false);
  const [openAddItem, setOpenAddItem] = React.useState(false);
  const [openMessage, setOpenMessage] = React.useState(false);
  const [studentInfo, setStudentInfo] = React.useState({
    code: '',
    name: '',
  });

  React.useEffect(() => {}, []);

  //Get Student List Modal
  const handleOpenGetStudentModal = () => {
    setOpenGetStudentModal(true);
  };

  const handleCloseGetStudentModal = () => {
    setOpenGetStudentModal(false);
  };

  //Add Item Modal
  const handleOpenAddItem = () => {
    setOpenAddItem(true);
  };

  const handleCloseAddItem = () => {
    setOpenAddItem(false);
  };

  //Delete item
  const handleDeleteItem = (index) => {
    setRows((prevState) => prevState.filter((item, i) => i !== index));
  };

  //Message -select student- Modal
  const handleOpenMessage = () => {
    setOpenMessage(true);
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
        open={openInvoice}
        onClose={handleCloseInvoice}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Body
          modalStyle={modalStyle}
          handleClose={handleCloseInvoice}
          intl={intl}
          rows={rows}
          setValueLabel={setValueLabel}
          valueLabel={valueLabel}
          handleOpenGetStudentModal={handleOpenGetStudentModal}
          handleCloseGetStudentModal={handleCloseGetStudentModal}
          openGetStudentModal={openGetStudentModal}
          handleOpenAddItem={handleOpenAddItem}
          handleCloseAddItem={handleCloseAddItem}
          openAddItem={openAddItem}
          studentInfo={studentInfo}
          setStudentInfo={setStudentInfo}
          openMessage={openMessage}
          handleCloseMessage={handleCloseMessage}
          handleOpenMessage={handleOpenMessage}
          setRows={setRows}
          handleDeleteItem={handleDeleteItem}
        />
      </Modal>
    </Grid>
  );
}
