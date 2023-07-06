import PropTypes from 'prop-types';
import { useState } from 'react';
// icons
import chevronRight from '@iconify/icons-carbon/chevron-right';
import chevronDown from '@iconify/icons-carbon/chevron-down';
// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui
import { alpha, styled } from '@mui/material/styles';
import {
  Box,
  List,
  Collapse,
  Link,
  ListItemText,
  ListItemButton,
} from '@mui/material';
// components
import { Iconify } from '.';

// ----------------------------------------------------------------------

const ListItemStyle = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'activeRoot' && prop !== 'activeSub',
})(({ activeRoot, activeSub, theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(2.5),
  color: theme.palette.text.secondary,
  ...(activeRoot && {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    '&:before': {
      top: 0,
      right: 0,
      width: 3,
      bottom: 0,
      content: "''",
      display: 'block',
      position: 'absolute',
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
      backgroundColor: theme.palette.primary.main,
    },
  }),
  ...(activeSub && {
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightMedium,
  }),
}));

// ----------------------------------------------------------------------

NavSection.propTypes = {
  navConfig: PropTypes.array.isRequired,
};

export default function NavSection({ navConfig, ...other }) {
  return (
    <Box {...other}>
      <List disablePadding sx={{ px: 0 }}>          
        {navConfig.map((item, index) => (
          <NavSectionItem key={index} item={item} />
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavSectionItem.propTypes = {
  item: PropTypes.object,
};

function NavSectionItem({ item }) {
  const { pathname } = useRouter();

  const isSubActive = (subChildren) => {
    return (!!subChildren && !!subChildren.find(element => !!element && (element.path === pathname || isSubActive(element.children))));
  };

  const isActive = pathname === item.path || isSubActive(item.children);

  const [open, setOpen] = useState(isActive);

  const handleOpen = () => {
    setOpen(!open);
  };

  if (item.children) {
    return (
      <>
        <ListItemStyle onClick={handleOpen} activeRoot={isActive}>
          <ListItemText disableTypography primary={item.title} />
          <Iconify icon={open ? chevronDown : chevronRight} sx={{ width: 16, height: 16, ml: 1 }} />
        </ListItemStyle>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children.map((subItem, index) => {
              const getIsSubActive = (subChildren) => {
                return (!!subChildren && !!subChildren.find(element => !!element && (element.path === pathname || getIsSubActive(element.children))));
              };
              const isActiveSub = pathname === subItem.path || getIsSubActive(subItem.children);

              return (
                <ListItemStyle key={index} component={NextLink} href={subItem.path} activeRoot={isActiveSub}>
                  <ListItemText disableTypography primary={subItem.title} />
                </ListItemStyle>        
              );
            })}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItemStyle component={NextLink} href={item.path} activeRoot={isActive}>
      <ListItemText disableTypography primary={item.title} />
    </ListItemStyle>
  );
}
