import * as bcrypt from 'bcrypt';

export default function (pool) {
  
    const allUser = () =>{
        return new Promise((resolve, reject)=>{
            pool.query('SELECT * FROM users', (error, result)=>{
                if(error){
                    return reject(error);
                }
                return resolve(result);
            });
        });
    };

    const getStaffRoles = () => {
        return new Promise((resolve, reject)=>{
            pool.query('SELECT * FROM [lookup] WHERE [name] = ?', ["staff-role"], (error, result)=>{
                if(error){
                    return reject(error);
                }
                return resolve(result);
            });
        });
    }

    const getUserByUsernameOrEmail = (usernameOrEmail) =>{
        return new Promise((resolve, reject)=>{
            let sqlStr = 'SELECT * FROM users WHERE (username = ? or email = ?) and is_deleted = \'N\'';
            let parameter = [
                usernameOrEmail, 
                usernameOrEmail
            ]
            pool.query(sqlStr, parameter, (error, result)=>{
                if(error){
                    return reject(error);
                }
                if (result.length <= 0){
                    return reject("User does not exist");
                }
                return resolve(result[0]);
            });
        });
    };
    
    const getUserById = (userId) =>{
        return new Promise((resolve, reject)=>{
            let sqlStr = 'SELECT * FROM users WHERE (id = ?) and is_deleted = \'N\'';
            let parameter = [
                userId, 
            ]
            pool.query(sqlStr, parameter, (error, result)=>{
                if(error){
                    return reject(error);
                }
                if (result.length <= 0){
                    return reject("User does not exist");
                }
                return resolve(result[0]);
            });
        });
    };

    const insertUser = (username, role, email, password, full_name) =>{
        return new Promise(async (resolve, reject)=>{
            if (username && role && email && password && full_name) {
                let encryptedPassword = bcrypt.hashSync(password, 15);
                let sqlStr = 'INSERT INTO users (username, role, email, password, full_name, is_deleted) ';
                sqlStr += 'SELECT ?, ?, ?, ?, ?, \'N\' WHERE NOT EXISTS (SELECT id FROM users WHERE (username = ? or email = ?) and is_deleted = \'N\')';
                let parameter = [
                    username,
                    role,
                    email,
                    encryptedPassword,
                    full_name,
                    username,
                    email
                ]
                pool.query(sqlStr, parameter, (error, result)=>{
                    if(error){
                        return reject(error);
                    }
                    if (result.insertId <= 0){
                        return reject("User exists");
                    }
                    return resolve({
                        id: result.insertId,
                        username: username, 
                        role: role, 
                        email: email,
                        full_name: full_name
                    });
                });
            } else {
                return reject("Data is incompleted");
            }
        });
    };

    const updateUser = (role, email, password, full_name, id) =>{
        return new Promise((resolve, reject)=>{
            if (role && email && full_name && id) {
                let sqlStr = 'UPDATE users SET role = ?, email = ?, full_name = ? WHERE id = ? and is_deleted = \'N\'';
                let parameter = [
                    role, 
                    email, 
                    full_name, 
                    id
                ]
        
                if (password) {
                    let encryptedPassword = bcrypt.hashSync(password, 15);
                    sqlStr = 'UPDATE users SET role = ?, email = ?, password = ?, full_name = ? WHERE id = ? and is_deleted = \'N\'';
                    parameter = [
                        role, 
                        email, 
                        encryptedPassword, 
                        full_name, 
                        id
                    ]
                }
                pool.query(sqlStr, parameter, (error)=>{
                    if(error){
                        return reject(error);
                    }             
                    return resolve("User updated");
                });
            } else {
                return reject("Data is incompleted");
            }
        });
    };

    const changePassword = (id, password) =>{
        return new Promise((resolve, reject)=>{
            if (id && password) {
                let encryptedPassword = bcrypt.hashSync(password, 15);
                sqlStr = 'UPDATE users SET password = ? WHERE id = ? and is_deleted = \'N\'';
                parameter = [
                    encryptedPassword, 
                    id
                ]
                pool.query(sqlStr, parameter, (error)=>{
                    if(error){
                        return reject(error);
                    }             
                    return resolve("User updated");
                });
            } else {
                return reject("Data is incompleted");
            }
        });
    };

    const deleteUser = (id) =>{
        return new Promise(async (resolve, reject)=>{
            pool.getConnection(async (connErr, connection) => {
                if (connErr) {                
                    return reject(connErr);
                }
    
                let beginTransaction = () => {
                    connection.beginTransaction((error)=>{
                        if(error){
                            return release(error);
                        }
                        deleteUser();
                    });
                };
                let deleteUser = () => {
                    connection.query('UPDATE users SET is_deleted = \'Y\' WHERE id = ? and is_deleted = \'N\'', [id], (error)=>{
                        if(error){
                            return rollback(error);
                        }
                        deleteUserSignedInDevices();
                    });
                };
                let deleteUserSignedInDevices = () => {
                    connection.query('DELETE FROM user_signed_in_devices WHERE user_id = ?', [id], (error)=>{
                        if(error){
                            return rollback(error);
                        }
                        commit();
                    });
    
                };
                let commit = () => {
                    connection.commit((error)=>{
                        if(error){
                            return rollback(error);
                        }             
                        release(null);
                    });
                };
                let rollback = (error) => {
                    connection.rollback((rollbackError)=>{
                        if(rollbackError){
                            return release(rollbackError);
                        }
                        return release(error);
                    });
                };
                let release = (error) => {
                    connection.release();
                    if(error){
                        return reject(error);
                    } 
                    return resolve("User deleted");
                };
                beginTransaction();
            });
        });
    };

    const getUserByDevice = (user_id, browser, platform, csrf_token, access_token) =>{
        return new Promise(async (resolve, reject)=>{
            if (user_id && browser && platform && csrf_token && access_token) {
                let sqlStr = 'SELECT DISTINCT u.* FROM user_signed_in_devices as d LEFT JOIN users as u ON d.user_id=u.id ';
                sqlStr += 'WHERE u.id = ? AND d.browser = ? AND d.platform = ? AND d.csrf_token = ? AND d.access_token = ?';
                let parameter = [
                    user_id, 
                    browser, 
                    platform, 
                    csrf_token, 
                    access_token
                ]
                pool.query(sqlStr, parameter, (error, users)=>{
                    if(error){
                        return reject(error);
                    }
                    if (users.length <= 0){
                        return reject("User does not exist");
                    }
                    return resolve(users[0]);
                });
            } else {
                return reject("Data is incompleted");
            }
        });
    };

    const insertUserSignedInDevice = (user_id, browser, platform, csrf_token, access_token) =>{
        return new Promise(async (resolve, reject)=>{
            if (user_id && browser && platform && csrf_token && access_token) {
                let sqlStr = 'INSERT INTO user_signed_in_devices (user_id, browser, platform, csrf_token, access_token) VALUES (?, ?, ?, ?, ?)';
                let parameter = [
                    user_id, 
                    browser, 
                    platform, 
                    csrf_token,
                    access_token
                ];
                pool.query(sqlStr, parameter, (error)=>{
                    if(error){
                        return reject(error);
                    }             
                    return resolve("Signed in device inserted");
                });
            } else {
                return reject("Data is incompleted");
            }
        });
    };

    const deleteUserSignedInDevice = (user_id, browser, platform, csrf_token, access_token) =>{
        return new Promise(async (resolve, reject)=>{
            if (user_id && browser && platform && csrf_token && access_token) {
                let sqlStr = 'DELETE FROM user_signed_in_devices WHERE user_id = ? AND browser = ? AND platform = ? AND csrf_token = ? AND access_token = ?';
                let parameter = [
                    user_id, 
                    browser, 
                    platform, 
                    csrf_token, 
                    access_token
                ];
                pool.query(sqlStr, parameter, (error)=>{
                    if(error){
                        return reject(error);
                    }             
                    return resolve("Signed in device deleted");
                });
            } else {
                return reject("Data is incompleted");
            }
        });
    };
  
    return {
        allUser,
        getStaffRoles,
        getUserByUsernameOrEmail,
        insertUser,
        updateUser,
        changePassword,
        deleteUser,
        getUserByDevice,
        insertUserSignedInDevice,
        deleteUserSignedInDevice,
        getUserById
    }
};