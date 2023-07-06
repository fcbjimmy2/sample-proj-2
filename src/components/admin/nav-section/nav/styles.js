// @mui
import { alpha, styled } from '@mui/material/styles';
import { ListItemIcon, ListSubheader, ListItemButton } from '@mui/material';

// ----------------------------------------------------------------------

export const StyledItem = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active',
})(({ active, disabled, depth, theme }) => {
  const isLight = theme.palette.mode === 'light';

  const subItem = depth !== 1;

  const activeStyle = {
    color: theme.palette.primary.main,
    backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    ...(!isLight && {
      color: theme.palette.primary.light,
    }),
  };

  const activeSubStyle = {
    color: theme.palette.text.primary,
    backgroundColor: 'transparent',
  };

  return {
    position: 'relative',
    textTransform: 'capitalize',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1.5),
    marginBottom: theme.spacing(0.5),
    color: theme.palette.text.secondary,
    borderRadius: theme.shape.borderRadius,
    height: 48,
    // Sub item
    ...(subItem && {
      height: 36,
      paddingLeft: theme.spacing(depth * 2),
    }),
    // Active item
    ...(active && {
      ...activeStyle
    }),
    // Active sub item
    ...(subItem &&
      active && {
        ...activeSubStyle
      }),
    // Disabled
    ...(disabled && {
      '&.Mui-disabled': {
        opacity: 0.64,
      },
    }),
  };
});

// ----------------------------------------------------------------------

export const StyledIcon = styled(ListItemIcon)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 24,
  height: 24,
});

// ----------------------------------------------------------------------

export const StyledDotIcon = styled('span', {
  shouldForwardProp: (prop) => prop !== 'active',
})(({ active, theme }) => ({
  width: 4,
  height: 4,
  borderRadius: '50%',
  backgroundColor: theme.palette.text.disabled,
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shorter,
  }),
  ...(active && {
    transform: 'scale(2)',
    backgroundColor: theme.palette.primary.main,
  }),
}));

// ----------------------------------------------------------------------

export const StyledSubheader = styled(ListSubheader)(({ theme }) => ({
  ...theme.typography.overline,
  fontSize: 11,
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(1),
  color: theme.palette.text.secondary,
}));
