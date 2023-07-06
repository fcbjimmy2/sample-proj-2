import PropTypes from 'prop-types';
// @mui
import { TableRow, TableCell } from '@mui/material';
//
import EmptyContent from '../empty-content';
// third-party
import { useIntl } from 'react-intl';
// ----------------------------------------------------------------------

TableNoData.propTypes = {
  isNotFound: PropTypes.bool,
};

export default function TableNoData({ isNotFound }) {
  const intl = useIntl();

  return (
    <TableRow>
      {isNotFound ? (
        <TableCell colSpan={12}>
          <EmptyContent
            title={intl.formatMessage({id: 'Table-No Data'})}
            sx={{
              '& span.MuiBox-root': { height: 160 },
            }}
          />
        </TableCell>
      ) : (
        <TableCell colSpan={12} sx={{ p: 0 }} />
      )}
    </TableRow>
  );
}
