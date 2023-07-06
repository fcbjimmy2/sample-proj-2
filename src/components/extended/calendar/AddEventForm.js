import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers';
import '@mui/lab';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// third-party
import _ from 'lodash';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { useIntl, FormattedMessage } from 'react-intl';

// project imports
import ColorPalette from './ColorPalette';

// icons
import DateRangeIcon from '@mui/icons-material/DateRange';

// constant
const getInitialValues = (event, range) => {
  const newEvent = {
    title: '',
    description: '',
    color: '#2196f3',
    textColor: '',
    allDay: false,
    start: range ? new Date(range.start) : new Date(),
    end: range ? new Date(range.end) : new Date(),
  };

  if (event || range) {
    return _.merge({}, newEvent, event);
  }

  return newEvent;
};

// ==============================|| CALENDAR EVENT ADD / EDIT / DELETE ||============================== //

const AddEventFrom = ({ event, range, handleDelete, handleCreate, handleUpdate, onCancel }) => {
  const theme = useTheme();
  const intl = useIntl();
  const isCreating = !event;

  const backgroundColor = [
    {
      value: theme.palette.primary.main,
      color: 'primary.main',
      label: intl.formatMessage({ id: 'default' }),
    },
    {
      value: theme.palette.error.main,
      color: 'error.main',
    },
    {
      value: theme.palette.success.dark,
      color: 'success.dark',
    },
    {
      value: theme.palette.secondary.main,
      color: 'secondary.main',
    },
    {
      value: theme.palette.warning.dark,
      color: 'warning.dark',
    },
    {
      value: theme.palette.grey[500],
      color: 'grey.500',
    },
    {
      value: theme.palette.primary.light,
      color: 'primary.light',
    },
    {
      value: theme.palette.error.light,
      color: 'error.light',
    },
    {
      value: theme.palette.success.light,
      color: 'success.light',
    },
    {
      value: theme.palette.secondary.light,
      color: 'secondary.light',
    },
    {
      value: theme.palette.warning.light,
      color: 'warning.light',
    },
  ];

  const textColor = [
    {
      value: theme.palette.error.light,
      color: 'error.light',
      label: '',
    },
    {
      value: theme.palette.success.light,
      color: 'success.light',
      label: '',
    },
    {
      value: theme.palette.secondary.light,
      color: 'secondary.light',
      label: '',
    },
    {
      value: theme.palette.warning.light,
      color: 'warning.light',
      label: '',
    },
    {
      value: theme.palette.primary.light,
      color: 'primary.light',
      label: '',
    },
    {
      value: theme.palette.primary.main,
      color: 'primary.main',
      label: '',
    },
    {
      value: theme.palette.error.main,
      color: 'error.main',
      label: '',
    },
    {
      value: theme.palette.success.dark,
      color: 'success.dark',
      label: '',
    },
    {
      value: theme.palette.secondary.main,
      color: 'secondary.main',
      label: '',
    },
    {
      value: theme.palette.warning.dark,
      color: 'warning.dark',
      label: '',
    },
    {
      value: theme.palette.grey[500],
      color: 'grey.500',
      label: '',
    },
  ];

  const EventSchema = Yup.object().shape({
    title: Yup.string().max(255).required('Title is required'),
    description: Yup.string().max(5000),
    end: Yup.date().when(
      'start',
      (start, schema) => start && schema.min(start, 'End date must be later than start date')
    ),
    start: Yup.date(),
    color: Yup.string().max(255),
    textColor: Yup.string().max(255),
  });

  const formik = useFormik({
    initialValues: getInitialValues(event, range),
    validationSchema: EventSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const data = {
          title: values.title,
          description: values.description,
          color: values.color,
          textColor: values.textColor,
          allDay: values.allDay,
          start: values.start,
          end: values.end,
        };

        if (event) {
          handleUpdate(event.id, data);
        } else {
          handleCreate(data);
        }

        resetForm();
        onCancel();
        setSubmitting(false);
      } catch (error) {
        console.error(error);
      }
    },
  });

  const { values, errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } =
    formik;

  return (
    <FormikProvider value={formik}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <DialogTitle>
            {event
              ? intl.formatMessage({ id: 'edit-event' })
              : intl.formatMessage({ id: 'add-event' })}
          </DialogTitle>
          <Divider />
          <DialogContent sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={intl.formatMessage({ id: 'title' })}
                  {...getFieldProps('title')}
                  error={Boolean(touched.title && errors.title)}
                  helperText={touched.title && errors.title}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label={intl.formatMessage({ id: 'description' })}
                  {...getFieldProps('description')}
                  error={Boolean(touched.description && errors.description)}
                  helperText={touched.description && errors.description}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch checked={values.allDay} {...getFieldProps('allDay')} />}
                  label={intl.formatMessage({ id: 'all-day' })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <MobileDateTimePicker
                  label={intl.formatMessage({ id: 'start-date' })}
                  value={values.start}
                  inputFormat="dd/MM/yyyy hh:mm a"
                  onChange={(date) => setFieldValue('start', date)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <DateRangeIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <MobileDateTimePicker
                  label={intl.formatMessage({ id: 'end-date' })}
                  value={values.end}
                  inputFormat="dd/MM/yyyy hh:mm a"
                  onChange={(date) => setFieldValue('end', date)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={Boolean(touched.end && errors.end)}
                      helperText={touched.end && errors.end}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <DateRangeIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">
                      <FormattedMessage id="background-color" />
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl>
                      <RadioGroup
                        row
                        aria-label="color"
                        {...getFieldProps('color')}
                        onChange={(e) => setFieldValue('color', e.target.value)}
                        name="color-radio-buttons-group"
                        sx={{ '& .MuiFormControlLabel-root': { mr: 0 } }}
                      >
                        {backgroundColor.map((item, index) => (
                          <ColorPalette
                            key={index}
                            value={item.value}
                            color={item.color}
                            label={item.label}
                          />
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">
                      <FormattedMessage id="text-color" />
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl component="fieldset">
                      <RadioGroup
                        row
                        aria-label="textColor"
                        {...getFieldProps('textColor')}
                        onChange={(e) => setFieldValue('textColor', e.target.value)}
                        name="text-color-radio-buttons-group"
                        sx={{ '& .MuiFormControlLabel-root': { mr: 0 } }}
                      >
                        <FormControlLabel
                          value=""
                          control={<Radio color="default" />}
                          label={intl.formatMessage({ id: 'default' })}
                          sx={{ pr: 1 }}
                        />
                        {textColor.map((item, index) => (
                          <ColorPalette
                            key={index}
                            value={item.value}
                            color={item.color}
                            label={item.label}
                          />
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions sx={{ p: 3 }}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Button type="button" variant="outlined" onClick={onCancel}>
                    <FormattedMessage id="cancel" />
                  </Button>
                  <Button type="submit" variant="contained" disabled={isSubmitting}>
                    {event ? intl.formatMessage({ id: 'edit' }) : intl.formatMessage({ id: 'add' })}
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </DialogActions>
        </Form>
      </LocalizationProvider>
    </FormikProvider>
  );
};

AddEventFrom.propTypes = {
  event: PropTypes.object,
  range: PropTypes.object,
  handleDelete: PropTypes.func,
  handleCreate: PropTypes.func,
  handleUpdate: PropTypes.func,
  onCancel: PropTypes.func,
};

export default AddEventFrom;
