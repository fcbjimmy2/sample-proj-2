import PropTypes from 'prop-types';
// third-party
import { useIntl } from 'react-intl';
// @mui
import { Stack, InputAdornment, TextField, MenuItem, Button } from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------

MasterTableToolbar.propTypes = {
  isFiltered: PropTypes.bool,
  filterSearch: PropTypes.string,
  onFilterSearch: PropTypes.func,
  onResetFilter: PropTypes.func
};

export default function MasterTableToolbar({
  isFiltered,
  filterSearch,
  onFilterSearch,
  onResetFilter
}) {
  const intl = useIntl();

  return (
    <Stack
      spacing={2}
      alignItems="center"
      direction={{
        xs: 'column',
        sm: 'row',
      }}
      sx={{ px: 2.5, py: 3 }}
    >
      
      <TextField
        fullWidth
        value={filterSearch}
        onChange={onFilterSearch}
        placeholder={`${intl.formatMessage({id: 'search'})}...`}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
      />

      {isFiltered && (
        <Button
          color="error"
          sx={{ flexShrink: 0 }}
          onClick={onResetFilter}
          startIcon={<Iconify icon="eva:trash-2-outline" />}
        >
          Clear
        </Button>
      )}
    </Stack>
  );
}
