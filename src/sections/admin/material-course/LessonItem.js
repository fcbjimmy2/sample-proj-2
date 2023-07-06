import PropTypes from 'prop-types';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import dynamic from 'next/dynamic';
// icons
import chevronDown from '@iconify/icons-carbon/chevron-down';
import chevronRight from '@iconify/icons-carbon/chevron-right';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Accordion, Typography, AccordionSummary, AccordionDetails, TextField, Stack, FormLabel, FormHelperText } from '@mui/material';
// components
import { Iconify } from '../../../components';
//
import { froalaEditorConfig } from '../../../config';
const FroalaEditorComponent = dynamic(
  async () => {
      const values = await Promise.all([
          import("react-froala-wysiwyg"),
          import("froala-editor/js/froala_editor.min.js"),
          import("froala-editor/js/froala_editor.pkgd.min.js"),
          import("froala-editor/js/plugins.pkgd.min.js"),
          import("froala-editor/js/plugins/link.min.js"),
          import("froala-editor/js/plugins/lists.min.js"),
      ]);
      return values[0];
  },
  {
      ssr: false
  }
);

// ----------------------------------------------------------------------

const AccordionStyle = styled(Accordion)(({ theme }) => ({
  overflow: 'hidden',
  borderRadius: '8px !important',
  marginBottom: theme.spacing(2.5),
  boxShadow: theme.customShadows.z16,
}));

const AccordionSummaryStyle = styled(AccordionSummary)(({ theme }) => ({
  minHeight: 'auto',
  backgroundColor: theme.palette.action.selected,
  '& .MuiAccordionSummary-content': {
    margin: theme.spacing(2, 0),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
}));

// ----------------------------------------------------------------------

const LessonItem = ({ lessonItem, onTitleChanged, onDetailChanged, onDeleted, onExpanded }) => {
  const intl = useIntl();  

  const { index, title, detail, error, expanded } = lessonItem;

  return (
    <Box sx={{ position: 'relative', mb: 1 }}>
      <AccordionStyle expanded={expanded} onChange={()=>{onExpanded(index, !expanded)}}>
        <AccordionSummaryStyle>
          <Typography variant="subtitle1" sx={{ flexGrow: 1, color: ((!!error?.title || !!error?.detail) ? 'error.main' : 'text.primary') }}>
            {intl.formatMessage({id: 'Lesson'})} {index + 1}
          </Typography>

          <Iconify
            icon={expanded ? chevronDown : chevronRight}
            sx={{
              color: 'text.secondary',
              width: 20,
              height: 20
            }}
          />
        </AccordionSummaryStyle>

        <AccordionDetails sx={{ p: 2 }}>
          <Stack sx={{ pb: 2 }}>
            <TextField 
              fullWidth 
              label={intl.formatMessage({id: 'title'})} 
              defaultValue={title} 
              onChange={(event) => {
                onTitleChanged(index, event.target.value);
              }}
            />
            {error?.title && (<FormHelperText error={true}>{error?.title}</FormHelperText>)}
          </Stack>
          <Stack sx={{ pb: 2 }}>
            <FormLabel component="legend" sx={{ typography: 'body2' }}>
              {intl.formatMessage({id: 'Detail'})}
            </FormLabel>
            <FroalaEditorComponent 
                onModelChange={(content) => {
                  onDetailChanged(index, content);
                }}
                model={detail}
                config={{
                    ...froalaEditorConfig,
                }} 
            />
            {error?.detail && (<FormHelperText error={true}>{error?.detail}</FormHelperText>)}
          </Stack>
          <Stack direction="row">
            <Button variant="contained" color='error' onClick={()=>{onDeleted(index)}}>
              {intl.formatMessage({id: 'delete'})}
            </Button>
          </Stack>
        </AccordionDetails>
      </AccordionStyle>
    </Box>
  );
}

LessonItem.propTypes = {
  lessonItem: PropTypes.object,
  onTitleChanged: PropTypes.func,
  onDetailChanged: PropTypes.func,
  onDeleted: PropTypes.func,
};

export default LessonItem;