// database
import { userDb } from '../../../../database'
// API Guard
import { apiAuthGuard } from '../../../../src/utils/apiGuard';
//
import * as bcrypt from 'bcrypt';

// ----------------------------------------------------------------------

export default function handler(req, res) {
    apiAuthGuard(req, res, ['PUT'], async (i18n, loggedInUser) => {
        try {
            const { body } = req;
            
            const { currentPassword, newPassword } = body;
            if (!currentPassword || !newPassword) {
                return res.status(400).json({ message: i18n.__('please-enter-all-required-fields') });
            }

            const passwordIsValid = bcrypt.compareSync(currentPassword, loggedInUser.password);
            if (passwordIsValid) {
                await userDb.changePassword(loggedInUser.id, newPassword);
                return res.status(204).send();
            } else {
                return res.status(400).json({ message: i18n.__('current-password-incorrect"') });
            }
        } catch (e) {
            return res.status(500).json({ message: i18n.__('unexpected-error-occurred') });
        }
    })
}
