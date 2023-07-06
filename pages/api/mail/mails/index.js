import {
    apiAuthGuard
} from '../../../../src/utils/apiGuard';

// data
import {
    mailDb
} from '../../../../database';

// ----------------------------------------------------------------------

export default function handler(req, res) {
    apiAuthGuard(req, res, ['GET', 'PUT'], async (i18n, loggedInUser) => {
        const {
            method,
            body,
            query
        } = req;
        if (method === 'GET') {
            try {
                var result = await mailDb.getMailsByUser(loggedInUser.email, query.systemLabel);
                if (result) {
                    var mails = [];
                    result.forEach(data => {
                        mails.push({
                            id: data.mail_id,
                            labelIds: [],
                            folder: data.folder,
                            isImportant: data.is_important,
                            isStarred: data.is_starred,
                            isUnread: data.is_unread,
                            subject: data.subject,
                            message: data.message,
                            createdAt: data.created_at,
                            attachments: [],
                            from: JSON.parse(data.from_user),
                            to: JSON.parse(data.to_user),
                        })
                    });
                    const data = {
                        "mails": mails
                    };
                    return res.status(200).json(data);
                } else {
                    return res.status(500).json({
                        message: i18n.__('internal-server-error')
                    });
                }
            } catch (e) {
                return res.status(500).json({
                    message: i18n.__('internal-server-error')
                });
            }
        }
    })
}