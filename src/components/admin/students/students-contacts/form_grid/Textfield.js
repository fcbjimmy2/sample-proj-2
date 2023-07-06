import React from 'react';
import { Grid, InputLabel, TextField } from '@mui/material';

export default function Textfield({ fieldName, disabled, defaultValue }) {
  return (
    <Grid item xs={12} sm={6} md={3} lg={6} sx={{ pt: { xs: 2, sm: '0 !important' }, mt: 2 }}>
      <InputLabel>{fieldName}</InputLabel>
      <TextField fullWidth disabled={disabled} defaultValue={defaultValue} />
    </Grid>
  );
}
