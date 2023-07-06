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


export default async function handler(req, res) {
  apiAuthGuard(req, res, ['GET', 'POST', 'DELETE'], async (i18n, loggedInUser) => {
    const { id } = req.query;
    if (req.method === 'GET') {
      const result = await filesDb.getFoldersByFolderId(id);
      return res.status(200).json(result);
    } else if (req.method === 'POST') {
      try {
        const {
          folder_name
        } = req.body;

        const folderInfo = await filesDb.getFolderInfoByFolderId(id);
        if (folderInfo) {
          const token = await onlyofficeAuth.getAuthToken();
          const onlyofficeId = await onlyofficeFile.createFolder(token, folderInfo[0].onlyoffice_id, folder_name);

          if (onlyofficeId) {

            const result = await filesDb.newFolder(id, folder_name, onlyofficeId);
            const folderId = result.folder_id;

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
        } else {
          res.status(400).send({
            status: "Folder not exists"
          });
        }
      } catch (e) {
        console.log(e);
        res.status(500).send({
          status: "something went wrong"
        });
        return;
      }
    } else if (req.method === 'DELETE') {
      try {
        const ids = id.split("_");
        const result = await filesDb.deleteFolder(ids[0]);
        if (result) {
          const token = await onlyofficeAuth.getAuthToken();
          const result2 = await onlyofficeFile.deleteFolder(token, ids[1]);

          return res.status(200).json(result);
        } else {
          res.status(400).send({
            status: "Delete folder failed"
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