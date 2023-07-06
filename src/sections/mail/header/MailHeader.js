import PropTypes from 'prop-types';
// @mui
import {
  Box,
  Stack,
  Tooltip,
  Checkbox,
  Typography,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// components
import Iconify from '../../../components/Iconify';

// third-party
import { useIntl } from 'react-intl';
// ----------------------------------------------------------------------

MailHeader.propTypes = {
  onOpenNav: PropTypes.func,
  mailsLength: PropTypes.number,
  onToggleDense: PropTypes.func,
  onSelectAllMails: PropTypes.func,
  onDeselectAllMails: PropTypes.func,
  onFilterChange: PropTypes.func,
  selectedMailsLength: PropTypes.number,
  onRefresh: PropTypes.func,
  onDelete: PropTypes.func,
  onMarkAsRead: PropTypes.func,
};

export default function MailHeader({
  onOpenNav,
  mailsLength,
  selectedMailsLength,
  onSelectAllMails,
  onDeselectAllMails,
  onFilterChange,
  onToggleDense,
  onRefresh,
  onDelete,
  onMarkAsRead,
  ...other
}) {
  const intl = useIntl();

  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');

  const selectedAllMails = mailsLength > 0 && selectedMailsLength === mailsLength;

  const selectedSomeMails = selectedMailsLength > 0 && selectedMailsLength < mailsLength;

  return (
    <Stack
      spacing={2}
      direction="row"
      alignItems="center"
      flexShrink={0}
      sx={{
        px: 2,
        height: 80,
        borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
      }}
      {...other}
    >
      <Stack direction="row" alignItems="center" flexGrow={1}>
        {!mdUp && (
          <IconButton onClick={onOpenNav}>
            <Iconify icon="eva:menu-fill" />
          </IconButton>
        )}

        {smUp && (
          <>
            <Checkbox
              checked={selectedAllMails}
              indeterminate={selectedSomeMails}
              onChange={(event) =>
                event.target.checked ? onSelectAllMails() : onDeselectAllMails()
              }
            />
            <Tooltip title={intl.formatMessage({id: 'Mail-Refresh'})}>
              <IconButton onClick={onRefresh}>
                <Iconify icon="eva:refresh-fill" />
              </IconButton>
            </Tooltip>

            <Tooltip title={intl.formatMessage({id: 'Mail-Dense'})}>
              <IconButton onClick={onToggleDense}>
                <Iconify icon="eva:collapse-fill" />
              </IconButton>
            </Tooltip>
            
            <Tooltip title={intl.formatMessage({id: 'Mail-Delete selected'})}>
              <IconButton onClick={onDelete}>
                <Iconify icon="eva:trash-2-outline" />
              </IconButton>
            </Tooltip>
            
            <Tooltip title={intl.formatMessage({id: 'Mail-Mark selected read'})}>
              <IconButton onClick={onMarkAsRead}>
                <Iconify icon="ic:round-mark-email-read" />
              </IconButton>
            </Tooltip>

            {/* <Tooltip title="More">
              <IconButton>
                <Iconify icon="eva:more-vertical-fill" />
              </IconButton>
            </Tooltip> */}
          </>
        )}
      </Stack>

      <TextField
        size="small"
        placeholder={intl.formatMessage({id: 'Mail-Search'})}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
        sx={{ maxWidth: 180 }}
        
        onChange={(event) => onFilterChange(event.target.value) }
      />

      {smUp && (
        <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            1 - {mailsLength} of {mailsLength}
          </Typography>

          <Tooltip title={intl.formatMessage({id: 'Mail-Next page'})}>
            <IconButton>
              <Iconify icon="eva:arrow-ios-back-fill" />
            </IconButton>
          </Tooltip>

          <Tooltip title={intl.formatMessage({id: 'Mail-Previous page'})}>
            <IconButton>
              <Iconify icon="eva:arrow-ios-forward-fill" />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Stack>
  );
}
