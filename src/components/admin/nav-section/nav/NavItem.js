import PropTypes from 'prop-types';
// next
import { useRouter } from 'next/router';
import NextLink from 'next/link';
// @mui
import { useTheme } from '@mui/material/styles';
import { Link, ListItemText } from '@mui/material';
// icons
import chevronDown from '@iconify/icons-carbon/chevron-down';
import chevronRight from '@iconify/icons-carbon/chevron-right';
import dotMark from '@iconify/icons-carbon/dot-mark';
//
import Iconify from '../../../Iconify';
//
import { StyledItem } from './styles';

// ----------------------------------------------------------------------

NavItem.propTypes = {
  open: PropTypes.bool,
  item: PropTypes.object,
  depth: PropTypes.number,
  onClick: PropTypes.func
};

export default function NavItem({ item, depth, open, onClick }) {
  const router = useRouter();
  const theme = useTheme();
  
  const { title, path, icon, children } = item;

  const isSubActive = (subChildren) => {
    return (!!subChildren && !!subChildren.find(element => !!element && (element.path === router.pathname || isSubActive(element.children))));
  };
  
  const active = router.pathname === path || isSubActive(children);

  const subItem = depth !== 1;

  const renderContent = (
    <StyledItem depth={depth} onClick={onClick} active={active}>
      {icon ? (
        <Iconify 
          icon={icon} 
          sx={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 24, 
            height: 24,
            marginRight: 1.5,
            ...(active && subItem && {
              color: theme.palette.primary.main,
            })            
          }} 
        />
      ) : (
        <Iconify 
          icon={dotMark} 
          sx={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 24, 
            height: 24,
            marginRight: 1.5,
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
          component: 'span',
          variant: 'subtitle2',
        }}
        secondaryTypographyProps={{
          noWrap: true,
          variant: 'caption',
        }}
      />

      {!!children && (
        <Iconify
          width={16}
          icon={open ? chevronDown : chevronRight}
          sx={{ ml: 1, flexShrink: 0 }}
        />
      )}
    </StyledItem>
  );

  const renderItem = () => {
    // Has child
    if (children) {
      return renderContent;
    }

    // Default
    return (
      <Link component={NextLink} href={path} underline="none">
        {renderContent}
      </Link>
    );
  };

  return renderItem();
}
