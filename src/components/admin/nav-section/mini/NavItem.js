import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// next
import { useRouter } from 'next/router';
import NextLink from 'next/link';
// @mui
import { useTheme } from '@mui/material/styles';
import { Link, ListItemText } from '@mui/material';
// icons
import chevronRight from '@iconify/icons-carbon/chevron-right';
import dotMark from '@iconify/icons-carbon/dot-mark';
//
import Iconify from '../../../Iconify';
import { StyledItem } from './styles';

// ----------------------------------------------------------------------

const NavItem = forwardRef(({ item, depth, open, ...other }, ref) => {
  const router = useRouter();
  const theme = useTheme();

  const { title, path, icon, children } = item;

  const isSubActive = (subChildren) => {
    return (!!subChildren && !!subChildren.find(element => !!element && (element.path === router.pathname || isSubActive(element.children))));
  };

  const active = router.pathname === path || isSubActive(children);

  const subItem = depth !== 1;

  const renderContent = (
    <StyledItem ref={ref} open={open} depth={depth} active={active} {...other}>
      {icon ? (
        <Iconify 
          icon={icon} 
          sx={{ 
            width: 22, 
            height: 22, 
            marginBottom: (subItem ? 0 : 0.5),
            marginRight: (subItem ? 1 : 0),
            ...(active && subItem && {
              color: theme.palette.primary.main,
            })            
          }} 
        />
      ) : (
        <Iconify 
          icon={dotMark} 
          sx={{ 
            width: 22, 
            height: 22, 
            marginBottom: (subItem ? 0 : 0.5),
            marginRight: (subItem ? 1 : 0),
            ...(active && subItem && {
              color: theme.palette.primary.main,
            })            
          }} 
        />
      )}      

      <ListItemText
        primary={title}
        primaryTypographyProps={{
          noWrap: true,
          sx: {
            width: 72,
            fontSize: 10,
            lineHeight: '16px',
            textAlign: 'center',
            ...(subItem && {
              fontSize: 14,
              width: 'auto',
              textAlign: 'left',
            }),
          },
        }}
      />

      {!!children && (
        <Iconify
          width={16}
          icon={chevronRight}
          sx={{
            top: 11,
            right: 6,
            position: 'absolute',
          }}
        />
      )}
    </StyledItem>
  );

  const renderItem = () => {
    // Default
    return (
      <Link component={NextLink} href={path} underline="none">
        {renderContent}
      </Link>
    );
  };

  return renderItem();
});

NavItem.propTypes = {
  open: PropTypes.bool,
  item: PropTypes.object,
  depth: PropTypes.number
};

export default NavItem;
