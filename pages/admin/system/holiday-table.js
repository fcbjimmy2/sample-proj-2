import React from 'react';

// layouts
import AdminLayout from '../../../src/layouts/admin';

// project imports
import DataTable from '../../../src/components/extended/DataTable_OLD';

// third-party
import { useIntl, FormattedMessage } from 'react-intl';
import {
    Button,
    Checkbox,
    Dialog,
    DialogContent,
    DialogActions,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Radio,
    RadioGroup,
    MenuItem,
    Select,
    Stack,
    TextField,
    IconButton,
    InputAdornment,
    InputLabel,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import Iconify from '../../../src/components/Iconify';

const HolidayTable = () => {
    const intl = useIntl();

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [modalData, setModalData] = React.useState(null);
    const [year, setYear] = React.useState(new Date());
  
    const handleRowClick = (row) => {
        setModalData(row);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    // table header
    let headers = {};
    ['date', 'description-en', 'description-ch', 'action'].forEach((header) => {
        headers[header] = intl.formatMessage({id: header});
    });

    return (
        <>
            <DataTable headers={headers} url="" title={intl.formatMessage({id: "holiday-table"})} args={{year: year.getFullYear()}} renderRow={() => {}} before={
                <Stack direction="row" alignItems="center" gap={3} sx={{ p: 3 }}>
                    <Button color="secondary" onClick={setIsModalOpen} variant="contained" sx={{ height: "min-content" }}>
                        <FormattedMessage id="add" />
                    </Button>
                    <DatePicker views={["year"]} id="year" name="year" value={year} onYearChange={(date) => setYear(date)} label={intl.formatMessage({id: 'year'})} sx={{ marginLeft: "auto" }} />
                </Stack>
            } />
            <Dialog
                open={isModalOpen}
                onClose={handleModalClose}
                maxWidth="lg"
                fullWidth
            >
                <DialogContent>
                    <Stack container spacing={3} sx={{ py: 3 }}>
                        <DatePicker id="date" name="date" label={intl.formatMessage({id: 'date'})} />
                        <TextField id="description-en" name="description-en" label={intl.formatMessage({id: 'description-en'})} fullWidth />
                        <TextField id="description-ch" name="description-ch" label={intl.formatMessage({id: 'description-ch'})} fullWidth />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleModalClose} variant="contained">
                        <FormattedMessage id="save" />
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default HolidayTable;

// ----------------------------------------------------------------------

HolidayTable.getLayout = function getLayout(page) {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    );
};