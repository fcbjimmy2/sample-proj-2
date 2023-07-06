
// @mui
import { Box, Stack } from '@mui/material';
import { useIntl } from 'react-intl';

// ----------------------------------------------------------------------

const RegistrationSubmitted = () => {  
    const intl = useIntl();

    return (
      <Box>
        <Stack direction="row" justifyContent="center" sx={{ mx: 1 }}>
          {intl.formatMessage({id: 'Submit successfully'})}
        </Stack>
      </Box>
    );
  }
  
  export default RegistrationSubmitted;