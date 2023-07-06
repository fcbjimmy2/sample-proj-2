// database
import { userDb } from '../../../../database'
// API Guard
import { apiAuthGuard } from '../../../../src/utils/apiGuard';

import {
    onlyofficeAuth,
    onlyofficeUser,
} from '../../../../helper/onlyoffice';

// ----------------------------------------------------------------------

export default function handler(req, res) {
    apiAuthGuard(req, res, ['GET', 'PUT', 'DELETE'], async (i18n) => {
        try {
            const {
                method,
                body,
                query
            } = req;
            const userId = req.query.id;

            if (method === 'GET') {
                let user = await userDb.getStaffById(req.query.id);
                return res.status(200).json(user);
            } else if (method === 'PUT') {
                const password = '123456';

                var staffObj = body;
                staffObj.password = password

                const user = await userDb.updateStaff(staffObj);
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

            } else if (method === 'DELETE') {

                const staff = await userDb.getStaffById(userId);

                if(staff)
                {
                    const token = await onlyofficeAuth.getAuthToken();
                    const oUserId = await onlyofficeUser.deleteUser(token, staff.onlyoffice_id);
                    if(oUserId)
                    {
                        const user = await userDb.deleteStaff(userId);
                        console.log(user);
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
                else
                {
                    return res.status(400).json({
                        message: 'staff not found'
                    });
                }
            }
        } catch (e) {
            console.log(e);
            return res.status(500).json({
                message: i18n.__('internal-server-error')
            });
        }
    });
}
