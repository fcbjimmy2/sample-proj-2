import { useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { Card, Container, Stack } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../store';
import {
  getContacts,
  getConversation,
  getParticipants,
  getConversations,
  addRecipients,
  sendMessage,
  markConversationAsRead,
  resetActiveConversation,
} from '../../../store/slices/chat';
// sections
import ChatNav from './nav/ChatNav';
import ChatRoom from './room/ChatRoom';
import ChatMessageInput from './message/ChatMessageInput';
import ChatMessageList from './message/ChatMessageList';
import ChatHeaderDetail from './header/ChatHeaderDetail';
import ChatHeaderCompose from './header/ChatHeaderCompose';

// ----------------------------------------------------------------------

const CURRENT_USER_ID = '8864c717-587d-472a-929a-8e5f298024da-0';

export default function Chat({path}) {

  const dispatch = useDispatch();

  const {
    push,
    pathname,
    query: { conversationKey },
  } = useRouter();

  const { contacts, recipients, participants, activeConversationId, conversations } = useSelector(
    (state) => state.chat
  );

  const selectedConversation = useSelector(() => {
    if (activeConversationId) {
      return conversations.byId[activeConversationId];
    }

    return {
      id: '',
      messages: [],
      participants: [],
      unreadCount: 0,
      type: '',
    };
  });

  const detailView = !!conversationKey;

  const displayParticipants = participants.filter((item) => item.id !== CURRENT_USER_ID);

  useEffect(() => {
    dispatch(getConversations());
    dispatch(getContacts());
  }, [dispatch]);

  useEffect(() => {
    const getDetails = async () => {
      dispatch(getParticipants(`${conversationKey}`));
      try {
        await dispatch(getConversation(`${conversationKey}`));
      } catch (error) {
        console.error(error);
        push(`${path}/new`);
      }
    };

    if (conversationKey) {
      getDetails();
    } else if (activeConversationId) {
      dispatch(resetActiveConversation());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationKey]);

  useEffect(() => {
    if (activeConversationId) {
      dispatch(markConversationAsRead(activeConversationId));
    }
  }, [dispatch, activeConversationId]);

  const handleAddRecipients = (selectedRecipients) => {
    dispatch(addRecipients(selectedRecipients));
  };

  const handleSendMessage = async (value) => {
    try {
      dispatch(sendMessage(value));
    } catch (error) {
      console.error(error);
    }
  };

  return (
      <Card sx={{ height: '72vh', display: 'flex' }}>
        <ChatNav path={path} conversations={conversations} activeConversationId={activeConversationId} />

        <Stack flexGrow={1} sx={{ overflow: 'hidden' }}>
          {detailView ? (
            <ChatHeaderDetail participants={displayParticipants} />
          ) : (
            <ChatHeaderCompose
              recipients={recipients}
              contacts={Object.values(contacts.byId)}
              onAddRecipients={handleAddRecipients}
            />
          )}

          <Stack
            direction="row"
            flexGrow={1}
            sx={{
              overflow: 'hidden',
              borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
            }}
          >
            <Stack flexGrow={1} sx={{ minWidth: 0 }}>
              <ChatMessageList conversation={selectedConversation} />

              <ChatMessageInput
                conversationId={activeConversationId}
                onSend={handleSendMessage}
                disabled={
                  pathname === path || pathname === `${path}/new`
                }
              />
            </Stack>

            {detailView && (
              <ChatRoom conversation={selectedConversation} participants={displayParticipants} />
            )}
          </Stack>
        </Stack>
      </Card>
  );
}
