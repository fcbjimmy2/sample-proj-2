import PropTypes from 'prop-types';
import { useState } from 'react';
// icons
import contentDeliveryNetwork from '@iconify/icons-carbon/content-delivery-network';
// @mui
import { MenuItem } from '@mui/material';
// components
import { Iconify } from '../../components';
import MenuPopover from '../../../src/components/menu-popover';
import { IconButtonAnimate } from '../../components/animate';
import { useSettings } from '../../hooks';
// config
import { LANGUAGES } from '../../config';

// ----------------------------------------------------------------------

LanguagePopover.propTypes = {
  sx: PropTypes.object,
};

export default function LanguagePopover({ sx }) {
  const { locale, onChangeLocale } = useSettings();

  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleChangeLang = (newLang) => {
    handleClosePopover();
    onChangeLocale(newLang);
  };

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpenPopover}
        sx={{
          width: 40,
          height: 40,
          ...(openPopover && {
            bgcolor: 'action.selected',
          }),
        }}
      >
        <Iconify icon={contentDeliveryNetwork} sx={{ width: 40, height: 42 }} />
      </IconButtonAnimate>

      <MenuPopover open={openPopover} onClose={handleClosePopover} sx={{ width: 200, p: 0 }}>
        {LANGUAGES.map((option) => (
          <MenuItem 
            selected={option.value === locale}
            key={option.value} 
            onClick={() => handleChangeLang(option.value)} 
            sx={{ m: 1 }}>
            {option.label}
          </MenuItem>
        ))}
      </MenuPopover>
    </>
  );
}
