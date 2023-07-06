import React from 'react';

// layouts
import AdminLayout from '../../../src/layouts/admin';

// project imports
import MainCard from '../../../src/components/cards/MainCard';

// third-party
import { useIntl, FormattedMessage } from 'react-intl';
import {
    Button,
    Stack,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

const PayrollReport = () => {
    const intl = useIntl();

    return (
        <MainCard title={intl.formatMessage({id: 'payroll-report'})} boxShadow>
            <Stack container spacing={3} sx={{ py: 3 }}>
                <div>
                    <DatePicker id="start-date" name="start-date" label={intl.formatMessage({id: 'start-date'})} />
                </div>
                <div>
                    <DatePicker id="end-date" name="staendrt-date" label={intl.formatMessage({id: 'end-date'})} />
                </div>
                <div>
                    <Button variant="contained">
                        <FormattedMessage id="get-report" />
                    </Button>
                </div>
            </Stack>
        </MainCard>
    );
};

export default PayrollReport;

// ----------------------------------------------------------------------

PayrollReport.getLayout = function getLayout(page) {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    );
};