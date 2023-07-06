import React from 'react';

// material-ui
import { Button, Card, Stack, Typography } from '@mui/material';

// layouts
import AdminLayout from '../../../../src/layouts/admin';

// third-party
import { useIntl, FormattedTime } from 'react-intl';

const Attend = () => {
    const intl = useIntl();
    const [working, setWorking] = React.useState(true);
    const [currentTime, setCurrentTime] = React.useState(new Date());

    React.useEffect(() => {
        setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
    }, []);

    return (
        <Stack gap={3}>
            <Card sx={{p: 3}}>
                <Typography variant="h6">
                {intl.formatMessage({id: 'attend'})}
                </Typography>
            </Card>
            <Card sx={{display: "flex", flexDirection: 'column', gap: 2, width: "50%", minWidth: 500, mx: "auto", p: 2, textAlign: "center"}}>
                <Typography variant="h1">
                    <FormattedTime value={currentTime} hour="numeric" minute="numeric" second="numeric" />
                </Typography>
                {working && (
                <Button variant="contained" type="submit" onClick={() => setWorking(false)}>
                    {intl.formatMessage({id: 'Punch OUT'})}
                </Button>
                )}
                {!working && (
                <Button variant="contained" type="submit" onClick={() => setWorking(true)}>
                    {intl.formatMessage({id: 'Punch IN'})}
                </Button>
                )}
            </Card>
        </Stack>
    );
};

export default Attend;

// ----------------------------------------------------------------------

Attend.getLayout = function getLayout(page) {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  );
};
