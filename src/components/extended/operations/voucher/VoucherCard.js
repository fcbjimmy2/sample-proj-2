import PropTypes from 'prop-types';
import * as React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Card,
  CardContent,
  Checkbox,
  Typography,
  Stack,
  FormControlLabel,
  Box,
} from '@mui/material';

const VoucherCard = ({ voucher, index, isCheckboxChecked, isChecked, showVouchers }) => {
  React.useEffect(() => {}, [isChecked, showVouchers]);
  return (
    <>
      {showVouchers && (
        <Card sx={{ mt: 2, mb: 2 }}>
          <CardContent
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              background: 'linear-gradient(45deg,#f8fc0773  40%, #fafc9d 90%)',
            }}
          >
            <Stack direction={'column'}>
              <Typography variant="h4">{voucher.VoucherName}</Typography>
              <Typography fontSize="15">Never Expires</Typography>
            </Stack>
            <Stack direction={'row'} alignItems="center">
              <Typography fontSize="17" sx={{ mr: 1 }}>
                USE
              </Typography>
              <FormControlLabel
                key={index + voucher.VoucherName}
                control={
                  <Checkbox
                    name={voucher.VoucherName}
                    value={voucher.VoucherCode}
                    id={voucher.VoucherCode}
                    checked={isChecked[index]}
                    color="primary"
                    onChange={(e) => isCheckboxChecked(index, e.target)}
                  />
                }
              />
            </Stack>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default VoucherCard;
