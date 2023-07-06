import {
    apiAuthGuard
} from '../../../../src/utils/apiGuard';

// data
import {
    mailDb
} from '../../../../database';
// ----------------------------------------------------------------------

export default function handler(req, res) {
    apiAuthGuard(req, res, ['GET', 'PUT', 'POST'], async (i18n, loggedInUser) => {
        try {
            const {
                method,
                body,
                query
            } = req;
            if (method === 'GET') {
                var result = await mailDb.getMailById(query.mailId, loggedInUser.email);
                if (result) {
                    var mail = {
                        id: result.mail_id,
                        labelIds: [],
                        folder: result[0].folder,
                        isImportant: result[0].is_important,
                        isStarred: result[0].is_starred,
                        isUnread: result[0].is_unread,
                        subject: result[0].subject,
                        message: result[0].message,
                        createdAt: result[0].created_at,
                        attachments: [],
                        from: JSON.parse(result[0].from_user),
                        to: JSON.parse(result[0].to_user),
                    };
                    const data = {
                        "mail": mail
                    };
                    return res.status(200).json(data);
                }
            } else if (method === 'POST') {
                const {
                    to,
                    subject,
                    message
                } = body;

                const from = {
                    name: loggedInUser.full_name,
                    email: loggedInUser.email,
                    avatar: null,
                }

                const result = await mailDb.createMail(from, to, subject, message);
                if (result) {
                    return res.status(200).json({});
                } else {
                    return res.status(500).json({
                        message: i18n.__('internal-server-error')
                    });
                }
            } else if (method === 'PUT') {
                const {
                    action,
                    value
                } = body;
                
                var result = '';
                if(action == 'starred')
                {
                    result = await mailDb.changeMailStarred(query.mailId, value);
                }
                else if (action == 'important')
                {
                    result = await mailDb.changeMailImportant(query.mailId, value);
                }
                else if (action == 'trash')
                {
                    result = await mailDb.moveMailToTrash(query.mailId);
                }
                else if (action == 'unread')
                {
                    result = await mailDb.changeMailUnread(query.mailId, value);
                }
                else if (action == 'delete')
                {
                    result = await mailDb.deleteMail(query.mailId);
                }

                if (result) {
                    return res.status(200).json({});
                } else {
                    return res.status(500).json({
                        message: i18n.__('internal-server-error')
                    });
                }
            }
        } catch (e) {
            console.log(e);
            return res.status(500).json({
                message: i18n.__('internal-server-error')
            });
        }
    })
}