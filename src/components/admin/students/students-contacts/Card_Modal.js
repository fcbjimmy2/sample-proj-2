import React from 'react';
import MainCard from '../../../cards/MainCard';
import { styled } from '@mui/material/styles';
import { Button, Grid } from '@mui/material';
import { gridSpacing } from '../../../../store/constant';
import { grey } from '@mui/material/colors';

// third-party
import { useIntl } from 'react-intl';

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(grey[500]),
  backgroundColor: grey[600],
  '&:hover': {
    backgroundColor: grey[700],
  },
}));

// start of modal position functions
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
// end of modal position functions

export default function Class_Info_Modal(props) {
  const [modalStyle] = React.useState(getModalStyle);
  const intl = useIntl();

  return (
    <MainCard
      title={
        <Grid container alignItems="center" justifyContent="flex-end" spacing={gridSpacing}>
          <Grid item />
        </Grid>
      }
      modalStyle={modalStyle}
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        height: '90%',
        width: '80%',
        overflowY: 'auto',
      }}
      content={false}
    >
      {/*-------------------------- Buttons ----------------------------------*/}
      <Grid container justifyContent="end" alignItems="center" sx={{ p: 3 }}>
        <ColorButton variant="contained" sx={{ mr: 1, color: 'white' }} onClick={props.profileOpen}>
          {intl.formatMessage({ id: 'Close' })}
        </ColorButton>
      </Grid>
    </MainCard>
  );
}
