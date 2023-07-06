import PropTypes from 'prop-types';
import { forwardRef, useState, useEffect, useRef } from 'react';
// next
import { useRouter } from 'next/router';
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Box, MenuItem, Popover } from '@mui/material';
// icons
import chevronRight from '@iconify/icons-carbon/chevron-right';
//
import { Iconify } from '../../../components';

// ----------------------------------------------------------------------
const IconBulletStyle = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active',
})(({ active, theme }) => ({
  marginLeft: 6,
  marginRight: 6,
  width: 12,
  height: 24,
  display: 'flex',
  alignItems: 'center',
  '&:before': {
    content: '""',
    display: 'block',
    width: 4,
    height: 4,
    borderRadius: '50%',
    backgroundColor: theme.palette.text.disabled,
  },
  ...(active && {
    '&:before': {
      content: '""',
      width: 6,
      height: 6,
      borderRadius: '50%',
      backgroundColor: theme.palette.primary.main,
      transition: theme.transitions.create('all', {
        duration: theme.transitions.duration.shortest,
      }),
    },
  }),
}));

// ----------------------------------------------------------------------

const NavDesktopMenuItem = forwardRef(({ item }, ref) => {
  const { pathname } = useRouter();

  const getIsSubActive = (subChildren) => {
    return (!!subChildren && !!subChildren.find(element => !!element && (element.path === pathname || getIsSubActive(element.children))));
  };

  const active = pathname === item.path || getIsSubActive(item.children);
  
  const navRef = useRef(null);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (item.children) {
      if (open) {
        handleClose();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpen = () => {
    if (item.children) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    if (item.children) {
      setOpen(false);
    }
  };

  if (item.children) {  
    return (
      <>
        <MenuItem 
            selected={open}
            onClick={handleOpen}
            ref={navRef} 
            sx={{ my: 1 }}>
            <IconBulletStyle active={active} />
            {item.title}
            <Iconify
                width={16}
                icon={chevronRight}
                sx={{
                right: 8,
                position: 'absolute',
                }}
            />
        </MenuItem>       

        <Popover
          open={open}
          onClose={handleClose}
          anchorEl={navRef.current}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          PaperProps={{
            sx: { px: 1, width: 220 },
          }}
        >   
          {item.children.map((subItem, index) => {
            const isActiveSub = pathname === subItem.path || getIsSubActive(subItem.children);

            if (subItem.children) {
              return (<NavDesktopMenuItem key={index} item={subItem} ref={navRef} />);
            }

            return (
              <MenuItem 
                key={index}
                component={NextLink} 
                href={subItem.path} 
                sx={{ my: 1 }}
              >
                <IconBulletStyle active={isActiveSub} />
                {subItem.title}
              </MenuItem>
            );
          })}
        </Popover>
      </>
    );
  }

  return (
    <MenuItem 
      component={NextLink} 
      href={item.path}
      sx={{ my: 1 }}
      onClick={handleClose}
    >
      <IconBulletStyle active={active} />
      {item.title}
    </MenuItem>
  )
});

NavDesktopMenuItem.propTypes = {
  item: PropTypes.object,
  depth: PropTypes.number
};

export default NavDesktopMenuItem;

