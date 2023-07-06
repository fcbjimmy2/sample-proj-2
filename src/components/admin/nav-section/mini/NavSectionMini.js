import PropTypes from 'prop-types';
import { memo, useRef, useState, useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { Box, Stack } from '@mui/material';
//
import NavItem from './NavItem';
import { StyledPopover } from './styles';

// ----------------------------------------------------------------------

NavSectionMini.propTypes = {
  navConfig: PropTypes.array,
};

function NavSectionMini({ navConfig, ...other }) {
  return (
    <Stack
      spacing={0.5}
      alignItems="center"
      sx={{
        px: 2,
      }}
    >
      {navConfig.map((item, index) => (
        <NavList key={index} item={item} depth={1} />
      ))}
    </Stack>
  );
}

export default memo(NavSectionMini);

// ----------------------------------------------------------------------

NavList.propTypes = {
  item: PropTypes.object,
  depth: PropTypes.number
};

function NavList({ item, depth }) {
  const navRef = useRef(null);

  const { pathname } = useRouter();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    const appBarEl = Array.from(document.querySelectorAll('.MuiAppBar-root'));

    // Reset styles when hover
    const styles = () => {
      document.body.style.overflow = '';
      document.body.style.padding = '';
      // Apply for Window
      appBarEl.forEach((elem) => {
        elem.style.padding = '';
      });
    };

    if (open) {
      styles();
    } else {
      styles();
    }
  }, [open]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <NavItem
        ref={navRef}
        item={item}
        depth={depth}
        open={open}
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
      />

      {item.children && (
        <StyledPopover
          open={open}
          anchorEl={navRef.current}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          PaperProps={{
            onMouseEnter: handleOpen,
            onMouseLeave: handleClose,
          }}
        >
          <NavSubList children={item.children} depth={depth} />
        </StyledPopover>
      )}
    </>
  );
}

// ----------------------------------------------------------------------

NavSubList.propTypes = {
  children: PropTypes.array,
  depth: PropTypes.number,
};

function NavSubList({ children, depth }) {
  return (
    <>
      {children.map((item, index) => (
        <NavList key={index} item={item} depth={depth + 1} />
      ))}
    </>
  );
}
