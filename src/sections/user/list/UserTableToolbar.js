import PropTypes from 'prop-types';
// @mui
import { Stack, InputAdornment, TextField, MenuItem, Button } from '@mui/material';
// components
import Iconify from '../../../components/Iconify';
// third-party
import { useIntl } from 'react-intl';

// ----------------------------------------------------------------------

UserTableToolbar.propTypes = {
  isFiltered: PropTypes.bool,
  filterName: PropTypes.string,
  filterRole: PropTypes.string,
  onFilterName: PropTypes.func,
  onFilterRole: PropTypes.func,
  onResetFilter: PropTypes.func,
  optionsRole: PropTypes.arrayOf(PropTypes.object),
};

export default function UserTableToolbar({
  isFiltered,
  filterName,
  filterRole,
  optionsRole,
  onFilterName,
  onFilterRole,
  onResetFilter,
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
        select
        label={intl.formatMessage({id: 'User Manager-Role'})}
        value={filterRole}
        onChange={onFilterRole}
        SelectProps={{
          MenuProps: {
            PaperProps: {
              sx: {
                maxHeight: 260,
              },
            },
          },
        }}
        sx={{
          maxWidth: { sm: 240 },
          textTransform: 'capitalize',
        }}
      >
        {optionsRole.map((option) => (
          <MenuItem
            key={option.idx} 
            value={option.value}
            sx={{
              mx: 1,
              borderRadius: 0.75,
              typography: 'body2',
              textTransform: 'capitalize',
            }}
          >
            {intl.locale === 'en' ? option.lang_en : intl.locale === 'zh-Hant' ? option.lang_zh_hant : option.lang_zh_hans} 
          </MenuItem>
        ))}
      </TextField>

      <TextField
        fullWidth
        value={filterName}
        onChange={onFilterName}
        placeholder={intl.formatMessage({id: 'User Manager-Search Placeholder'})}
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
          {intl.formatMessage({id: 'User Manager-Clear'})}
        </Button>
      )}
    </Stack>
  );
}
