import * as React from 'react';

// project imports
import DataTable from '../../../../src/components/extended/DataTable_OLD';

// third-party
import { useIntl } from 'react-intl';
import { Stack, TextField, InputAdornment } from '@mui/material';
import Iconify from '../../../../src/components/Iconify';

export default function ClaimTable({status}) {
    const intl = useIntl();

    // table header
    let headers = {};
    ['reference', 'applicant', 'apply-date', 'total-amount', 'remarks'].forEach((header) => {
        headers[header] = intl.formatMessage({id: header});
    });

    return (
        <DataTable headers={headers} url="" args={{status: status}} renderRow={() => {}} before={
            <Stack sx={{ p: 3 }}>
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
                    sx={{ marginLeft: "auto" }}
                />
            </Stack>
        } />
    );
}
