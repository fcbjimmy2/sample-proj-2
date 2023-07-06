// database
import {
    userDb
} from '../../../../database'
// API Guard
import {
    apiAuthGuard
} from '../../../../src/utils/apiGuard';

import {
    onlyofficeAuth,
    onlyofficeUser,
} from '../../../../helper/onlyoffice';

// ----------------------------------------------------------------------

export default async function handler(req, res) {
    apiAuthGuard(req, res, ['POST', 'PUT', 'DELETE'], async (i18n) => {
        try {
            const {
                method,
                body,
                query
            } = req;

            if (method === 'POST') {
                const { name, phone, mobile, email, citizen_id, full_name, local_name, gender, locale, role, remark, center, salary, photo, timezone, region, enabled } = body;

                const userExist = await userDb.getUserByEmail(email);

                if(userExist)
                {
                    return res.status(400).json({
                        message: 'Email already exist'
                    });
                }
                else
                {
                    const token = await onlyofficeAuth.getAuthToken();
                    const oUserId = await onlyofficeUser.createUser(token, email, full_name, '');
                    // const oUserId = '14770660-f4fb-4924-b12c-cd87ce5eda3d' // kchik2@apex.hk 
                    const password = '123456';
                    if(oUserId)
                    {
                        var staffObj = body;
                        staffObj.onlyoffice_id = oUserId
                        staffObj.password = password
                        const user = await userDb.createStaff(staffObj);
                        if(user)
                        {
                            return res.status(200).json(user);
                        }
                        else
                        {
                            return res.status(400).json({
                                message: i18n.__('internal-server-error')
                            });
                        }
                    }
                    else
                    {
                        return res.status(400).json({
                            message: i18n.__('internal-server-error')
                        });
                    }
                }
            } else if (method === 'PUT') {

            } else if (method === 'DELETE') {

            }
        } catch (e) {
            console.log(e);
            return res.status(500).json({
                message: i18n.__('internal-server-error')
            });
        }
    });
}