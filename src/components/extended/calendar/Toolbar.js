import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// material-ui
import { Button, ButtonGroup, Grid, IconButton, Stack, Tooltip, Typography, useMediaQuery } from '@mui/material';

// third-party
import { useIntl, FormattedMessage } from 'react-intl';

// assets
import Iconify from '../../Iconify';

// constant
const viewOptions = (intl) => [
    {
        label: intl.formatMessage({id: 'month'}),
        value: 'dayGridMonth',
        icon: "tabler:layout-grid"
    },
    {
        label: intl.formatMessage({id: 'week'}),
        value: 'timeGridWeek',
        icon: "tabler:template"
    },
    {
        label: intl.formatMessage({id: 'day'}),
        value: 'timeGridDay',
        icon: "tabler:layout-list"
    },
    {
        label: intl.formatMessage({id: 'agenda'}),
        value: 'listWeek',
        icon: "tabler:list-numbers"
    }
];

// ==============================|| CALENDAR TOOLBAR ||============================== //

const Toolbar = ({ date, view, onClickNext, onClickPrev, onClickToday, onChangeView, ...others }) => {
    const intl = useIntl();
    const matchSm = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const [newViewOption, setNewViewOption] = useState(viewOptions(intl));

    useEffect(() => {
        let newOption = viewOptions(intl);
        if (matchSm) {
            newOption = viewOptions(intl).filter((options) => options.value !== 'dayGridMonth' && options.value !== 'timeGridWeek');
        }
        setNewViewOption(newOption);
    }, [matchSm]);

    return (
        <Grid alignItems="center" container justifyContent="space-between" spacing={3} {...others} sx={{ pb: 3 }}>
            <Grid item>
                <Button variant="outlined" onClick={onClickToday}>
                    <FormattedMessage id="today" />
                </Button>
            </Grid>
            <Grid item>
                <Stack direction="row" alignItems="center" spacing={3}>
                    <IconButton onClick={onClickPrev} size="large">
                        <Iconify icon="material-symbols:chevron-left" />
                    </IconButton>
                    <Typography variant="h3" color="textPrimary">
                        {intl.formatDate(date, {month: "long", year: "numeric"})}
                    </Typography>
                    <IconButton onClick={onClickNext} size="large">
                        <Iconify icon="material-symbols:chevron-right" />
                    </IconButton>
                </Stack>
            </Grid>
            <Grid item>
                <ButtonGroup variant="outlined" aria-label="outlined button group">
                    {newViewOption.map((viewOption) => {
                        return (
                            <Tooltip title={viewOption.label} key={viewOption.value}>
                                <Button
                                    disableElevation
                                    variant={viewOption.value === view ? 'contained' : 'outlined'}
                                    onClick={() => onChangeView(viewOption.value)}
                                >
                                    <Iconify icon={viewOption.icon} stroke="2" size="20px" />
                                </Button>
                            </Tooltip>
                        );
                    })}
                </ButtonGroup>
            </Grid>
        </Grid>
    );
};
Toolbar.propTypes = {
    date: PropTypes.object,
    view: PropTypes.string,
    onClickNext: PropTypes.func,
    onClickPrev: PropTypes.func,
    onClickToday: PropTypes.func,
    onChangeView: PropTypes.func
};

export default Toolbar;
