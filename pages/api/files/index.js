// data
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

import formidable from "formidable";
import * as yup from "yup";
import fs from "fs";

// ----------------------------------------------------------------------

export default async function handler(req, res) {
  apiAuthGuard(req, res, ['GET', 'POST'], async (i18n, loggedInUser) => {
    if (req.method === 'GET') {
      const user = await userDb.getUserByUsernameOrEmail(loggedInUser.email);
      const result = await filesDb.getRootFiles(user.user_id, loggedInUser.role);
      return res.status(200).json(result);
    } else if (req.method === 'POST') {
      await handlePostFormReq(req, res);
    }
  })
}


let formSchema = yup.object().shape({
  file: yup.mixed().required(),
});

async function handlePostFormReq(req, res) {
  const form = formidable({
    multiples: true
  });

  const formData = new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        reject("error");
      }
      resolve({
        fields,
        files
      });
    });
  });

  try {
    const {
      fields,
      files
    } = await formData;
    const isValid = await validateFromData(fields, files);
    if (!isValid) throw Error("invalid form schema");

    try {

      const response = await saveFormData("", fields, files);

      res.status(200).json(response);
      return;
    } catch (e) {
      console.log(e);
      res.status(500).send({
        status: "something went wrong"
      });
      return;
    }
  } catch (e) {
    console.log(e);
    res.status(400).send({
      status: "invalid submission"
    });
    return;
  }
}

async function saveFormData(folderId, fields, files) {
  const token = await onlyofficeAuth.getAuthToken();

  const fileArray = [];
  if (Array.isArray(files.file)) {
    for(const data of files.file) {
      fileArray.push(data);
    }
  } else {
    fileArray.push(files.file);
  }

  const response = [];

  for(const data of fileArray) {
    console.log("data: " + data);
    let oldPath = data.filepath;
    let rawData = fs.readFileSync(oldPath)
    const blob = new Blob([rawData], {
      type: data.minetype
    });

    const onlyofficeId = await onlyofficeFile.uploadFile(token, '2', blob, data.originalFilename); // 2 is referring to default folder created by onlyoffice installation
    if (onlyofficeId) {
      const sharedLink = await onlyofficeFile.getSharedLink(token, onlyofficeId);
      const result = await filesDb.uploadFile(null, data.originalFilename, data.size, onlyofficeId, sharedLink);
      const fileId = result.file_id;
      // const result2 = await filesDb.updateOnlyofficeId(fileId, onlyofficeId);
      const fileInfo = await filesDb.getFileInfoByFileId(fileId);

      response.push({
        id: `${fileId}_${onlyofficeId}`,
        name: fileInfo.file_name,
        size: data.size,
        type: fileInfo.file_type,
        isFavorited: false,
        shared: [],
        sharedLink: sharedLink,
        url: '',
        tags: ['Documents'],
        dateCreated: new Date(fileInfo.create_date),
        dateModified: new Date(fileInfo.modify_date),
      });
    }
  }

  return response;
}

async function validateFromData(fields, files) {
  try {
    await formSchema.validate({
      ...fields,
      ...files
    });
    return true;
  } catch (e) {
    return false;
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};