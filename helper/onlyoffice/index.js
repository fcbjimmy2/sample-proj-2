import { 
    ONLYOFFICE_API_URL
} from '../../src/config';

const apiUrl = ONLYOFFICE_API_URL;

export const onlyofficeAuth = require('./auth').default(apiUrl);
export const onlyofficeUser = require('./user').default(apiUrl);
export const onlyofficeFile = require('./file').default(apiUrl);