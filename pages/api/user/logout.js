// database
import { userDb } from '../../../database'
// API Guard
import { apiAuthGuard } from '../../../src/utils/apiGuard';
//
import { userAgentFromString } from "next/server";

// ----------------------------------------------------------------------

export default async function handler(req, res) {
    apiAuthGuard(req, res, ['DELETE'], async (i18n, loggedInUser) => {
        try {
            const { headers } = req;

            const { os, browser } = userAgentFromString(headers['user-agent']);
    
            await userDb.deleteUserSignedInDevice(loggedInUser.id, browser.name, os.name, headers['x-csrf-token'], loggedInUser.access_token);

            return res.status(204).send();
        } catch(e) {
            if (e == "Data is incompleted") {
                return res.status(401).json({ message: i18n.__('unauthorized') });
            } else {
                return res.status(500).json({ message: i18n.__('unexpected-error-occurred') });
            }
        }
    })
}
