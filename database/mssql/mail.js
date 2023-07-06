export default function (knex) {

    const getMailsByUser = async (email, systemLabel) => {
        return new Promise(async (resolve, reject) => {
            if (email && systemLabel) {
                try {
                    let result = [];
                    switch (systemLabel){
                        case 'all':
                            result = await knex.select()
                            .from('mail_record')
                            .where('owner', email)
                            .whereIn('folder', ['inbox','important','starred'])
                            .orderBy('created_at', 'desc')
                            break;
                        case 'important':
                            result = await knex.select()
                            .from('mail_record')
                            .where('owner', email)
                            .where('is_important', 1)
                            .orderBy('created_at', 'desc')
                            break;
                        case 'starred':
                            result = await knex.select()
                            .from('mail_record')
                            .where('owner', email)
                            .where('is_starred', 1)
                            .orderBy('created_at', 'desc')
                            break;
                        default:
                            result = await knex.select()
                            .from('mail_record')
                            .where('owner', email)
                            .where('folder', systemLabel)
                            .orderBy('created_at', 'desc')
                            break;
                    }

                    resolve(result);

                } catch (err) {
                    console.log(err);
                    reject(err);
                }
            } else {
                reject("Error: Missing required field");
            }
        });
    };
    
    const getMailById = async (id, email) => {
        return new Promise(async (resolve, reject) => {
            if (id && email) {
                try {
                    let result = await knex.select()
                        .from('mail_record')
                        .where('mail_id', id)
                        .where('owner', email)

                    resolve(result);

                } catch (err) {
                    reject(err);
                }
            } else {
                reject("Error: Missing required field");
            }
        });
    };

    const createMail = async (from, toList, subject, message) => {
        return new Promise(async (resolve, reject) => {
            if (toList && subject && message) {

                    var values = [];
                    values.push({
                        owner: from.email,
                        folder: 'sent',
                        is_unread: 0,
                        subject: subject,
                        message: message,
                        from_user: JSON.stringify(from),
                        to_user: JSON.stringify(toList),
                    });
                    toList.forEach(to => {
                        values.push({
                            owner: to.email,
                            folder: 'inbox',
                            is_unread: 1,
                            subject: subject,
                            message: message,
                            from_user: JSON.stringify(from),
                            to_user: JSON.stringify(toList),
                        });
                    })

                    await knex.transaction(async trx => {

                        const result = await trx('mail_record')
                            .insert(values, ['mail_id'])

                        result.forEach(data => {
                        });

                        resolve(result);

                    })
            } else {
                reject("Error: Missing required field");
            }
        });
    }

    const getUnreadCountByUserEmail = async (email) => {
        return new Promise(async (resolve, reject) => {
            if (email) {
                try {
                    let result = await knex.select('folder')
                        .from('mail_record')
                        .groupBy(['owner', 'folder'])
                        .count('* AS unread')
                        .where({owner: email, is_unread : 1})

                    resolve(result);

                } catch (err) {
                    reject(err);
                }
            } else {
                reject("Error: Missing required field");
            }
        });
    };


    const changeMailStarred = async (id, isStarred) => {
        return new Promise(async (resolve, reject) => {
            if (id) {
                try {
                    let result = await knex('mail_record')
                        .returning(['mail_id'])
                        .update({
                            is_starred: isStarred,
                        })
                        .where('mail_id', id)

                    resolve({
                        mail_id: id
                    });

                } catch (err) {
                    reject(err);
                }
            } else {
                reject("Error: Missing required field");
            }
        });
    };

    const changeMailImportant = async (id, isImportant) => {
        return new Promise(async (resolve, reject) => {
            if (id) {
                try {
                    let result = await knex('mail_record')
                        .returning(['mail_id'])
                        .update({
                            is_important: isImportant,
                        })
                        .where('mail_id', id)

                    resolve({
                        mail_id: id
                    });

                } catch (err) {
                    reject(err);
                }
            } else {
                reject("Error: Missing required field");
            }
        });
    };


    const changeMailUnread = async (id, unread) => {
        return new Promise(async (resolve, reject) => {
            if (id) {
                try {
                    let result = await knex('mail_record')
                        .returning(['mail_id'])
                        .update({
                            is_unread: unread,
                        })
                        .where('mail_id', id)

                    resolve({
                        mail_id: id
                    });

                } catch (err) {
                    reject(err);
                }
            } else {
                reject("Error: Missing required field");
            }
        });
    };
    
    const moveMailToTrash = async (id) => {
        return new Promise(async (resolve, reject) => {
            if (id) {
                try {
                    let result = await knex('mail_record')
                        .returning(['mail_id'])
                        .update({
                            folder: 'trash',
                        })
                        .where('mail_id', id)

                    resolve({
                        mail_id: id
                    });

                } catch (err) {
                    reject(err);
                }
            } else {
                reject("Error: Missing required field");
            }
        });
    };

    const deleteMail = async (id) => {
        return new Promise(async (resolve, reject) => {
            if (id) {
                try {
                    let result = await knex('mail_record')
                        .returning(['mail_id'])
                        .where('mail_id', id)
                        .del()

                    resolve({
                        mail_id: id
                    });
                } catch (err) {
                    reject(err);
                }
            } else {
                reject("Error: Missing required field");
            }
        });
    };
    return {
        getMailsByUser,
        getMailById,
        createMail,
        getUnreadCountByUserEmail,
        changeMailStarred,
        changeMailImportant,
        changeMailUnread,
        moveMailToTrash,
        deleteMail
    }
}