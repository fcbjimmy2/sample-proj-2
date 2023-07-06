import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import * as yup from 'yup';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// third-party
import { useIntl } from 'react-intl';
// @mui
import {
    Alert, 
    Stack, 
    Button, 
    Dialog, 
    DialogTitle, 
    DialogActions,
    MenuItem
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// utils
import axios from '../../../../utils/axios';
// components
import Iconify from '../../../../components/Iconify';
import FormProvider, { RHFTextField, RHFSelect } from '../../../../components/hook-form';

// ----------------------------------------------------------------------

MasterTableFormDialog.propTypes = {
    types: PropTypes.array,
    defaultType: PropTypes.string,
    masterData: PropTypes.object,
    open: PropTypes.bool,
    onCancel: PropTypes.func,
    onCreateUpdateEvent: PropTypes.func,
};

export default function MasterTableFormDialog({
    types, 
    defaultType, 
    masterData,
    open,
    onCancel,
    onCreateUpdateEvent
}) {
    const intl = useIntl();

    const hasMasterData = !!masterData;

    const EventSchema = yup.object().shape({
        value: yup.string().max(50).required(intl.formatMessage({id: 'This field is required'})),
        name: yup.string().max(50).required(intl.formatMessage({id: 'This field is required'})),
        lang_en: yup.string().max(50).required(intl.formatMessage({id: 'This field is required'})),
        lang_zh_hant: yup.string().max(50).required(intl.formatMessage({id: 'This field is required'})),
        lang_zh_hans: yup.string().max(50).required(intl.formatMessage({id: 'This field is required'}))
    });

    const methods = useForm({
        resolver: yupResolver(EventSchema), 
        defaultValues: {},
    });

    const {
      reset,
      setError,
      handleSubmit,
      formState: { errors, isSubmitting },
    } = methods;

    const onSubmit = async (data) => {
      try {
        const params = {
            name: data.name,
            value: data.value,
            en: data.lang_en,
            zh_hant: data.lang_zh_hant,
            zh_hans: data.lang_zh_hans,
        };
        if (hasMasterData) {
            await axios.put('/api/admin/master-tables/'+ masterData.idx, params);
        } else {
            await axios.post('/api/admin/master-tables', params);
        }
        onCreateUpdateEvent(params);
      } catch (error) {
        console.error(error);
        setError('afterSubmit', {
            message: error.message || error,
        });
      }
    };
    
    useEffect(() => {
        if (open) {
            if (hasMasterData) {
                reset(masterData);
            } else {
                reset({
                    value: '',
                    name: defaultType??'',
                    lang_en: '',
                    lang_zh_hant: '',
                    lang_zh_hans: ''
                });
            }            
        }
    }, [open]);

    return (
        <Dialog fullWidth maxWidth="xs" open={open}>
            <DialogTitle>{masterData ? intl.formatMessage({id: 'Edit Master'}) :  intl.formatMessage({id: 'Add Master'})}</DialogTitle>

            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3} sx={{ px: 3 }}>
                    {!!errors.afterSubmit && <Alert variant="filled" severity="error" sx={{ width: '100%' }}>{errors.afterSubmit.message}</Alert>}

                    <RHFTextField name="value" label={intl.formatMessage({id: 'id'})} disabled={hasMasterData || isSubmitting} />

                    <RHFSelect name="name" label={intl.formatMessage({id: 'Type'})} disabled={hasMasterData || isSubmitting}>
                        <MenuItem value="">&nbsp;</MenuItem>
                        {types.map((type) => (
                            <MenuItem key={type.value} value={type.value}>
                                {type.text}
                            </MenuItem>
                        ))}
                    </RHFSelect>

                    <RHFTextField name="lang_en" label={intl.formatMessage({id: 'english'})} disabled={isSubmitting} />

                    <RHFTextField name="lang_zh_hant" label={intl.formatMessage({id: 'traditional-chinese'})} disabled={isSubmitting} />

                    <RHFTextField name="lang_zh_hans" label={intl.formatMessage({id: 'simplified-chinese'})} disabled={isSubmitting} />

                </Stack>
                <DialogActions>
                    <Button variant="outlined" color="inherit" disabled={isSubmitting} onClick={()=>{onCancel()}}>
                        {intl.formatMessage({id: 'Cancel'})}
                    </Button>

                    <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                        {hasMasterData ? intl.formatMessage({id: 'Update'}) : intl.formatMessage({id: 'Add'})}
                    </LoadingButton>
                </DialogActions>

            </FormProvider>
        </Dialog>
    );
}
