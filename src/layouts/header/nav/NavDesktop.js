import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
// icons
import chevronDown from '@iconify/icons-carbon/chevron-down';
import chevronUp from '@iconify/icons-carbon/chevron-up';
// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Stack, Popover } from '@mui/material';
// components
import { Iconify } from '../../../components';
// components
import NavDesktopMenuItem from './NavDesktopMenuItem';

// ----------------------------------------------------------------------

const RootLinkStyle = styled(Link, {
  shouldForwardProp: (prop) =>
    prop !== 'active' && prop !== 'scrolling' && prop !== 'transparent' && prop !== 'open',
})(({ active, scrolling, transparent, open, theme }) => {
  const dotActiveStyle = {
    '&:before': {
      top: 0,
      width: 6,
      height: 6,
      bottom: 0,
      left: -14,
      content: '""',
      display: 'block',
      margin: 'auto 0',
      borderRadius: '50%',
      position: 'absolute',
      backgroundColor: theme.palette.primary.main,
    },
  };
  return {
    ...theme.typography.subtitle2,
    fontWeight: theme.typography.fontWeightMedium,
    display: 'flex',
    color: 'inherit',
    position: 'relative',
    alignItems: 'center',
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shortest,
    }),
    '&:hover': {
      opacity: 0.72,
      textDecoration: 'none',
    },
    ...(active && {
      ...dotActiveStyle,
      color: theme.palette.text.primary,
      ...(transparent && { color: theme.palette.common.white }),
      ...(scrolling && { color: theme.palette.text.primary }),
    }),
    ...(open && {
      color: theme.palette.primary.main,
    }),
  };
});

// ----------------------------------------------------------------------

NavDesktop.propTypes = {
  isScrolling: PropTypes.bool,
  isTransparent: PropTypes.bool,
  navConfig: PropTypes.array.isRequired,
};

export default function NavDesktop({ isScrolling, isTransparent, navConfig }) {
  return (
    <Stack
      direction="row"
      spacing={6}
      sx={{
        ml: 6,
        color: 'text.secondary',
        ...(isTransparent && {
          color: 'inherit',
        }),
        ...(isScrolling && {
          color: 'text.secondary',
        }),
      }}
    >
      {navConfig.map((link, index) => (
        <NavItemDesktop
          key={index}
          item={link}
          isScrolling={isScrolling}
          isTransparent={isTransparent}
        />
      ))}
    </Stack>
  );
}

// ----------------------------------------------------------------------

NavItemDesktop.propTypes = {
  isScrolling: PropTypes.bool,
  isTransparent: PropTypes.bool,
  item: PropTypes.object
};

function NavItemDesktop({ item, isScrolling, isTransparent }) {
  const { title, path, children } = item;

  const { pathname } = useRouter();

  const isSubActive = (subChildren) => {
    return (!!subChildren && !!subChildren.find(element => !!element && (element.path === pathname || isSubActive(element.children))));
  };

  const isActiveRoot = path === pathname || isSubActive(children);

  const navRef = useRef(null);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (children) {
      if (open) {
        handleClose();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {    
    if (children) {
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
    }
  }, [open]);

  const handleOpen = () => {
    if (children) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    if (children) {
      setOpen(false);
    }
  };

  if (children) {
    return (
      <>
        <RootLinkStyle
          ref={navRef} 
          active={isActiveRoot} 
          onClick={handleOpen}
          open={open}
          scrolling={isScrolling}
          transparent={isTransparent}
        >
          {title}
          <Iconify
            icon={open ? chevronUp : chevronDown}
            sx={{
              ml: 0.5,
              width: 16,
              height: 16,
            }}
          />
        </RootLinkStyle>

        <Popover
          open={open}
          onClose={handleClose}
          anchorEl={navRef.current}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          PaperProps={{
            sx: { px: 1, width: 220 },
          }}
        >      
          {children.map((subItem, index) => {
            return (<NavDesktopMenuItem key={index} item={subItem} ref={navRef} />);
          })}
        </Popover>
      </>
    );
  }

  return (
    <RootLinkStyle component={NextLink} href={path} active={isActiveRoot} scrolling={isScrolling} transparent={isTransparent}>
      {title}
    </RootLinkStyle>
  );
}
