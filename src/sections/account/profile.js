import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import { useIntl, FormattedDate, FormattedMessage, FormattedTime } from 'react-intl';
// @mui
import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers';
import { Box, Checkbox, FormControl, FormControlLabel, FormLabel, ListItemText, MenuItem, Select, Stack, TableCell, TableRow, TextField, Typography, IconButton, InputAdornment } from '@mui/material';
// components
import Iconify from '../../components/Iconify';
import FormProvider, { RHFTextField, RHFSelect, RHFSlider } from '../../components/hook-form';
import { Upload } from '../../components/upload';
import DataTable from '../../components/extended/DataTable_OLD';
// utils
import axios from '../../utils/axios';
//
import ProfileLayout from '../../sections/account/layout';
import { froalaEditorConfigWithoutMath } from '../../config';

// import FroalaEditorComponent from 'react-froala-wysiwyg';
const FroalaEditorComponent = dynamic(
  async () => {
      const values = await Promise.all([
          import("react-froala-wysiwyg")
      ]);
      return values[0];
  },
  {
      ssr: false
  }
);

// ----------------------------------------------------------------------

const TAG_OPTIONS = ['Customer', 'Lead', 'Newcomer', 'Staff', 'Supplier', 'doClever'];

const CATEGORY_OPTIONS = {
  note: {
    icon: 'carbon:document',
    text: 'Note',
  },
  email: {
    icon: 'carbon:email',
    text: 'Email',
  },
  phone: {
    icon: 'carbon:phone',
    text: 'Phone call',
  },
  appointment: {
    icon: 'carbon:timer',
    text: 'Appointment',
  },
};

// ----------------------------------------------------------------------

const Profile = ({ id }) => {
  const intl = useIntl();

  const [user, setUser] = useState(null);

  const [showAttachment, setShowAttachment] = useState(true);

  const Schema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    emailAddress: Yup.string().required('Email address is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    birthday: Yup.string().required('Birthday is required'),
    gender: Yup.string().required('Gender is required'),
    streetAddress: Yup.string().required('Street address is required'),
    city: Yup.string().required('City is required'),
    zipCode: Yup.string().required('Zip code is required'),
  });

  const defaultValues = {
    firstName: 'Jayvion',
    lastName: 'Simon',
    emailAddress: 'nannie_abernathy70@yahoo.com',
    phoneNumber: '365-374-4961',
    birthday: null,
    gender: 'Male',
    streetAddress: '',
    zipCode: '',
    city: '',
    country: 'United States',
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  };

  const temperatureLevelLabelFormat = (number) => {
    var map = ['', 'Cold', 'Warm', 'Hot'];
    return map[number]??null;
  };
    
  const [preview, setPreview] = useState(false);

  const [files, setFiles] = useState([]);

  const handleDropMultiFile = useCallback(
    (acceptedFiles) => {
      setFiles([
        ...files,
        ...acceptedFiles.map((newFile) =>
          Object.assign(newFile, {
            preview: URL.createObjectURL(newFile),
          })
        ),
      ]);
    },
    [files]
  );

  const handleRemoveFile = (inputFile) => {
    const filesFiltered = files.filter((fileFiltered) => fileFiltered !== inputFile);
    setFiles(filesFiltered);
  };

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };

  useEffect(() => {
    axios.get(`/api/user/${id}/`).then((response) => {
      setUser(response.data);
    });
  }, []);

  return (
    <ProfileLayout value={user}>
      <FormProvider methods={methods}>
        <Box
          rowGap={2.5}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(1, 50%)' }}
          sx={{mb: 2.5}}
        >
          <Typography variant="h5"><FormattedMessage id="profile"/></Typography>
          <FormControl>
            <FormLabel><FormattedMessage id="temperature-level"/></FormLabel>
            <RHFSlider
              name="temperatureLevel"
              step={1}
              max={3}
              getAriaValueText={temperatureLevelLabelFormat}
              valueLabelFormat={temperatureLevelLabelFormat}
              valueLabelDisplay="auto"
              aria-labelledby="non-linear-slider"
            />
          </FormControl>

          <RHFSelect name="tag" label={intl.formatMessage({id: "tag"})}>
            {TAG_OPTIONS.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </RHFSelect>

          <FormControl>
            <FormLabel><FormattedMessage id="contact-manager"/></FormLabel>
            {"{contact-manager}"}
          </FormControl>

          <FormControl>
            <FormLabel><FormattedMessage id="creation-date"/></FormLabel>
            <FormattedTime value={user?.created_date} day="numeric" month="long" year="numeric" />
          </FormControl>

          <LoadingButton
            color="inherit"
            size="large"
            type="button"
            variant="contained"
            disabled
          >
            <FormattedMessage id="make-out-an-invoice"/>
          </LoadingButton>
        </Box>
      </FormProvider>
      
        
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box
          rowGap={2.5}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(1, 1fr)' }}
        >
          <Typography variant="h5"><FormattedMessage id="history"/></Typography>
            <Box
              rowGap={2.5}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(5, 1fr)' }}
            >
              <RHFSelect name="category" label={intl.formatMessage({id: "category"})} sx={{".MuiSelect-select": {display: "flex", alignItems: "center"}}}>
                {Object.values(CATEGORY_OPTIONS).map((option) => (
                  <MenuItem key={option.text} value={option.text}>
                    <Iconify icon={option.icon} sx={{mr: 1}} />
                    <ListItemText primary={option.text} />
                  </MenuItem>
                ))}
              </RHFSelect>

              <DatePicker
                name="date"
                label={intl.formatMessage({id: "date"})}
                format="dd/MM/yyyy"
              />

              <RHFSelect name="linkType" label={intl.formatMessage({id: "link-with"})}>
                <MenuItem key="opportunity" value="Opportunity">{intl.formatMessage({id: "opportunity"})}</MenuItem>
              </RHFSelect>
            </Box>
            
            <FroalaEditorComponent config={{
              ...froalaEditorConfigWithoutMath,
            }} />

            <RHFSelect name="notifyUser" label={intl.formatMessage({id: 'notify-user'})} sx={{minWidth: "150px", width: "auto", mr: "auto"}}>
              <MenuItem key="Ophe Chan" value="Ophe Chan">Ophe Chan</MenuItem>
            </RHFSelect>

            <FormControlLabel control={<Checkbox name="attachmentToggle" checked={!showAttachment} />} label={intl.formatMessage({id: "hide-file-attachment-panel"})} onChange={(e) => {setShowAttachment(!e.target.checked)}} />

            {showAttachment && (
              <Upload
                multiple
                thumbnail={preview}
                files={files}
                onDrop={handleDropMultiFile}
                onRemove={handleRemoveFile}
                onRemoveAll={handleRemoveAllFiles}
                onUpload={() => console.log('ON UPLOAD')}
              />
            )}

            <LoadingButton
              color="inherit"
              size="large"
              type="submit"
              variant="contained"
              sx={{width: "auto", mr: "auto"}}
              disabled
            >
              <FormattedMessage id="add-this-event"/>
            </LoadingButton>
            
            <DataTable hideHeader url="" renderRow={(row, index) => {
              return (
                <TableRow
                    hover
                    tabIndex={-1}
                    key={index}
                >
                  <TableCell>
                    <Iconify icon={CATEGORY_OPTIONS[row.category]?.icon??''} />
                  </TableCell>
                  <TableCell>
                    <div>{row.content??''}</div>
                    <FormControl>
                      <FormLabel><FormattedDate value={row.date} day="numeric" month="long" year="numeric" /> {intl.formatMessage({id: "author"})} {row.author??''}</FormLabel>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <IconButton aria-label="delete">
                      <Iconify icon="carbon:delete" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            }} before={
              <Stack sx={{ p: 3, flexDirection: "row", gap: 3 }}>
                <TextField
                  id="q"
                  name="q"
                  placeholder={intl.formatMessage({id: 'search'})}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                      </InputAdornment>
                    ),
                  }}
                  size="small"
                  sx={{ mr: "auto" }}
                />
                <RHFSelect name="orderBy" label={intl.formatMessage({id: "sort-by"})} size="small" sx={{minWidth: "150px", ml: "auto"}}>
                  <MenuItem key="date" value="date">Date</MenuItem>
                  <MenuItem key="author" value="author">Author</MenuItem>
                  <MenuItem key="content" value="content">Content</MenuItem>
                  <MenuItem key="category" value="category">Category</MenuItem>
                </RHFSelect>
              </Stack>
            } data={[
              {
                category: "email",
                date: "5/10/2023",
                author: "Administrator",
                content: "Assigned task",
              }
            ]} />
        </Box>
      </FormProvider>
    </ProfileLayout>
  );
}

export default Profile;