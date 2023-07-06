import { useEffect, useState, useCallback } from 'react';
// utils
import axios from '../../utils/axios';

// third-party
import { useIntl } from 'react-intl';
// material-ui
// @mui
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  LinearProgress,
  Stack
} from '@mui/material';


export default function PrivacyPolicyModal({ open, handleCloseModal }) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState('');

  const intl = useIntl();

  const initialize = useCallback(async () => {
    if (open) {     
      if (data === '') {
        setIsLoading(true);
        try {
          const response = await axios.get('/api/privacy-policy');
          setData(response.data);
          setIsLoading(false);
        } catch (error) {
          setData(error.message);
          setIsLoading(false);
        }
      }  
    } else {
      setData('');
    }
  }, [open]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <Dialog open={open} maxWidth="md" fullWidth={true} scroll="paper" PaperProps={{ sx: { height: "100%" } }}>
      <DialogTitle sx={{ pb: 2 }}>
        {intl.formatMessage({id: 'privacy-policy'})}
      </DialogTitle>

      <DialogContent dividers={true}>
        {isLoading ? (
          <Stack justifyContent="center" alignItems="center" sx={{ width: '100%', height: '100%' }}>
            <LinearProgress sx={{ width: 1, maxWidth: 320 }} />
          </Stack>
        ) : (
          <DialogContentText id="scroll-dialog-description" dangerouslySetInnerHTML={{__html: data}} />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal} variant="contained">
          {intl.formatMessage({id: 'close'})}
        </Button>
      </DialogActions>
    </Dialog>
  );
}