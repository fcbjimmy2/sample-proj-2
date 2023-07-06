import PropTypes from 'prop-types';
// next
import { useRouter } from 'next/router';

import { useRef, useState } from 'react';
// @mui
import { Button, IconButton, InputBase, Stack } from '@mui/material';
// components
import Iconify from '../../../components/Iconify';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// utils
import axios from '../../../../src/utils/axios';

// third-party
import { useIntl } from 'react-intl';

MailDetailsReplyInput.propTypes = {
  subject: PropTypes.string,
  to: PropTypes.object,
};

export default function MailDetailsReplyInput({subject, to}) {

  const intl = useIntl();

  const baseUrl = PATH_DASHBOARD.mail.root;
  
  const {
    push,
    query: { systemLabel },
  } = useRouter();

  const fileInputRef = useRef(null);

  const [message, setMessage] = useState('');

  const handleChangeMessage = (event) => {
    setMessage(event.target.value);
  };

  const handleClickAttach = () => {
    fileInputRef.current?.click();
  };

  const handleReply = async () => {
      var raw = JSON.stringify({
        "to": [to],
        "subject": "RE: " + subject,
        "message": message
      });

      await axios.post("/api/mail/mail", raw, { headers: {'Content-Type': 'application/json'} })
      .then((response) => { push(`${baseUrl}/${systemLabel}`) })
      .catch((error) => { console.log(error); });
  };

  return (
    <>
      <InputBase
        fullWidth
        multiline
        minRows={2}
        maxRows={8}
        value={message}
        placeholder={intl.formatMessage({id: 'Mail-Type a message'})}
        onChange={handleChangeMessage}
        sx={{
          p: 2,
          borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      />

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{
          p: (theme) => theme.spacing(0, 3, 3, 0),
        }}
      >
        {/* <IconButton size="small" onClick={handleClickAttach}>
          <Iconify icon="ic:round-add-photo-alternate" />
        </IconButton>

        <IconButton size="small" onClick={handleClickAttach}>
          <Iconify icon="eva:attach-2-fill" />
        </IconButton> */}

        <Button variant="contained" sx={{ ml: 2 }} onClick={() => handleReply()} disabled={!message || !subject || !to}>
          {intl.formatMessage({id: 'Mail-Send'})}
        </Button>
      </Stack>

      <input type="file" ref={fileInputRef} style={{ display: 'none' }} />
    </>
  );
}
