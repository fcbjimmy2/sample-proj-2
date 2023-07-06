import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';

import { useIntl, FormattedMessage, FormattedTime } from 'react-intl';
// @mui
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  ListItemText,
  MenuItem,
  Select,
  TableCell,
  TableRow,
  Typography,
  IconButton,
} from '@mui/material';
// components
import Iconify from '../../components/Iconify';
import FormProvider, { RHFTextField, RHFSelect, RHFSlider } from '../../components/hook-form';
import DataTable from '../../components/extended/DataTable_OLD';
import MenuPopover from '../../components/menu-popover';
import ConfirmDialog from '../../components/confirm-dialog';
// utils
import axios from '../../utils/axios';
//
import ProfileLayout from './layout';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = {
  false: {
    icon: 'carbon:arrow-right',
    text: 'Opened',
  },
  true: {
    icon: 'carbon:checkmark',
    text: 'Closed',
  },
};

// ----------------------------------------------------------------------

const Tasks = ({ id }) => {
  const intl = useIntl();

  const [user, setUser] = useState(null);

  const [row, setRow] = useState(null);

  const [reload, setReload] = useState(false);

  const [openPopover, setOpenPopover] = useState(null);

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openEditRow, setOpenEditRow] = useState(false);

  const [taskCategoryOptions, setTaskCategoryOptions] = useState([]);

  const [alertOptions, setAlertOptions] = useState([]);

  const [users, setUsers] = useState([]);

  const handleShowPassword = () => {
    //setShowPassword(!showPassword);
  };

  const Schema = Yup.object().shape({});

  const methods = useForm({
    resolver: yupResolver(Schema),
    defaultValues: row,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    axios.post(`/api/task/${data.task_guid}/`, data).then(() => {
      setReload(!reload);
      handleCloseEditRow();
    });
  };

  const handleOpenPopover = (event, row) => {
    setRow(row);
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenEditRow = () => {
    setOpenEditRow(true);
  };

  const handleCloseEditRow = () => {
    setOpenEditRow(false);
  };

  const handleDeleteRow = () => {
    axios.delete(`/api/task/${row.task_guid}/`).then(() => {
      setReload(!reload);
      handleCloseConfirm();
    });
  };

  useEffect(() => {
    reset(row);
  }, [row]);

  useEffect(() => {
    axios.get(`/api/user/${id}/`).then((response) => {
      setUser(response.data);
    });
    axios.get(`/api/lookup/crm/task category/`).then((response) => {
      let options = Object.fromEntries(response.data.map((row) => [row?.value, row]));
      setTaskCategoryOptions(options);
    });
    axios.get(`/api/lookup/crm/alert/`).then((response) => {
      let options = Object.fromEntries(response.data.map((row) => [row?.value, row]));
      setAlertOptions(options);
    });
    axios.get(`/api/user/all`).then((response) => {
      let options = Object.fromEntries(response.data.map((row) => [row?.user_guid, row]));
      setUsers(options);
    });
  }, []);

  return (
    <ProfileLayout value={user}>
      <Box rowGap={2.5} columnGap={2} display="grid">
        <Typography variant="h5">
          <FormattedMessage id="tasks" />
        </Typography>
        <DataTable
          hideHeader
          url="/api/task/"
          reload={reload}
          renderRow={(row, index) => (
            <TableRow hover tabIndex={-1} key={index}>
              <TableCell>
                <Select
                  size="small"
                  sx={{ '.MuiSelect-select': { display: 'flex', alignItems: 'center' } }}
                  value={row?.task_completed}
                  onChange={(e) => {
                    axios
                      .post(`/api/task/${row?.task_guid}`, { task_completed: e.target.value })
                      .then(() => {
                        setReload(!reload);
                      });
                  }}
                >
                  {Object.keys(STATUS_OPTIONS).map((key) => (
                    <MenuItem key={key} value={key}>
                      <Iconify icon={STATUS_OPTIONS[key].icon} sx={{ mr: 1 }} />
                      <ListItemText primary={STATUS_OPTIONS[key].text} />
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell>
                <Iconify icon={taskCategoryOptions[row.task_category]?.icon ?? ''} />
              </TableCell>
              <TableCell>
                <div>{row.task_title ?? ''}</div>
                <FormControl>
                  <FormLabel>
                    <FormattedTime value={row.due_date} day="numeric" month="long" year="numeric" />
                  </FormLabel>
                </FormControl>
              </TableCell>
              <TableCell align="right">
                <FormControl>
                  <FormLabel>
                    {users[row.contact]?.full_name}({users[row.contact]?.email})
                  </FormLabel>
                </FormControl>
              </TableCell>
              <TableCell align="right">
                <IconButton
                  color={openPopover ? 'inherit' : 'default'}
                  onClick={(e) => handleOpenPopover(e, row)}
                >
                  <Iconify icon="eva:more-vertical-fill" />
                </IconButton>
              </TableCell>
            </TableRow>
          )}
        />
      </Box>

      <MenuPopover open={openPopover} onClose={handleClosePopover} arrow="right-top">
        <MenuItem
          onClick={() => {
            handleOpenEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          <FormattedMessage id="edit-task" />
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" />
          <FormattedMessage id="delete-task" />
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title={intl.formatMessage({ id: 'confirmation' })}
        content={intl.formatMessage({ id: 'confirmation-message' })}
        action={
          <Button variant="contained" color="error" onClick={handleDeleteRow}>
            <FormattedMessage id="ok" />
          </Button>
        }
        cancel={intl.formatMessage({ id: 'cancel' })}
      />
      <Dialog fullWidth maxWidth="xs" open={openEditRow} onClose={handleCloseEditRow}>
        <DialogTitle>
          <FormattedMessage id="edit-task" />
        </DialogTitle>

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <DialogContent sx={{ overflow: 'unset' }}>
            <Box rowGap={2.5} columnGap={2} display="grid">
              <Controller
                name="task_title"
                render={({ field, fieldState: { error } }) => (
                  <RHFTextField
                    label={intl.formatMessage({ id: 'task-title' })}
                    {...field}
                    value={field.value}
                  />
                )}
              />

              <Controller
                name="task_category"
                render={({ field, fieldState: { error } }) => (
                  <RHFSelect
                    label={intl.formatMessage({ id: 'category' })}
                    sx={{ '.MuiSelect-select': { display: 'flex', alignItems: 'center' } }}
                    {...field}
                    value={field.value}
                  >
                    {Object.values(taskCategoryOptions).map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        <Iconify icon={option.icon} sx={{ mr: 1 }} />
                        <ListItemText primary={option.text} />
                      </MenuItem>
                    ))}
                  </RHFSelect>
                )}
              />

              <Controller
                name="due_date"
                render={({ field, fieldState: { error } }) => (
                  <MobileDateTimePicker
                    label={intl.formatMessage({ id: 'due-date' })}
                    {...field}
                    value={new Date(field.value)}
                  />
                )}
              />

              <Controller
                name="alert"
                render={({ field, fieldState: { error } }) => (
                  <RHFSelect
                    label={intl.formatMessage({ id: 'alert' })}
                    sx={{ '.MuiSelect-select': { display: 'flex', alignItems: 'center' } }}
                    {...field}
                    value={field.value}
                  >
                    {Object.values(alertOptions).map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.text}
                      </MenuItem>
                    ))}
                  </RHFSelect>
                )}
              />

              <Controller
                name="assignto"
                render={({ field, fieldState: { error } }) => (
                  <RHFSelect
                    label={intl.formatMessage({ id: 'assign-to' })}
                    sx={{ '.MuiSelect-select': { display: 'flex', alignItems: 'center' } }}
                    {...field}
                    value={field.value}
                  >
                    {Object.values(users)
                      .filter((user) => user?.app ?? '' == 'staff')
                      .map((option) => (
                        <MenuItem key={option.user_guid} value={option.user_guid}>
                          {option.full_name}({option.email})
                        </MenuItem>
                      ))}
                  </RHFSelect>
                )}
              />

              <Controller
                name="task_description"
                render={({ field, fieldState: { error } }) => (
                  <RHFTextField
                    label={intl.formatMessage({ id: 'task-description' })}
                    multiline
                    {...field}
                    value={field.value}
                  />
                )}
              />
            </Box>
          </DialogContent>

          <DialogActions sx={{ justifyContent: 'space-between' }}>
            <Button
              type="submit"
              color="inherit"
              size="large"
              variant="contained"
              sx={{ width: 'auto', mr: 'auto' }}
            >
              <FormattedMessage id="save-changes" />
            </Button>
            {handleCloseEditRow && (
              <Button variant="outlined" size="large" color="inherit" onClick={handleCloseEditRow}>
                <FormattedMessage id="close" />
              </Button>
            )}
          </DialogActions>
        </FormProvider>
      </Dialog>
    </ProfileLayout>
  );
};

export default Tasks;
