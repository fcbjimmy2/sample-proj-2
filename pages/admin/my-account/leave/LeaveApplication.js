import React from 'react';

// material-ui
import { Button, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

// project imports
import AffectedCourseTable from './AffectedCourseTable';

// third-party
import { useIntl } from 'react-intl';

const LeaveApplication = () => {
    const intl = useIntl();
    const leave_types = [
        'annual-leave',
        'no-pay-leave',
    ];

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <DatePicker id="start" name="start" label={intl.formatMessage({id: 'start'})} sx={{ width: "100%" }} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <RadioGroup
                        row
                        aria-label="start_period"
                        name="start_period"
                        id="start_period"
                    >
                        <FormControlLabel
                            value="am"
                            control={
                                <Radio />
                            }
                            label={intl.formatMessage({id: "am"})}
                        />
                        <FormControlLabel
                            value="pm"
                            control={
                                <Radio />
                            }
                            label={intl.formatMessage({id: "pm"})}
                        />
                    </RadioGroup>
                </Grid>
                <Grid item xs={12} md={6}>
                    <DatePicker id="end" name="end" label={intl.formatMessage({id: 'end'})} sx={{ width: "100%" }} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <RadioGroup
                        row
                        aria-label="end_period"
                        name="end_period"
                        id="end_period"
                    >
                        <FormControlLabel
                            value="am"
                            control={
                                <Radio />
                            }
                            label={intl.formatMessage({id: "am"})}
                        />
                        <FormControlLabel
                            value="pm"
                            control={
                                <Radio />
                            }
                            label={intl.formatMessage({id: "pm"})}
                        />
                    </RadioGroup>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl sx={{ minWidth: 120 }}>
                        <InputLabel id="leave-type">{intl.formatMessage({id: "leave-type"})}</InputLabel>
                        <Select
                            value={leave_types[0]}
                            labelId="leave-type"
                            id="leave-type"
                            name="leave-type"
                            label={intl.formatMessage({id: "leave-type"})}
                        >
                            {leave_types.map((leave_type, index) => (
                                <MenuItem key={index} value={leave_type}>{intl.formatMessage({id: leave_type})}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField id="remarks" name="remarks" label={intl.formatMessage({id: 'remarks'})} fullWidth multiline rows={3} />
                </Grid>
                <Grid item xs={12} md={6}>
                </Grid>
                <Grid item xs={12}>
                    <AffectedCourseTable />
                </Grid>
                <Grid item>
                    <Button variant="contained" type="submit">
                        {intl.formatMessage({id: 'submit'})}
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default LeaveApplication;
