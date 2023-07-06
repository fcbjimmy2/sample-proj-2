// data
import {
  filesDb
} from '../../../database';

import {
  onlyofficeAuth,
  onlyofficeFile,
} from '../../../helper/onlyoffice';

import {
  apiAuthGuard
} from '../../../src/utils/apiGuard';


// ----------------------------------------------------------------------

export default async function handler(req, res) {
  apiAuthGuard(req, res, ['GET', 'POST'], async (i18n, loggedInUser) => {

    if (req.method === 'GET') {
      const result = await filesDb.getRootFolders();
      return res.status(200).json(result);
    } else if (req.method === 'POST') {
      try {
        const {
          folder_name
        } = req.body;

        const token = await onlyofficeAuth.getAuthToken();
        const onlyofficeId = await onlyofficeFile.createFolder(token, '2', folder_name); // 2 is referring to default folder created by onlyoffice installation

        if (onlyofficeId) {
          const result = await filesDb.newFolder(null, folder_name, onlyofficeId);
          const folderId = result.folder_id;
          const folderInfo = await filesDb.getFolderInfoByFolderId(folderId);
          // const result2 = await filesDb.updateFolderOnlyofficeId(folderId, onlyofficeId);

          const response = ({
            id: `${folderId}_${onlyofficeId}_folders`,
            name: folder_name,
            size: '',
            type: 'folder',
            totalFiles: 0,
            isFavorited: false,
            shared: [],
            url: '',
            tags: ['Folders'],
            dateCreated: new Date(folderInfo.create_date),
            dateModified: new Date(folderInfo.modify_date),
          })

          return res.status(200).json(response);
        } else {
          res.status(400).send({
            status: "Create folder failed"
          });
        }
        return;
      } catch (e) {
        console.log(e);
        res.status(500).send({
          status: "something went wrong"
        });
        return;
      }
    }
  })
}