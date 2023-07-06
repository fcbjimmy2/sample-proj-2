import PropTypes from 'prop-types';
// icons
import asleepIcon from '@iconify/icons-carbon/asleep';
import asleepFilled from '@iconify/icons-carbon/asleep-filled';
// hooks
import { useSettings } from '../../hooks';
//
import { Iconify } from '../../components';
import { IconButtonAnimate } from '../../components/animate';

// ----------------------------------------------------------------------

DarkModeToggle.propTypes = {
  sx: PropTypes.object,
};

export default function DarkModeToggle({ sx }) {
  const { themeMode, onToggleMode } = useSettings();

  const isLight = themeMode === 'light';

  return (
    <IconButtonAnimate 
      onClick={onToggleMode} 
      sx={{
        width: 40,
        height: 40,
      }}
    >
      <Iconify icon={isLight ? asleepIcon : asleepFilled} sx={{ width: 40, height: 40 }} />
    </IconButtonAnimate>
  );
}
