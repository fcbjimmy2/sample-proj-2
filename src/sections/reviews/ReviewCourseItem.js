import PropTypes from 'prop-types';
import { useState } from 'react';
// icons
import replyIcon from '@iconify/icons-carbon/reply';
import thumbsUp from '@iconify/icons-carbon/thumbs-up';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Stack,
  Rating,
  Button,
  Avatar,
  Divider,
  Typography,
  FilledInput,
} from '@mui/material';
// utils
import { fDate } from '../../utils/formatTime';
// components
import { Iconify } from '../../components';

// ----------------------------------------------------------------------

const AVATAR_SIZE = 64;
const WIDTH = `calc(100% - ${AVATAR_SIZE + 20}px)`;

ReviewCourseItem.propTypes = {
  avatarUrl: PropTypes.string,
  hasReply: PropTypes.bool,
  helpful: PropTypes.number,
  message: PropTypes.string,
  name: PropTypes.string,
  postedAt: PropTypes.string,
  rating: PropTypes.number,
  tagUser: PropTypes.string,
};

export default function ReviewCourseItem({
  name,
  rating,
  message,
  tagUser,
  helpful,
  postedAt,
  hasReply,
  avatarUrl,
}) {
  const [openReply, setOpenReply] = useState(false);
  const [isHelpful, setIsHelpful1] = useState(false);

  const handleOpenReply = () => {
    setOpenReply(!openReply);
  };

  const handleToggleHelpful = () => {
    setIsHelpful1(!isHelpful);
  };

  return (
    <>
      <Stack
        direction="row"
        sx={{
          py: 3,
          alignItems: 'flex-start',
          ...(hasReply && {
            ml: 'auto',
            width: WIDTH,
          }),
        }}
      >
        <Avatar
          alt={name}
          src={avatarUrl}
          sx={{ width: AVATAR_SIZE, height: AVATAR_SIZE, mr: 2.5 }}
        />

        <Stack sx={{ width: 1 }}>
          <Stack
            spacing={1}
            alignItems={{ sm: 'center' }}
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent={{ sm: 'space-between' }}
          >
            <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>{name}</Typography>
            {!hasReply && <Rating size="small" value={rating} precision={0.5} readOnly />}
          </Stack>

          <Typography
            variant="body3"
            sx={{
              mb: 1,
              mt: { xs: 1, sm: 0.5 },
              color: 'text.disabled',
            }}
          >
            {postedAt && fDate(postedAt)}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.primary' }}>
            {tagUser && <strong>{`@${tagUser} `}</strong>}
            {message}
          </Typography>

          {!hasReply && (
            <ReviewActions
              helpful={Number(helpful)}
              isOpen={openReply}
              isHelpful={isHelpful}
              onOpenReply={handleOpenReply}
              onToggleHelpful={handleToggleHelpful}
            />
          )}

          {!hasReply && openReply && (
            <FilledInput
              fullWidth
              size="small"
              placeholder="Write comment..."
              sx={{
                mt: 3,
                '& .MuiFilledInput-input': {
                  py: 0,
                  height: 48,
                },
              }}
            />
          )}
        </Stack>
      </Stack>
      <Divider
        sx={{
          ml: 'auto',
          width: WIDTH,
        }}
      />
    </>
  );
}

// ----------------------------------------------------------------------

ReviewActions.propTypes = {
  helpful: PropTypes.number,
  isHelpful: PropTypes.bool,
  isOpen: PropTypes.bool,
  onOpenReply: PropTypes.func,
  onToggleHelpful: PropTypes.func,
};

function ReviewActions({ helpful, isOpen, isHelpful, onOpenReply, onToggleHelpful }) {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  const totalHelpful =
    helpful > 0
      ? isHelpful
        ? `(${helpful + 1})`
        : `(${helpful})`
      : isHelpful
      ? `(${helpful + 1})`
      : '';

  return (
    <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 2 }}>
      <Button
        size="small"
        color={isHelpful ? 'primary' : 'inherit'}
        onClick={onToggleHelpful}
        startIcon={<Iconify icon={thumbsUp} />}
        sx={{
          ...(!isLight && !isHelpful && { color: 'common.white' }),
        }}
      >
        Helpful {totalHelpful}
      </Button>
      <Box sx={{ width: 4, height: 4, bgcolor: 'text.disabled', borderRadius: '50%' }} />
      <Button
        size="small"
        color={isOpen ? 'primary' : 'inherit'}
        onClick={onOpenReply}
        startIcon={<Iconify icon={replyIcon} />}
        sx={{
          ...(!isLight && !isOpen && { color: 'common.white' }),
        }}
      >
        Reply
      </Button>
    </Stack>
  );
}
