export default function (mysqlPool) {

    const getRootFolders = async () => {
        return new Promise((resolve, reject) => {
            mysqlPool.query('SELECT * FROM fm_folders WHERE parent_folder_id IS NULL', async (error, result) => {
                if (error) {
                    return reject(error);
                }
                const fs = Array();

                for await (const row of result) {
                    const combinedFolderId = `${row.folder_id}_${row.onlyoffice_id}`;
                    const shared = await getSharedByFolderId(row.folder_id, combinedFolderId);
                    const files = await getFileCountByFolderId(row.folder_id);
                    const folders = await getFolderCountByFolderId(row.folder_id);

                    fs.push({
                        id: `${row.folder_id}_${row.onlyoffice_id}_folders`,
                        name: row.folder_name,
                        size: '',
                        type: 'folder',
                        totalFolders: folders[0].folder_count,
                        totalFiles: files[0].file_count,
                        isFavorited: false,
                        shared: shared,
                        url: '',
                        tags: ['Folders'],
                        dateCreated: new Date(row.create_date),
                        dateModified: new Date(row.modify_date),
                    });
                }
                return resolve(fs);
            });
        });
    };


    const getFoldersByFolderId = async (folderId) => {
        return new Promise((resolve, reject) => {
            mysqlPool.query('SELECT * FROM fm_folders WHERE IFNULL(parent_folder_id,"") = ?', [folderId], async (error, result) => {
                if (error) {
                    return reject(error);
                }
                const fs = Array();

                console.log(folderId);
                if (folderId != "") {

                    const folderInfo = await getFolderInfoByFolderId(folderId);
                    var pFid = folderInfo[0].parent_folder_id == null ? '' : folderInfo[0].parent_folder_id;
                    fs.push({
                        id: `${pFid}__folders`,
                        name: '...',
                        size: '',
                        type: 'folder',
                        totalFolders: 0,
                        totalFiles: 0,
                        isFavorited: false,
                        shared: [],
                        url: '',
                        tags: ['Folders'],
                        dateCreated: new Date(folderInfo[0].create_date),
                        dateModified: new Date(folderInfo[0].modify_date),
                    });
                }

                for await (const row of result) {
                    const combinedFolderId = `${row.folder_id}_${row.onlyoffice_id}`;
                    const shared = await getSharedByFolderId(row.folder_id, combinedFolderId);
                    const files = await getFileCountByFolderId(row.folder_id);
                    const folders = await getFolderCountByFolderId(row.folder_id);

                    fs.push({
                        id: `${row.folder_id}_${row.onlyoffice_id}_folders`,
                        name: row.folder_name,
                        size: '',
                        type: 'folder',
                        totalFolders: folders[0].folder_count,
                        totalFiles: files[0].file_count,
                        isFavorited: false,
                        shared: shared,
                        url: '',
                        tags: ['Folders'],
                        dateCreated: new Date(row.create_date),
                        dateModified: new Date(row.modify_date),
                    });
                }
                return resolve(fs);
            });
        });
    };


    const getFileCountByFolderId = async (folderId) => {
        return new Promise((resolve, reject) => {

            mysqlPool.query('SELECT COUNT(*) as file_count FROM fm_files WHERE IFNULL(folder_id,"") = ?', [folderId], async (error, result) => {
                if (error) {
                    return reject(error);
                }
                return resolve(result);
            });
        });
    };

    const getFolderCountByFolderId = async (folderId) => {
        return new Promise((resolve, reject) => {

            mysqlPool.query('SELECT COUNT(*) as folder_count FROM fm_folders WHERE IFNULL(parent_folder_id,"") = ?', [folderId], async (error, result) => {
                if (error) {
                    return reject(error);
                }
                return resolve(result);
            });
        });
    };

    const getRootFiles = async () => {
        return new Promise((resolve, reject) => {

            mysqlPool.query('SELECT * FROM fm_files WHERE folder_id IS NULL', async (error, result) => {
                if (error) {
                    return reject(error);
                }
                const fs = Array();

                for await (const row of result) {
                    const combinedFileId = `${row.file_id}_${row.onlyoffice_id}`;
                    const shared = await getSharedByFileId(row.file_id, combinedFileId);

                    fs.push({
                        id: `${row.file_id}_${row.onlyoffice_id}`,
                        name: row.file_name,
                        size: row.file_size,
                        type: row.file_type,
                        isFavorited: false,
                        shared: shared,
                        sharedLink: row.shared_link,
                        url: '',
                        tags: ['Documents'],
                        dateCreated: new Date(row.create_date),
                        dateModified: new Date(row.modify_date),
                    });
                }

                return resolve(fs);
            });

        });
    };

    const getFilesByFolderId = async (folderId) => {
        return new Promise((resolve, reject) => {

            mysqlPool.query('SELECT * FROM fm_files WHERE IFNULL(folder_id,"") = ?', [folderId], async (error, result) => {
                if (error) {
                    return reject(error);
                }
                const fs = Array();

                for await (const row of result) {
                    const combinedFileId = `${row.file_id}_${row.onlyoffice_id}`;
                    const shared = await getSharedByFileId(row.file_id, combinedFileId);

                    fs.push({
                        id: `${row.file_id}_${row.onlyoffice_id}`,
                        name: row.file_name,
                        size: row.file_size,
                        type: row.file_type,
                        isFavorited: false,
                        shared: shared,
                        sharedLink: row.shared_link,
                        url: '',
                        tags: ['Documents'],
                        dateCreated: new Date(row.create_date),
                        dateModified: new Date(row.modify_date),
                    });
                }

                return resolve(fs);
            });

        });
    };

    const getSharedByFileId = async (fileId, combinedFileId) => {
        return new Promise((resolve, reject) => {
            if (fileId) {
                mysqlPool.query('SELECT * FROM fm_files_share INNER JOIN users ON fm_files_share.user_id = users.id WHERE file_id = ?', [fileId], (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    const fs = Array();
                    result.forEach(row => {
                        fs.push({
                            user_id: `${row.id}`,
                            file_id: combinedFileId,
                            name: row.full_name,
                            email: row.email,
                            avatar: "",
                            permission: row.access,
                            type: "file",
                        });
                    });
                    return resolve(fs);
                });
            } else {
                return reject("Data is incompleted");
            }
        });
    }

    const getSharedByFolderId = async (folderId, combinedFolderId) => {
        return new Promise((resolve, reject) => {
            if (folderId) {
                mysqlPool.query('SELECT * FROM fm_folders_share INNER JOIN users ON fm_folders_share.user_id = users.id WHERE folder_id = ?', [folderId], (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    const fs = Array();
                    result.forEach(row => {
                        fs.push({
                            user_id: `${row.id}`,
                            folder_id: combinedFolderId,
                            name: row.full_name,
                            email: row.email,
                            avatar: "",
                            permission: row.access,
                            type: "folder",
                        });
                    });
                    return resolve(fs);
                });
            } else {
                return reject("Data is incompleted");
            }
        });
    }

    const uploadFile = (folderId, filename, size) => {
        return new Promise(async (resolve, reject) => {
            if (filename) {
                let sqlStr = 'INSERT INTO fm_files (folder_id, file_name, file_type, file_size) VALUES (?, ?, ?, ?)';
                let values = [folderId, filename, filename.split(".").pop(), size];

                mysqlPool.query(sqlStr, values, (error, result) => {
                    if (error) {
                        console.log("db err (uploadFile): " + error);
                        return reject(error);
                    }
                    return resolve({
                        file_id: result.insertId,
                    });
                });
            } else {
                return reject("Data is incompleted");
            }
        });
    };

    const deleteFile = (fileId) => {
        return new Promise(async (resolve, reject) => {
            if (fileId) {
                let sqlStr = 'DELETE f, fs FROM fm_files f LEFT JOIN fm_files_share fs ON f.file_id = fs.file_id WHERE f.file_id = ?';
                let values = [fileId];

                mysqlPool.query(sqlStr, values, (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve({
                        file_id: fileId,
                    });
                });
            } else {
                return reject("Data is incompleted");
            }
        });
    };

    const newFolder = (parentFolderId, folderName) => {
        return new Promise(async (resolve, reject) => {
            if (folderName) {
                let sqlStr = 'INSERT INTO fm_folders (parent_folder_id, folder_name) VALUES (?, ?)';
                let values = [parentFolderId, folderName];

                mysqlPool.query(sqlStr, values, (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve({
                        folder_id: result.insertId,
                    });
                });
            } else {
                return reject("Data is incompleted");
            }
        });
    };

    const editFolder = (folderId, folderName) => {
        return new Promise(async (resolve, reject) => {
            if (folderId && folderName) {
                let sqlStr = 'UPDATE fm_folders SET folder_name = ? WHERE folder_id = ?';
                let values = [folderName, folderId];

                mysqlPool.query(sqlStr, values, (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve({
                        folder_id: result.insertId,
                    });
                });
            } else {
                return reject("Data is incompleted");
            }
        });
    };

    const deleteFolder = (folderId) => {
        return new Promise(async (resolve, reject) => {
            if (folderId) {
                let sqlStr = 'DELETE f, fs FROM fm_folders f LEFT JOIN fm_folders_share fs ON f.folder_id = fs.folder_id WHERE f.folder_id = ?';
                let values = [folderId];

                mysqlPool.query(sqlStr, values, (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve({
                        folder_id: folderId,
                    });
                });
            } else {
                return reject("Data is incompleted");
            }
        });
    };

    const updateFolderOnlyofficeId = (fid, ofid) => {
        return new Promise(async (resolve, reject) => {
            if (fid && ofid) {
                let sqlStr = 'UPDATE fm_folders SET onlyoffice_id = ? WHERE folder_id = ?';
                let values = [ofid, fid];

                mysqlPool.query(sqlStr, values, (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve({
                        folder_id: fid,
                    });
                });
            } else {
                return reject("Data is incompleted");
            }
        });
    };

    const updateOnlyofficeId = (fid, ofid) => {
        return new Promise(async (resolve, reject) => {
            if (fid && ofid) {
                let sqlStr = 'UPDATE fm_files SET onlyoffice_id = ? WHERE file_id = ?';
                let values = [ofid, fid];

                mysqlPool.query(sqlStr, values, (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve({
                        file_id: fid,
                    });
                });
            } else {
                return reject("Data is incompleted");
            }
        });
    };


    const updateOnlyofficeSharedLink = (fid, sharedLink) => {
        return new Promise(async (resolve, reject) => {
            if (fid && sharedLink) {
                let sqlStr = 'UPDATE fm_files SET shared_link = ? WHERE file_id = ?';
                let values = [sharedLink, fid];

                mysqlPool.query(sqlStr, values, (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve({
                        file_id: fid,
                    });
                });
            } else {
                return reject("Data is incompleted");
            }
        });
    };

    const shareFile = async (file_id, user_id, access) => {
        return new Promise(async (resolve, reject) => {
            if (file_id && user_id && access) {
                let sqlStr = 'INSERT INTO fm_files_share (file_id, user_id, access) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE access = ?';
                let values = [file_id, user_id, access, access];

                mysqlPool.query(sqlStr, values, (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve({
                        share_id: result.insertId,
                    });
                });
            } else {
                return reject("Data is incompleted");
            }
        });
    };

    const removeShareFile = (file_id, user_id) => {
        return new Promise(async (resolve, reject) => {
            if (file_id && user_id) {
                let sqlStr = 'DELETE FROM fm_files_share WHERE file_id = ? AND user_id = ?';
                let values = [file_id, user_id];

                mysqlPool.query(sqlStr, values, (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve({
                        status: "success",
                    });
                });
            } else {
                return reject("Data is incompleted");
            }
        });
    };

    const shareFolder = async (folder_id, user_id, access) => {
        return new Promise(async (resolve, reject) => {
            if (folder_id && user_id && access) {
                let sqlStr = 'INSERT INTO fm_folders_share (folder_id, user_id, access) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE access = ?';
                let values = [folder_id, user_id, access, access];

                mysqlPool.query(sqlStr, values, (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve({
                        share_id: result.insertId,
                    });
                });
            } else {
                return reject("Data is incompleted");
            }
        });
    };

    const removeShareFolder = (folder_id, user_id) => {
        return new Promise(async (resolve, reject) => {
            if (folder_id && user_id) {
                let sqlStr = 'DELETE FROM fm_folders_share WHERE folder_id = ? AND user_id = ?';
                let values = [folder_id, user_id];

                mysqlPool.query(sqlStr, values, (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve({
                        status: "success",
                    });
                });
            } else {
                return reject("Data is incompleted");
            }
        });
    };

    const getFolderInfoByFolderId = (folder_id) => {
        return new Promise(async (resolve, reject) => {
            if (folder_id) {
                mysqlPool.query('SELECT * FROM fm_folders WHERE folder_id = ?', [folder_id], async (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(result);
                });
            } else {
                return reject("Data is incompleted");
            }
        });
    };

    const getFileInfoByFileId = (file_id) => {
        return new Promise(async (resolve, reject) => {
            if (file_id) {
                mysqlPool.query('SELECT * FROM fm_files WHERE file_id = ?', [file_id], async (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(result);
                });
            } else {
                return reject("Data is incompleted");
            }
        });
    };

    return {
        getRootFolders,
        getFoldersByFolderId,
        getRootFiles,
        getFilesByFolderId,
        uploadFile,
        deleteFile,
        updateOnlyofficeId,
        updateOnlyofficeSharedLink,
        shareFile,
        removeShareFile,
        shareFolder,
        removeShareFolder,
        newFolder,
        editFolder,
        deleteFolder,
        updateFolderOnlyofficeId,
        getFolderInfoByFolderId,
        getFileInfoByFileId
    }
};