import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
// next
import NextLink from 'next/link';
// @mui
import { alpha } from '@mui/material/styles';
import {
  Link,
  Stack,
  Drawer,
  Avatar,
  Divider,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
import useActiveLink from '../../hooks/useActiveLink';
// config
import { NAV } from '../../config';
// _mock
import _mock from '../../_mock';
// components
import Iconify from '../../components/Iconify';
import TextMaxLine from '../../components/text-max-line';
// auth
import { useAuthContext } from '../../auth/useAuthContext';

// ----------------------------------------------------------------------

const ProfileMenu = ({ value, open, onClose }) => {
  const intl = useIntl();

  const [ id, setId ] = useState('');

  const { user } = useAuthContext();

  useEffect(() => {
    if (value && user.id != value.user_guid) {
      setId(value.user_guid);
    }
  }, [value]);

  const isMdUp = useResponsive('up', 'md');
  
  const navigations = [
    {
      title: intl.formatMessage({id: "profile"}),
      path: `/admin/account/profile/${id}`,
      icon: <Iconify icon="carbon:user" />,
    },
    {
      title: intl.formatMessage({id: "tasks"}),
      path: `/admin/account/tasks/${id}`,
      icon: <Iconify icon="carbon:task" />,
    },
    {
      title: intl.formatMessage({id: "persons"}),
      path: `/admin/account/persons/${id}`,
      icon: <Iconify icon="carbon:collaborate" />,
    },
    {
      title: intl.formatMessage({id: "opportunities"}),
      path: `/admin/account/opportunities/${id}`,
      icon: <Iconify icon="carbon:growth" />,
    },
    {
      title: intl.formatMessage({id: "documents"}),
      path: `/admin/account/documents/${id}`,
      icon: <Iconify icon="carbon:document" />,
    },
    {
      title: intl.formatMessage({id: "projects"}),
      path: `/admin/account/projects/${id}`,
      icon: <Iconify icon="carbon:roadmap" />,
    },
  ];

  const renderContent = (
    <Stack
      sx={{
        flexShrink: 0,
        borderRadius: 2,
        width: 1,
        ...(isMdUp && {
          width: NAV.W_DRAWER,
          border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.24)}`,
        }),
      }}
    >
      <Stack spacing={2} sx={{ p: 3, pb: 2 }}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Avatar src={value?.photo} sx={{ width: 64, height: 64 }} />
          <Stack
            direction="row"
            alignItems="center"
            sx={{ typography: 'caption', cursor: 'pointer', '&:hover': { opacity: 0.72 } }}
          >
            <Iconify icon="carbon:edit" sx={{ mr: 1 }} />
            <FormattedMessage id="change-photo" />
          </Stack>
        </Stack>

        <Stack spacing={0.5}>
          <TextMaxLine variant="subtitle1" line={1}>
            {value?.fullName}
          </TextMaxLine>
          <TextMaxLine variant="body2" line={1} sx={{ color: 'text.secondary' }}>
            {value?.email}
          </TextMaxLine>
        </Stack>
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Stack sx={{ my: 1, px: 2 }}>
        {navigations.map((item) => (
          <MenuItem key={item.title} item={item} />
        ))}
      </Stack>
    </Stack>
  );

  return (
    <>
      {isMdUp ? (
        renderContent
      ) : (
        <Drawer
          open={open}
          onClose={onClose}
          ModalProps={{ keepMounted: true }}
          PaperProps={{
            sx: {
              width: NAV.W_DRAWER,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </>
  );
};

export default ProfileMenu;

// ----------------------------------------------------------------------

function MenuItem({ item }) {
  const { active } = useActiveLink(item.path);

  return (
    <Link
      component={NextLink}
      key={item.title}
      href={item.path}
      color={active ? 'primary' : 'inherit'}
      underline="none"
    >
      <ListItemButton
        sx={{
          px: 1,
          height: 44,
          borderRadius: 1,
        }}
      >
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText
          primary={item.title}
          primaryTypographyProps={{
            typography: 'body2',
            ...(active && {
              typography: 'subtitle2',
            }),
          }}
        />
      </ListItemButton>
    </Link>
  );
}
