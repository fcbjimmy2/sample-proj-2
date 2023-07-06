import PropTypes from 'prop-types';
// @mui
import { Box, Switch, TablePagination, FormControlLabel } from '@mui/material';

// third-party
import { useIntl } from 'react-intl';
// ----------------------------------------------------------------------

TablePaginationCustom.propTypes = {
  dense: PropTypes.bool,
  onChangeDense: PropTypes.func,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  sx: PropTypes.object,
};

export default function TablePaginationCustom({
  dense,
  onChangeDense,
  rowsPerPageOptions = [5, 10, 25],
  sx,
  ...other
}) {
  const intl = useIntl();
  return (
    <Box sx={{ position: 'relative', ...sx }}>
      <TablePagination rowsPerPageOptions={rowsPerPageOptions} component="div" labelRowsPerPage={intl.formatMessage({id: 'Table-RowsPerPage'})} {...other} />

      {onChangeDense && (
        <FormControlLabel
          label={intl.formatMessage({id: 'Table-Dense'})}
          control={<Switch checked={dense} onChange={onChangeDense} />}
          sx={{
            pl: 2,
            py: 1.5,
            top: 0,
            position: {
              sm: 'absolute',
            },
          }}
        />
      )}
    </Box>
  );
}
