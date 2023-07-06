// database
import { userDb } from '../../../../database'
// API Guard
import { apiAuthGuard } from '../../../../src/utils/apiGuard';

// ----------------------------------------------------------------------

export default function handler(req, res) {
    apiAuthGuard(req, res, ['GET', 'PUT'], async (i18n, loggedInUser) => {
        const { method, body } = req;
        
        if (method === 'GET') {
            const user = {
                id: loggedInUser.id,
                username: loggedInUser.username, 
                role: loggedInUser.role, 
                email: loggedInUser.email,
                fullName: loggedInUser.full_name,
                photo: loggedInUser.photo,
                onlyoffice_token: loggedInUser.onlyoffice_token,
            }
            return res.status(200).json({ user });    
        } else if (method === 'PUT') {
            try {
                const { full_name } = body;
                if (!full_name) {
                    return res.status(400).json({ message: i18n.__('please-enter-all-required-fields') });
                }
                await userDb.updateUser(loggedInUser.role, loggedInUser.email, null, full_name, loggedInUser.id);
                return res.status(204).send();
            } catch (e) {
                return res.status(500).json({ message: i18n.__('unexpected-error-occurred') });
            }
        }
    })
}
