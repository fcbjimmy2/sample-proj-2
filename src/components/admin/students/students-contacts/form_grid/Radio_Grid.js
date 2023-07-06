import React from 'react';
import {
  Grid,
  InputLabel,
  TextField,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from '@mui/material';

export default function Radio_Grid({ fieldName, disabled, options }) {
  return (
    <>
      <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' }, mt: 2 }}>
        <InputLabel>{fieldName}</InputLabel>
      </Grid>

      <Grid item xs={12} sm={9} lg={6}>
        <FormControl>
          <RadioGroup
            row
            aria-label="english_school"
            value={options.defaultValue}
            name="english_school"
          >
            <FormControlLabel
              value={true}
              control={<Radio />}
              label={intl.formatMessage({ id: 'Yes' })}
              disabled={disabled}
            />
            <FormControlLabel
              value={false}
              control={<Radio />}
              label={intl.formatMessage({ id: 'No' })}
              disabled={disabled}
            />
          </RadioGroup>
        </FormControl>
      </Grid>
    </>
  );
}
