import {
    filesDb
} from "../../database";

export default function (apiUrl) {

    const uploadFile = async (token, folderId, file, filename) => {

        return new Promise(async (resolve, reject) => {

            try {
                var myHeaders = new Headers();
                myHeaders.append("Authorization", token);
                myHeaders.append("Accept", "application/json");

                var formdata = new FormData();
                formdata.append("uploadedFile", file, filename);

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: formdata,
                };

                var fileId = '';
                await fetch(apiUrl + "/files/" + folderId + "/upload", requestOptions)
                    .then(response => response.json())
                    .then(result => fileId = result.response.id)
                    .catch(error => console.log('upload file api error', error));

                resolve(fileId);
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }


    const getSharedLink = async (token, fileId) => {

        return new Promise(async (resolve, reject) => {

            try {
                var myHeaders = new Headers();
                myHeaders.append("Authorization", token);
                myHeaders.append("Accept", "application/json");

                var raw = JSON.stringify({
                    "share": 1
                });

                var requestOptions = {
                    method: 'PUT',
                    headers: myHeaders,
                    body: raw,
                };

                var sharedLink = '';
                await fetch(apiUrl + "/files/" + fileId + "/sharedlink", requestOptions)
                    .then(response => response.json())
                    .then(result => sharedLink = result.response)
                    .catch(error => console.log('get shared link api error', error));

                resolve(sharedLink);
            } catch (error) {
                console.log(error);
                reject();
            }
        });
    }

    const shareFile = async (token, fileId, shareTo, access, dbFileId) => {

        return new Promise(async (resolve, reject) => {
            try {
                var myHeaders = new Headers();
                myHeaders.append("Authorization", token);
                myHeaders.append("Accept", "application/json");
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                    "share": [{
                        "shareTo": shareTo,
                        "access": access
                    }],
                    "notify": false,
                });

                var requestOptions = {
                    method: 'PUT',
                    headers: myHeaders,
                    body: raw,
                };

                var data = '';
                await fetch(apiUrl + "/files/file/" + fileId + "/share", requestOptions)
                    .then(response => response.json())
                    .then(result => data = result) //console.log(result)
                    .catch(error => console.log('share api error:', error));

                const sharedLink = data.response[0].sharedTo.shareLink;
                await filesDb.updateOnlyofficeSharedLink(dbFileId, sharedLink);

                resolve(data);
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }


    const deleteFile = async (token, fileId) => {

        return new Promise(async (resolve, reject) => {
            try {
                var myHeaders = new Headers();
                myHeaders.append("Authorization", token);
                myHeaders.append("Accept", "application/json");
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                    "deleteAfter": true,
                    "immediately": true,
                });

                var requestOptions = {
                    method: 'DELETE',
                    headers: myHeaders,
                    body: raw,
                };

                var data = '';
                await fetch(apiUrl + "/files/file/" + fileId, requestOptions)
                    .then(response => response.json())
                    .then(result => data = result) //console.log(result)
                    .catch(error => console.log('delete file api error:', error));

                resolve(data);
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }


    const createFolder = async (token, parentFolderId, title) => {

        return new Promise(async (resolve, reject) => {
            try {
                var myHeaders = new Headers();
                myHeaders.append("Authorization", token);
                myHeaders.append("Accept", "application/json");
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                    "title": title,
                });

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                };

                var folderId = '';
                await fetch(apiUrl + "/files/folder/" + parentFolderId, requestOptions)
                    .then(response => response.json())
                    .then(result => folderId = result.response.id) //  console.log(result)
                    .catch(error => console.log('create folder api error:', error));

                resolve(folderId);
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }


    const deleteFolder = async (token, folderId) => {

        return new Promise(async (resolve, reject) => {
            try {
                var myHeaders = new Headers();
                myHeaders.append("Authorization", token);
                myHeaders.append("Accept", "application/json");
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                    "deleteAfter": true,
                    "immediately": true,
                });

                var requestOptions = {
                    method: 'DELETE',
                    headers: myHeaders,
                    body: raw,
                };

                var data = '';
                await fetch(apiUrl + "/files/folder/" + folderId, requestOptions)
                    .then(response => response.json())
                    .then(result => data = result) //console.log(result)
                    .catch(error => console.log('delete folder api error:', error));

                resolve(data);
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }

    const shareFolder = async (token, folderId, shareTo, access, dbFolderId) => {

        return new Promise(async (resolve, reject) => {
            try {
                var myHeaders = new Headers();
                myHeaders.append("Authorization", token);
                myHeaders.append("Accept", "application/json");
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                    "share": [{
                        "shareTo": shareTo,
                        "access": access
                    }],
                    "notify": false,
                });

                var requestOptions = {
                    method: 'PUT',
                    headers: myHeaders,
                    body: raw,
                };

                var data = '';
                await fetch(apiUrl + "/files/folder/" + folderId + "/share", requestOptions)
                    .then(response => response.json())
                    .then(result => data = result) //console.log(result)
                    .catch(error => console.log('share folder api error:', error));

                // const sharedLink = data.response[0].sharedTo.shareLink;
                // await filesDb.updateOnlyofficeSharedLink(dbFolderId, sharedLink);

                resolve(data);
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }

    return {
        uploadFile,
        getSharedLink,
        shareFile,
        deleteFile,
        createFolder,
        deleteFolder,
        shareFolder,
    }
};