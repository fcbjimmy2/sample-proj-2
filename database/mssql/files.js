export default function (knex) {

    const getRootFolders = () => {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await knex.select()
                    .from('fm_folders')
                    .whereNull('parent_folder_id');

                const fs = Array();

                for await (const row of result) {
                    const combinedFolderId = `${row.folder_id}_${row.onlyoffice_id}`;
                    const shared = await getSharedByFolderId(row.folder_id, combinedFolderId);
                    const files = await getFileCountByFolderId(row.folder_id);
                    const folders = await getFolderCountByFolderId(row.folder_id);
                    const tags = await getTagsByFolderId(row.folder_id);

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
                        tags: tags,
                        dateCreated: new Date(row.create_date),
                        dateModified: new Date(row.modify_date),
                    });
                }
                resolve(fs);
            } catch (err) {
                console.log(err);
                reject(err);
            }
        });
    };


    const getFoldersByFolderId = async (folderId) => {

        return new Promise(async (resolve, reject) => {
            if (folderId) {
                try {
                    let result = await knex.select()
                        .from('fm_folders')
                        .where('parent_folder_id', folderId);

                    const fs = Array();

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
                        const tags = await getTagsByFolderId(row.folder_id);

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
                            tags: tags,
                            dateCreated: new Date(row.create_date),
                            dateModified: new Date(row.modify_date),
                        });
                    }
                    resolve(fs);
                } catch (err) {
                    reject(err);
                }
            } else {
                reject("Error: Missing required field");
            }
        });
    };


    const getFileCountByFolderId = async (folderId) => {
        return new Promise(async (resolve, reject) => {
            if (folderId) {
                try {
                    let result = await knex.select()
                        .from('fm_files')
                        .count('file_id AS file_count')
                        .where('folder_id', folderId)

                    resolve(result);

                } catch (err) {
                    reject(err);
                }
            } else {
                reject("Error: Missing required field");
            }
        });
    };

    const getFolderCountByFolderId = async (folderId) => {
        return new Promise(async (resolve, reject) => {
            if (folderId) {
                try {
                    let result = await knex.select()
                        .from('fm_folders')
                        .count('folder_id AS folder_count')
                        .where('parent_folder_id', folderId)

                    resolve(result);

                } catch (err) {
                    reject(err);
                }
            } else {
                reject("Error: Missing required field");
            }
        });
    };

    const getRootFiles = async (userId, role) => {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await knex.select(['fm_files.*'])
                    .from('fm_files')
                    .leftJoin('fm_files_share', 'fm_files.file_id', 'fm_files_share.file_id')
                    .whereNull('folder_id')
                    .whereRaw(role === 'admin' || userId == '4' ? '1=1' : 'fm_files_share.user_id=' + userId);
                // no admin role now, hardcoded for now.

                const fs = Array();
                for await (const row of result) {
                    const combinedFileId = `${row.file_id}_${row.onlyoffice_id}`;
                    const shared = await getSharedByFileId(row.file_id, combinedFileId);
                    const tags = await getTagsByFileId(row.file_id);

                    fs.push({
                        id: `${row.file_id}_${row.onlyoffice_id}`,
                        name: row.file_name,
                        size: row.file_size,
                        type: row.file_type,
                        isFavorited: false,
                        shared: shared,
                        sharedLink: row.shared_link,
                        url: '',
                        tags: tags,
                        dateCreated: new Date(row.create_date),
                        dateModified: new Date(row.modify_date),
                    });
                }
                resolve(fs);
            } catch (err) {
                reject(err);
            }
        });
    };

    const getFilesByFolderId = async (folderId, userId, role) => {
        return new Promise(async (resolve, reject) => {
            if (folderId) {
                try {
                    // let result = await knex.select()
                    //     .from('fm_files')
                    //     .where('folder_id', folderId);
                    let result = await knex.select(['fm_files.*'])
                        .from('fm_files')
                        .leftJoin('fm_files_share', 'fm_files.file_id', 'fm_files_share.file_id')
                        .where('fm_files.folder_id', folderId)
                        .whereRaw(role === 'admin' || userId == '4' ? '1=1' : 'fm_files_share.user_id=' + userId);
                    // no admin role now, hardcoded for now.


                    const fs = Array();
                    for await (const row of result) {
                        const combinedFileId = `${row.file_id}_${row.onlyoffice_id}`;
                        const shared = await getSharedByFileId(row.file_id, combinedFileId);
                        const tags = await getTagsByFileId(row.file_id);

                        fs.push({
                            id: `${row.file_id}_${row.onlyoffice_id}`,
                            name: row.file_name,
                            size: row.file_size,
                            type: row.file_type,
                            isFavorited: false,
                            shared: shared,
                            sharedLink: row.shared_link,
                            url: '',
                            tags: tags,
                            dateCreated: new Date(row.create_date),
                            dateModified: new Date(row.modify_date),
                        });
                    }
                    resolve(fs);
                } catch (err) {
                    reject(err);
                }
            } else {
                reject("Error: Missing required field");
            }
        });
    };

    const getSharedByFileId = async (fileId, combinedFileId) => {
        return new Promise(async (resolve, reject) => {
            if (fileId) {
                try {
                    let result = await knex.select(['user_public.user_id', 'user_public.full_name', 'user_public.email', 'fm_files_share.access'])
                        .from('fm_files_share')
                        .innerJoin('user_public', 'fm_files_share.user_id', 'user_public.user_id')
                        .where('fm_files_share.file_id', fileId);

                    const fs = Array();
                    result.forEach(row => {
                        fs.push({
                            user_id: `${row.user_id}`,
                            file_id: combinedFileId,
                            name: row.full_name,
                            email: row.email,
                            avatar: "",
                            permission: row.access,
                            type: "file",
                        });
                    });
                    resolve(fs);
                } catch (err) {
                    console.log(err);
                    reject(err);
                }
            } else {
                reject("Error: Missing required field");
            }
        });
    }

    const getSharedByFolderId = async (folderId, combinedFolderId) => {
        return new Promise(async (resolve, reject) => {
            if (folderId) {
                try {
                    let result = await knex.select(['user_public.user_id', 'user_public.full_name', 'user_public.email', 'fm_folders_share.access'])
                        .from('fm_folders_share')
                        .innerJoin('user_public', 'fm_folders_share.user_id', 'user_public.user_id')
                        .where('fm_folders_share.folder_id', folderId);

                    const fs = Array();
                    result.forEach(row => {
                        fs.push({
                            user_id: `${row.user_id}`,
                            folder_id: combinedFolderId,
                            name: row.full_name,
                            email: row.email,
                            avatar: "",
                            permission: row.access,
                            type: "folder",
                        });
                    });
                    resolve(fs);
                } catch (err) {
                    reject(err);
                }
            } else {
                reject("Error: Missing required field");
            }
        });
    }

    const uploadFile = async (folderId, filename, size, onlyofficeId, sharedLink) => {
        return new Promise(async (resolve, reject) => {
            if (filename && size && onlyofficeId) {
                try {
                    let result = await knex('fm_files')
                        .returning(['file_id'])
                        .insert({
                            folder_id: folderId,
                            file_name: filename,
                            file_type: filename.split(".").pop(),
                            file_size: size,
                            onlyoffice_id: onlyofficeId,
                            shared_link: sharedLink,
                        })

                    resolve({
                        file_id: result[0].file_id
                    });

                } catch (err) {
                    reject(err);
                }
            } else {
                reject("Error: Missing required field");
            }
        });
    };

    const deleteFile = async (fileId) => {
        return new Promise(async (resolve, reject) => {
            if (fileId) {
                try {
                    let result = await knex('fm_files')
                        .returning(['file_id'])
                        .where('file_id', fileId)
                        .del()

                    resolve({
                        file_id: fileId
                    });

                } catch (err) {
                    reject(err);
                }

            } else {
                reject("Error: Missing required field");
            }
        });
    };

    const newFolder = async (parentFolderId, folderName, onlyofficeId) => {
        return new Promise(async (resolve, reject) => {
            if (folderName && onlyofficeId) {
                try {
                    let result = await knex('fm_folders')
                        .returning(['folder_id'])
                        .insert({
                            parent_folder_id: parentFolderId,
                            folder_name: folderName,
                            onlyoffice_id: onlyofficeId,
                        })

                    resolve({
                        folder_id: result[0].folder_id
                    });

                } catch (err) {
                    reject(err);
                }
            } else {
                reject("Error: Missing required field");
            }
        });
    };

    const editFolder = async (folderId, folderName) => {
        return new Promise(async (resolve, reject) => {
            if (folderId && folderName) {
                try {
                    let result = await knex('fm_folders')
                        .returning(['folder_id'])
                        .update({
                            folder_name: folderName,
                        })
                        .where('folder_id', folderId)

                    resolve({
                        folder_id: folderId
                    });

                } catch (err) {
                    reject(err);
                }
            } else {
                reject("Error: Missing required field");
            }
        });
    };

    const deleteFolder = async (folderId) => {
        return new Promise(async (resolve, reject) => {
            if (folderId) {
                try {
                    let result = await knex('fm_folders')
                        .returning(['folder_id'])
                        .where('folder_id', folderId)
                        .del()

                    resolve({
                        folder_id: folderId
                    });

                } catch (err) {
                    reject(err);
                }
            } else {
                reject("Error: Missing required field");
            }
        });
    };

    const updateFolderOnlyofficeId = async (fid, ofid) => {
        return new Promise(async (resolve, reject) => {
            if (fid && ofid) {
                try {
                    let result = await knex('fm_folders')
                        .returning(['folder_id'])
                        .update({
                            onlyoffice_id: ofid,
                        })
                        .where('folder_id', fid)

                    resolve({
                        folder_id: fid
                    });

                } catch (err) {
                    reject(err);
                }
            } else {
                reject("Error: Missing required field");
            }
        });
    };

    const updateOnlyofficeId = async (fid, ofid) => {
        return new Promise(async (resolve, reject) => {
            if (fid && ofid) {
                try {
                    let result = await knex('fm_files')
                        .returning(['file_id'])
                        .update({
                            onlyoffice_id: ofid,
                        })
                        .where('file_id', fid)

                    resolve({
                        file_id: fid
                    });

                } catch (err) {
                    reject(err);
                }
            } else {
                reject("Error: Missing required field");
            }
        });
    };


    const updateOnlyofficeSharedLink = async (fid, sharedLink) => {
        return new Promise(async (resolve, reject) => {
            if (fid && sharedLink) {
                try {
                    let result = await knex('fm_files')
                        .returning(['file_id'])
                        .update({
                            shared_link: sharedLink,
                        })
                        .where('file_id', fid)

                    resolve({
                        file_id: fid
                    });

                } catch (err) {
                    reject(err);
                }
            } else {
                reject("Error: Missing required field");
            }
        });
    };

    const shareFile = async (fileId, userId, access) => {
        return new Promise(async (resolve, reject) => {
            if (fileId && userId && access) {
                try {
                    let exist = await knex('fm_files_share')
                        .count('* AS count')
                        .where({
                            file_id: fileId,
                            user_id: userId
                        });

                    let result = [];
                    if (exist[0].count > 0) {
                        result = await knex('fm_files_share')
                            .returning('file_id')
                            .update({
                                access: access
                            })
                            .where({
                                file_id: fileId,
                                user_id: userId
                            });
                    } else {
                        result = await knex('fm_files_share')
                            .returning('file_id')
                            .insert({
                                file_id: fileId,
                                user_id: userId,
                                access: access
                            })
                    }

                    resolve({
                        status: "success"
                    });

                } catch (err) {
                    reject(err);
                }
            } else {
                reject("Error: Missing required field");
            }
        });
    };

    const removeShareFile = async (fileId, userId) => {
        return new Promise(async (resolve, reject) => {
            if (fileId && userId) {
                try {
                    await knex('fm_files_share')
                        .where({
                            file_id: fileId,
                            user_id: userId
                        })
                        .del()

                    resolve({
                        status: "success"
                    });

                } catch (err) {
                    reject(err);
                }
            } else {
                reject("Error: Missing required field");
            }
        });
    };

    const shareFolder = async (folderId, userId, access) => {
        return new Promise(async (resolve, reject) => {
            if (folderId && userId && access) {
                try {

                    let exist = await knex('fm_folders_share')
                        .count('* AS count')
                        .where({
                            folder_id: folderId,
                            user_id: userId
                        });

                    let result = [];
                    if (exist[0].count > 0) {
                        result = await knex('fm_folders_share')
                            .returning('folder_id')
                            .update({
                                access: access
                            })
                            .where({
                                folder_id: folderId,
                                user_id: userId
                            });
                    } else {
                        result = await knex('fm_folders_share')
                            .returning('folder_id')
                            .insert({
                                folder_id: folderId,
                                user_id: userId,
                                access: access
                            })
                    }

                    resolve({
                        status: "success"
                    });

                } catch (err) {
                    reject(err);
                }
            } else {
                reject("Error: Missing required field");
            }
        });
    };

    const removeShareFolder = async (folderId, userId) => {
        return new Promise(async (resolve, reject) => {
            if (folderId && userId) {
                try {
                    await knex('fm_folders_share')
                        .where({
                            folder_id: folderId,
                            user_id: userId
                        })
                        .del()

                    resolve({
                        status: "success"
                    });

                } catch (err) {
                    reject(err);
                }
            } else {
                reject("Error: Missing required field");
            }
        });
    };

    const getFolderInfoByFolderId = async (folderId) => {
        return new Promise(async (resolve, reject) => {
            if (folderId) {
                try {
                    let result = await knex.select()
                        .from('fm_folders')
                        .where('folder_id', folderId)

                    resolve(result);

                } catch (err) {
                    reject(err);
                }
            } else {
                reject("Error: Missing required field");
            }
        });
    };

    const getFileInfoByFileId = async (fileId) => {
        return new Promise(async (resolve, reject) => {
            if (fileId) {
                try {
                    let result = await knex.select()
                        .from('fm_files')
                        .where('file_id', fileId)

                    resolve(result);

                } catch (err) {
                    reject(err);
                }
            } else {
                reject("Error: Missing required field");
            }
        });
    };

    const getTagsByFileId = async (fileId) => {
        return new Promise(async (resolve, reject) => {
            if (fileId) {
                try {
                    let result = await knex.select()
                        .from('fm_files_tag')
                        .where('file_id', fileId)
                        .pluck('tag')

                    resolve(result);

                } catch (err) {
                    reject([]);
                }
            } else {
                reject([]);
            }
        });
    };

    const getTagsByFolderId = async (folderId) => {
        return new Promise(async (resolve, reject) => {
            if (folderId) {
                try {
                    let result = await knex.select()
                        .from('fm_folders_tag')
                        .where('folder_id', folderId)
                        .pluck('tag')

                    resolve(result);

                } catch (err) {
                    reject([]);
                }
            } else {
                reject([]);
            }
        });
    };

    const getAllTags = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await knex.select('tag')
                    .from('fm_files_tag')
                    .union([
                        knex.select('tag')
                        .from('fm_folders_tag')
                    ])
                    .distinct()

                var dTags = [];
                result.forEach(data => {
                    dTags.push(data.tag);
                })

                resolve(dTags);

            } catch (err) {
                reject([]);
            }
        });
    };

    const updateFileTag = async (fileId, tags) => {
        return new Promise(async (resolve, reject) => {
            if (fileId && tags) {
                try {
                    var values = [];
                    tags.forEach(tag => {
                        values.push({
                            file_id: fileId,
                            tag: tag
                        });
                    })

                    var dTags = [];
                    await knex.transaction(async trx => {
                        await trx('fm_files_tag')
                            .where({
                                file_id: fileId,
                            })
                            .del()

                        const result = await trx('fm_files_tag')
                            .insert(values, ['tag']);

                        result.forEach(data => {
                            dTags.push(data.tag);
                        })
                    })
                    resolve(dTags);
                } catch (err) {
                    console.log(err);
                    const result = await getTagsByFileId(fileId);
                    reject(result);
                }
            } else {
                console.log("updateFileTag: Missing required field");
                const result = await getTagsByFileId(fileId);
                reject(result);
            }
        });
    };

    const updateFolderTag = async (folderId, tags) => {
        return new Promise(async (resolve, reject) => {
            if (folderId && tags) {
                try {

                    var values = [];
                    tags.forEach(tag => {
                        values.push({
                            folder_id: folderId,
                            tag: tag
                        });
                    })

                    var dTags = [];
                    await knex.transaction(async trx => {

                        await trx('fm_folders_tag')
                            .where({
                                folder_id: folderId,
                            })
                            .del()

                        const result = await trx('fm_folders_tag')
                            .insert(values, ['tag'])

                        result.forEach(data => {
                            dTags.push(data.tag);
                        });

                    })
                    resolve(dTags);
                } catch (err) {
                    console.log(err);
                    const result = await getTagsByFolderId(folderId);
                    reject(result);
                }
            } else {
                console.log("updateFolderTag: Missing required field");
                const result = await getTagsByFolderId(folderId);
                reject(result);
            }
        });
    };


    const getPublicFolderId = async () => {
        return new Promise(async (resolve, reject)=>{
        try {
            let result = await knex.select('folder_id')
                .from('fm_folders')
                .where('folder_name', 'Public')
                .whereNull('parent_folder_id')

            resolve(result[0].folder_id);

        } catch (err) {
            console.log(err);
            reject(-1);
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
        getFileInfoByFileId,
        getTagsByFileId,
        getAllTags,
        getTagsByFolderId,
        updateFileTag,
        updateFolderTag,
        getPublicFolderId,
        getSharedByFileId,
        getSharedByFolderId,
    }

};