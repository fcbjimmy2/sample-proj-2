// third-party
import { combineReducers } from 'redux';

// project imports
import calendar from './slices/calendar';
import chat from './slices/chat';
import datatable from './slices/datatable';
import kanban from './slices/kanban';
import mail from './slices/mail';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    calendar: calendar,
    chat: chat,
    datatable: datatable,
    kanban: kanban,
    mail: mail,
});

export default reducer;
