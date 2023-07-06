import PropTypes from 'prop-types';
// @mui
import { TextField, InputAdornment } from '@mui/material';
// components
import Iconify from '../../../components/Iconify';
// third-party
import { useIntl } from 'react-intl';
// ----------------------------------------------------------------------

FileFilterName.propTypes = {
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function FileFilterName({ filterName, onFilterName }) {  
  const intl = useIntl();
  return (
    <TextField
      size="small"
      value={filterName}
      onChange={onFilterName}
      placeholder={intl.formatMessage({id: 'File Manager-Search Placeholder'})}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
          </InputAdornment>
        ),
      }}
    />
  );
}
