import { useEffect, useState, useMemo } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { Container, Card, Stack } from '@mui/material';
// redux
// import { useDispatch, useSelector } from '../../redux/store';
// import { getMail, getLabels, getMails } from '../../redux/slices/mail';
import { useDispatch, useSelector } from '../../store';
import { getMail, getLabels, getMails } from '../../store/slices/mail';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import MailNav from './nav/MailNav';
import MailList from './list/MailList';
import MailHeader from './header/MailHeader';
import MailDetails from './details/MailDetails';
import MailComposePortal from './MailComposePortal';
import MailHeaderDetails from './header/MailHeaderDetails';
// utils
import axios from '../../../src/utils/axios';

// third-party
import { useIntl } from 'react-intl';

// ----------------------------------------------------------------------

export default function Mail() {

  const intl = useIntl();

  const dispatch = useDispatch();

  const { push, query: params } = useRouter();

  const { mailId } = params;

  const { mails, labels, isLoading } = useSelector((state) => state.mail);

  const mail = useSelector((state) => state.mail.mails.byId[mailId]);

  const [dense, setDense] = useState(false);

  const [openNav, setOpenNav] = useState(false);

  const [openCompose, setOpenCompose] = useState(false);

  const [selectedMails, setSelectedMails] = useState([]);
  
  const [emailList, setEmailList] = useState([]);

  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    dispatch(getMails(params));
  }, [dispatch, params, refresh]);

  useEffect(() => {
    if (mailId) {
      dispatch(getMail(mailId));
    }
  }, [dispatch, mailId]);

  useEffect(() => {
    dispatch(getLabels());
  }, [dispatch, refresh]);

  useEffect(() => {
    if (openCompose) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [openCompose]);

  useEffect(() => {
    axios.get('/api/user/emailAddr')
    .then((response) => { setEmailList(response.data); })
    .catch((error) => { console.log(error); });
  }, [])

  const handleRefresh = () => {
    setSelectedMails([]);
    setRefresh(!refresh);
  }

  const handleToggleDense = () => {
    setDense(!dense);
  };

  const handleOpenNav = () => {
    setOpenNav(true);
  };

  const handleCloseNav = () => {
    setOpenNav(false);
  };

  const handleOpenCompose = () => {
    setOpenCompose(true);
  };

  const handleCloseCompose = () => {
    setOpenCompose(false);
  };

  const handleSelectMail = (selectedMailId) => {
    setSelectedMails((mailIds) => {
      if (!mailIds.includes(selectedMailId)) {
        return [...mailIds, selectedMailId];
      }
      return mailIds;
    });
  };

  const handleSelectAllMails = () => {
    setSelectedMails(mails.allIds.map((id) => id));
  };

  const handleDeselectMail = (selectedMailId) => {
    setSelectedMails((selected) => selected.filter((id) => id !== selectedMailId));
  };

  const [filterText, setFilterText] = useState('');
  const [filteredMail, setFilteredMail] = useState(mails);
  useEffect(() => {
    // console.log(mails);
    setSelectedMails([]);
    if(filterText)
    {
      var allIds = [];
      var byId = {};
      Object.keys(mails.byId).forEach(key => {
        // console.log(key);
        const { subject, message, from, to } = mails.byId[key];
        if(subject.toLowerCase().indexOf(filterText.toLowerCase()) !== -1)
        {
          byId[key] = mails.byId[key];
          if (allIds.indexOf(key) === -1)
          {
            allIds.push(key);
          }
        }
        else if(message.toLowerCase().indexOf(filterText.toLowerCase()) !== -1)
        {
          byId[key] = mails.byId[key];
          if (allIds.indexOf(key) === -1)
          {
            allIds.push(key);
          }
        }
        else if(from.name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1 || from.email.toLowerCase().indexOf(filterText.toLowerCase()) !== -1)
        {
          byId[key] = mails.byId[key];
          if (allIds.indexOf(key) === -1)
          {
            allIds.push(key);
          }
        }
      })
      setFilteredMail({byId, allIds});
    }
    else
    {
      setFilteredMail(mails);
    }
  }, [mails, filterText])
  
  const handleFilterChange = (t) => {
    setFilterText(t);
  };

  const handleDeselectAllMails = () => {
    setSelectedMails([]);
  };

  const handleDelete = async () => {

    var raw = JSON.stringify({
      "action": params.systemLabel == "trash" ? "delete" : "trash",
      "value" : 1,
    });

    const promises = selectedMails.map((id) => axios.put("/api/mail/mail/?mailId=" + filteredMail.byId[id].id, raw, { headers: {'Content-Type': 'application/json'} }));
    if(promises)
    {
      Promise.all([...promises]).then(function (values) {
        handleRefresh();
      });
    }

  };
  
  const handleMarkAsRead = async () => {

    var raw = JSON.stringify({
      "action": "unread",
      "value" : 0,
    });

    const promises = selectedMails.map((id) => axios.put("/api/mail/mail/?mailId=" + filteredMail.byId[id].id, raw, { headers: {'Content-Type': 'application/json'} }));
    if(promises)
    {
      Promise.all([...promises]).then(function (values) {
        handleRefresh();
      });
    }
  };
  

  return (
    <>
      <Container maxWidth={false}>
        <CustomBreadcrumbs
          heading={intl.formatMessage({id: 'Mail'})}
          links={[
            {
              name: intl.formatMessage({id: 'home' }),
              href: PATH_DASHBOARD.root,
            },
            { name: intl.formatMessage({id: 'Mail'}) },
          ]}
        />
        <Card
          sx={{
            height: { md: '72vh' },
            display: { md: 'flex' },
          }}
        >
          <MailNav
            items={labels}
            openNav={openNav}
            onCloseNav={handleCloseNav}
            onOpenCompose={handleOpenCompose}
          />

          <Stack flexGrow={1} sx={{ overflow: 'hidden' }}>
            {mail ? (
              <>
                <MailHeaderDetails
                  mailFrom={mail.from}
                  mailTo={mail.to}
                  createdAt={mail.createdAt}
                />
                <MailDetails
                  subject={mail.subject}
                  message={mail.message}
                  attachments={mail.attachments}
                  to={mail.from}
                />
              </>
            ) : (
              <>
                <MailHeader
                  onOpenNav={handleOpenNav}
                  mailsLength={filteredMail.allIds.length}
                  selectedMailsLength={selectedMails.length}
                  onSelectAllMails={handleSelectAllMails}
                  onDeselectAllMails={handleDeselectAllMails}
                  onToggleDense={handleToggleDense}
                  onFilterChange={handleFilterChange}
                  onRefresh={handleRefresh}
                  onDelete={handleDelete}
                  onMarkAsRead={handleMarkAsRead}
                />
                <MailList
                  dense={dense}
                  mails={filteredMail}
                  labels={labels}
                  onSelectMail={(id) => handleSelectMail(id)}
                  onDeselectMail={(id) => handleDeselectMail(id)}
                  selectedMails={(id) => selectedMails.includes(id)}
                  isLoading={isLoading}
                  isEmpty={!filteredMail.allIds.length && !isLoading}
                />
              </>
            )}
          </Stack>
        </Card>
      </Container>

      {openCompose && <MailComposePortal onCloseCompose={handleCloseCompose} emailList={emailList}/>}
    </>
  );
}