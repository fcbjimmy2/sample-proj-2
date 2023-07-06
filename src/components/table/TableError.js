import PropTypes from 'prop-types';
// icon
import rotate360 from '@iconify/icons-carbon/rotate-360';
// @mui
import { useTheme } from '@mui/material/styles';
import { Button, TableRow, TableCell } from '@mui/material';
// components
import Iconify from '../Iconify';
//
import EmptyContent from '../empty-content';
// third-party
import { useIntl } from 'react-intl';
// ----------------------------------------------------------------------

TableError.propTypes = {
  isError: PropTypes.bool,
  handleReload: PropTypes.func
};

export default function TableError({ isError, handleReload }) {
  const intl = useIntl();

  const theme = useTheme();

  const isLight = theme.palette.mode === 'light';

  return (
    <TableRow>
      {isError ? (
        <TableCell colSpan={12}>
          <EmptyContent
            title={intl.formatMessage({id: 'unexpected-error-occurred'})}
            sx={{
              '& span.MuiBox-root': { height: 160 },
            }}
          />
          {handleReload && (
              <Button
                variant="outlined"
                size="large"
                color="inherit"
                startIcon={<Iconify icon={rotate360} sx={{ width: 20, height: 20 }} />}
                onClick={handleReload}
                sx={{
                  ...(!isLight && { color: 'common.white' }),
                }}
              >
                {intl.formatMessage({id: 'Reload'})}
              </Button>
            )}
        </TableCell>
      ) : (
        <TableCell colSpan={12} sx={{ p: 0 }} />
      )}
    </TableRow>
  );
}
