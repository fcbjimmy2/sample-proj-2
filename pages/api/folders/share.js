import {
    filesDb,
    userDb
} from '../../../database';

import {
    onlyofficeAuth,
    onlyofficeFile,
} from '../../../helper/onlyoffice';

import {
    apiAuthGuard
} from '../../../src/utils/apiGuard';


export default async function handler(req, res) {
    apiAuthGuard(req, res, ['POST'], async (i18n, loggedInUser) => {
        if (req.method === 'POST') {
            try {
                const data = req.body;
                const {
                    combined_id,
                    user_id,
                    access
                } = req.body;

                const combinedId = combined_id;
                const userId = user_id;

                const folderId = combinedId.split("_")[0];
                const onlyOfficeFolderId = combinedId.split("_")[1];

                const result = await (access.toUpperCase() === "DELETE" ? filesDb.removeShareFolder(folderId, userId) : filesDb.shareFolder(folderId, userId, access));

                if (result.status === 'success') {

                    const userData = await userDb.getUserById(userId);
                    const onlyofficeUserId = userData.onlyoffice_id;
                    const onlyOfficeAccess = access.toUpperCase() === "EDIT" ? "1" : (access.toUpperCase() === "VIEW" ? 2 : 3);

                    const token = await onlyofficeAuth.getAuthToken();
                    const shared = await onlyofficeFile.shareFolder(token, onlyOfficeFolderId, onlyofficeUserId, onlyOfficeAccess, folderId);

                    const latestShared = await filesDb.getSharedByFolderId(folderId, combinedId);

                    return res.status(200).json(latestShared);
                } else {
                    return res.status(500).json({
                        message: result.message
                    });
                }

            } catch (error) {
                console.log(error.message);
                return res.status(500).json({
                    message: error.message
                });
            }
        }
    })
}