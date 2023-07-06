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
        const { method, body } = req;
        if (method === 'GET') {
            try {

                var labels = [
                    {id: "all",type: "system",name: "Mail-Label-all mail",unreadCount: 0},
                    {id: "inbox",type: "system",name: "Mail-Label-inbox",unreadCount: 0},
                    {id: "sent",type: "system",name: "Mail-Label-sent",unreadCount: 0},
                    {id: "trash",type: "system",name: "Mail-Label-trash",unreadCount: 0},
                    {id: "important",type: "system",name: "Mail-Label-important",unreadCount: 0},
                    {id: "starred",type: "system",name: "Mail-Label-starred",unreadCount: 0},
                ]

                const result = await mailDb.getUnreadCountByUserEmail(loggedInUser.email);

                var totalUnread = 0;
                result.forEach((data) => {
                    var index = -1;
                    index = labels.findIndex(x => x.id == data.folder)
                    if(index != -1) {
                        labels[index].unreadCount = data.unread;
                        totalUnread += data.folder == 'sent' || data.folder == 'trash' ? 0 : data.unread;
                    }
                    else{
                        console.log('unknown folder: ' + data.folder);
                    }
                    // more logic for below label. ( maybe )
                    // if(data.is_important)
                    // {

                    // }
                    // if(data.is_starred)
                    // {
                        
                    // }
                })
                labels[0].unreadCount = totalUnread;

                const data = {
                    "labels": labels
                };
                return res.status(200).json(data);
            } catch (e) {
                console.log(e);
                return res.status(500).json({
                    message: i18n.__('internal-server-error')
                });
            }
        }
    })
}