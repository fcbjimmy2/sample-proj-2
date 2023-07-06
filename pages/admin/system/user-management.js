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

const UserManagement = () => {
    const intl = useIntl();

    const default_commission = {
        min_student: 0,
        max_student: 0,
        basic: 0,
        commission: 0,
        bonus: 0,
    };

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [modalData, setModalData] = React.useState(null);
    const [commissions, setCommissions] = React.useState([{...default_commission}]);
  
    const handleRowClick = (row) => {
        setModalData(row);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleCommissionAdd = () => {
        setCommissions([...commissions, {...default_commission}]);
    };

    const handleCommissionDelete = (index) => {
        setCommissions(commissions.filter((commission, _index) => _index != index));
    };

    const handleCommissionChange = (index, key, value) => {
        let _commissions = [...commissions];
        _commissions[index][key] = value;
        setCommissions(_commissions);
    }

    const branch_codes = [
        'CCBC-CC',
        'CCBC-CEC',
    ];

    const approver_leaves = [
        'admin',
        'test',
    ];

    const approver_claims = [
        'admin',
        'test',
    ];

    // table header
    let headers = {};
    ['user-code', 'user-role', 'login-id', 'name', 'email', 'last-login', 'create-date'].forEach((header) => {
        headers[header] = intl.formatMessage({id: header});
    });

    return (
        <>
            <DataTable headers={headers} url="" title={intl.formatMessage({id: "user-management"})} args={{}} renderRow={() => {}} before={
                <Stack direction="row" alignItems="center" gap={3} sx={{ p: 3 }}>
                    <Button color="secondary" onClick={setIsModalOpen} variant="contained" sx={{ height: "min-content" }}>
                        <FormattedMessage id="add-new-user" />
                    </Button>
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
            <Dialog
                open={isModalOpen}
                onClose={handleModalClose}
                maxWidth="lg"
                fullWidth
            >
                <DialogContent>
                    <Stack container spacing={3} sx={{ py: 3 }}>
                        <TextField id="user-code" name="user-code" label={intl.formatMessage({id: 'user-code'})} fullWidth />
                        <TextField id="login-id" name="login-id" label={intl.formatMessage({id: 'login-id'})} fullWidth />
                        <TextField id="password" name="password" type="password" label={intl.formatMessage({id: 'password'})} fullWidth />
                        <TextField id="name" name="name" label={intl.formatMessage({id: 'name'})} fullWidth />
                        <TextField id="email" name="email" type="email" label={intl.formatMessage({id: 'email'})} fullWidth />
                        <TextField id="mobile" name="mobile" type="phone" label={intl.formatMessage({id: 'mobile'})} fullWidth />
                        <FormControl sx={{ minWidth: 120 }}>
                            <InputLabel id="branch-code">{intl.formatMessage({id: "branch-code"})}</InputLabel>
                            <Select
                                value={[]}
                                labelId="branch-code"
                                id="branch-code"
                                name="branch-code"
                                label={intl.formatMessage({id: "branch-code"})}
                                multiple
                            >
                                {branch_codes.map((branch_code, index) => (
                                    <MenuItem key={index} value={branch_code}>{branch_code}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel><FormattedMessage id="user-role" /></FormLabel>
                            <RadioGroup
                                row
                                id="user-role"
                                name="user-role"
                            >
                                <FormControlLabel value="admin" control={<Radio />} label={intl.formatMessage({id: 'admin'})} />
                                <FormControlLabel value="teacher" control={<Radio />} label={intl.formatMessage({id: 'teacher'})} />
                                <FormControlLabel value="staff" control={<Radio />} label={intl.formatMessage({id: 'staff'})} />
                            </RadioGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel><FormattedMessage id="additional-roles" /></FormLabel>
                            <FormGroup row>
                                <FormControlLabel control={<Checkbox defaultChecked />} label={intl.formatMessage({id: 'user-manager'})} />
                                <FormControlLabel control={<Checkbox defaultChecked />} label={intl.formatMessage({id: 'product-manager'})} />
                                <FormControlLabel control={<Checkbox defaultChecked />} label={intl.formatMessage({id: 'leaves-approver'})} />
                                <FormControlLabel control={<Checkbox defaultChecked />} label={intl.formatMessage({id: 'claims-approver'})} />
                            </FormGroup>
                        </FormControl>
                        <FormControl sx={{ minWidth: 120 }}>
                            <InputLabel id="approver-leave">{intl.formatMessage({id: "approver-leave"})}</InputLabel>
                            <Select
                                value={approver_leaves[0]}
                                labelId="approver-leave"
                                id="approver-leave"
                                name="approver-leave"
                                label={intl.formatMessage({id: "approver-leave"})}
                            >
                                {approver_leaves.map((approver_leave, index) => (
                                    <MenuItem key={index} value={approver_leave}>{approver_leave}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ minWidth: 120 }}>
                            <InputLabel id="approver-claim">{intl.formatMessage({id: "approver-claim"})}</InputLabel>
                            <Select
                                value={approver_claims[0]}
                                labelId="approver-claim"
                                id="approver-claim"
                                name="approver-claim"
                                label={intl.formatMessage({id: "approver-claim"})}
                            >
                                {approver_claims.map((approver_claim, index) => (
                                    <MenuItem key={index} value={approver_claim}>{approver_claim}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <DatePicker id="employed-date" name="employed-date" label={intl.formatMessage({id: 'employed-date'})} />
                        <TextField id="employment-type" name="employment-type" label={intl.formatMessage({id: 'employment-type'})} fullWidth />
                        <TextField id="monthly-salary" name="monthly-salary" type="number" label={intl.formatMessage({id: 'monthly-salary'})} fullWidth />
                        <TextField id="mpf-employee" name="mpf-employee" type="number" label={intl.formatMessage({id: 'mpf-employee'})} fullWidth />
                        <TextField id="mpf-employer" name="mpf-employer" type="number" label={intl.formatMessage({id: 'mpf-employer'})} fullWidth />
                        <FormControl sx={{ gap: 3 }}>
                            <FormLabel>{intl.formatMessage({id: "commission"})}</FormLabel>
                            {commissions.map((commission, index) => (
                                <Stack key={index} alignItems="center" sx={{ flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
                                    {Object.entries(commission).map(([key, value]) => (
                                        <TextField key={key} id={key} name={key} label={intl.formatMessage({id: key})} value={value} onChange={(e) => handleCommissionChange(index, key, e.target.value)} />
                                    ))}
                                    <IconButton onClick={() => handleCommissionDelete(index)} sx={{ height: "min-content" }}>
                                        <Iconify icon="mdi:trash-outline" />
                                    </IconButton>
                                </Stack>
                            ))}
                        </FormControl>
                        <div>
                            <Button onClick={handleCommissionAdd} variant="contained">
                                <FormattedMessage id="add" />
                            </Button>
                        </div>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleModalClose} variant="contained">
                        <FormattedMessage id="save" />
                    </Button>
                    <Button onClick={handleModalClose} variant="contained" color="error">
                        <FormattedMessage id="delete" />
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default UserManagement;

// ----------------------------------------------------------------------

UserManagement.getLayout = function getLayout(page) {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    );
};