import PropTypes from 'prop-types';
import { useState } from 'react';
// icons
import playIcon from '@iconify/icons-carbon/play';
import lockedIcon from '@iconify/icons-carbon/locked';
import chevronDown from '@iconify/icons-carbon/chevron-down';
import chevronRight from '@iconify/icons-carbon/chevron-right';
import pauseOutline from '@iconify/icons-carbon/pause-outline';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Accordion, Typography, AccordionSummary, AccordionDetails } from '@mui/material';
// components
import { Iconify } from '../../components';
//
import CourseDetailsLessonsDialog from './CourseDetailsLessonsDialog';

// ----------------------------------------------------------------------

const AccordionStyle = styled(Accordion)(({ theme }) => ({
  '&.Mui-expanded': {
    overflow: 'hidden',
    borderRadius: '8px !important',
    marginBottom: theme.spacing(2.5),
    boxShadow: theme.customShadows.z16,
  },
}));

const AccordionSummaryStyle = styled(AccordionSummary)(({ theme }) => ({
  '&.Mui-expanded': {
    minHeight: 'auto',
    backgroundColor: theme.palette.action.selected,
  },
  '& .MuiAccordionSummary-content': {
    margin: theme.spacing(2, 0),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    '&.Mui-expanded': { margin: theme.spacing(2, 0) },
  },
}));

// ----------------------------------------------------------------------

CourseDetailsLessons.propTypes = {
  lessons: PropTypes.array,
};

export default function CourseDetailsLessons({ lessons }) {
  const [selectLesson, setSelectLesson] = useState(null);

  const [open, setOpen] = useState(false);

  const [play, setPlay] = useState(false);

  const [expanded, setExpanded] = useState(false);

  const handleSelectVideo = (lesson) => {
    setSelectLesson(lesson);
    setPlay(true);
  };

  const handleOpen = (lesson) => {
    setOpen(true);
    if (lesson) {
      handleSelectVideo(lesson);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setPlay(false);
    setSelectLesson(null);
  };

  const handleVideoEnded = () => {
    setPlay(false);
  };

  const handleExpanded = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 3, color: 'text.primary' }}>
        Lessons
      </Typography>

      {lessons?.map((lesson) => (
        <LessonItem
          key={lesson.id}
          lesson={lesson}
          isPlay={play && selectLesson?.id === lesson.id}
          expanded={expanded === lesson.id}
          onExpanded={handleExpanded(lesson.id)}
          onOpen={() => handleOpen(lesson)}
        />
      ))}

      <CourseDetailsLessonsDialog
        isPlay={play}
        open={open}
        lessons={lessons}
        onClose={handleClose}
        selectLesson={selectLesson}
        onVideoEnded={handleVideoEnded}
        onSelectVideo={(lesson) => setSelectLesson(lesson)}
      />
    </div>
  );
}

// ----------------------------------------------------------------------

LessonItem.propTypes = {
  expanded: PropTypes.bool,
  isPlay: PropTypes.bool,
  lesson: PropTypes.object,
  onOpen: PropTypes.func,
  onExpanded: PropTypes.func,
};

function LessonItem({ lesson, expanded, isPlay, onExpanded, onOpen }) {
  const { title, duration, description, isUnLock } = lesson;

  const handleOpen = () => {
    if (!isUnLock) {
      onOpen();
    }
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Iconify
        icon={isUnLock ? lockedIcon : isPlay ? pauseOutline : playIcon}
        onClick={handleOpen}
        sx={{
          mr: 2,
          top: 18,
          left: 8,
          width: 24,
          zIndex: 9,
          height: 24,
          cursor: 'pointer',
          position: 'absolute',
          color: 'primary.main',
          ...(isUnLock && { color: 'text.disabled' }),
        }}
      />

      <AccordionStyle expanded={expanded} onChange={onExpanded} disabled={isUnLock}>
        <AccordionSummaryStyle>
          <Typography variant="subtitle1" sx={{ flexGrow: 1, pl: 3, color: 'text.primary' }}>
            {title}
          </Typography>

          <Typography variant="body3" sx={{ mr: 2, color: 'text.primary' }}>
            {duration} m
          </Typography>

          <Iconify
            icon={expanded ? chevronDown : chevronRight}
            sx={{
              color: 'text.secondary',
              width: 20,
              height: 20,
              ...(isUnLock && { color: 'text.disabled' }),
            }}
          />
        </AccordionSummaryStyle>

        <AccordionDetails sx={{ p: 2 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {description}
          </Typography>
        </AccordionDetails>
      </AccordionStyle>
    </Box>
  );
}
