import {
  pool,
  sql
} from '..';
import * as bcrypt from 'bcrypt';

export const allUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let _pool = await pool;
      let result = await _pool.request().query("select * from user_private;");
      return resolve(result?.recordset??[]);
    } catch (error) {
      return reject(error);
    }
  });
};


export const getStaffRoles = () => {
  return new Promise(async (resolve, reject)=>{
    try {
      let _pool = await pool;
      let result = await _pool.request()
      .input('name', 'staff-role')
      .query("SELECT * FROM [lookup] WHERE [name] = @name");
      return resolve(result?.recordset??[]);
    } catch (error) {
      return reject(error);
    }
  });
};

export const getUsersByRole = (role) => {
  return new Promise(async (resolve, reject) => {
    try {
      let _pool = await pool;
      let result = await _pool.request()
        .input('app', role)
        .query("select * from user_public where app = @app;");
      return resolve(result?.recordset??[]);
    } catch (error) {
      return reject(error);
    }
  });
}

export const getUserByUsernameOrEmail = (usernameOrEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let _pool = await pool;
      let result = await _pool
        .request()
        .input('q', usernameOrEmail)
        .query("select * from user_private where @q in (login, email);");
      if (result?.recordset?.length??0 > 0) {
        return resolve(result?.recordset[0]??[]);
      } else {
        return reject("User does not exist");
      }
    } catch (error) {
      console.log(error);
      return reject(error);
    }
  });
};

export const getUserByEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let _pool = await pool;
      let result = await _pool
        .request()
        .input('email', email)
        .query("select * from user_private where email = @email;");
      return resolve(result?.recordset[0]);
    } catch (error) {
      console.log(error);
      return reject(error);
    }
  });
};

export const getUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let _pool = await pool;
      let result = await _pool
        .request()
        .input('q', userId)
        .query("select * from user_public where user_id = @q;");
      if (result?.recordset?.length??0 > 0) {
        return resolve(result?.recordset[0]??[]);
      } else {
        return reject("User does not exist");
      }
    } catch (error) {
      return reject(error);
    }
  });
};


export const getStaffById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let _pool = await pool;
      let result = await _pool
        .request()
        .input('q', userId)
        .query("select user_login.timezone, user_login.enabled, user_login.onlyoffice_id, user_staff.* from user_login inner join user_staff on user_login.user_id = user_staff.user_id where user_login.user_id = @q;");
      if (result?.recordset?.length??0 > 0) {
        return resolve(result?.recordset[0]??[]);
      } else {
        return reject("User does not exist");
      }
    } catch (error) {
      return reject(error);
    }
  });
};

export const createStaff = (staffObj) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (staffObj.email && staffObj.password) {
        let _pool = await pool;
        let transaction = new sql.Transaction(_pool);
        
        let guid_result = await _pool.request().execute('sp_general_get_guid');
        let guid = guid_result?.recordset[0]?.guid??null;

        let duplicate_result = await _pool.request()
          .input('login', staffObj.email)
          .input('email', staffObj.email)
          .query("select user_guid from user_public where login = @login or email = @email;");
        if (duplicate_result?.recordset?.length??0 > 0) {
          return reject("User exists");
        }

        try{
          
          await transaction.begin();
          let encryptedPassword = bcrypt.hashSync(staffObj.password, 15);

          let user_result = await transaction.request()
            .input('user_guid', guid)
            .input('login', staffObj.email)
            .input('password', encryptedPassword)
            .input('timezone', staffObj.timezone)
            .input('locale', staffObj.locale)
            .input('onlyoffice_id', staffObj.onlyoffice_id)
            .query("insert into user_login (user_guid, login, password, timezone, locale, onlyoffice_id) values (@user_guid, @login, @password, @timezone, @locale, @onlyoffice_id); SELECT SCOPE_IDENTITY() AS user_id");

          let user_id = user_result?.recordset[0]?.user_id??null;
          let staff_result = await transaction.request()
            .input('user_id', user_id)
            .input('user_guid', guid)
            .input('name', staffObj.name)
            .input('phone', staffObj.phone)
            .input('mobile', staffObj.mobile)
            .input('email', staffObj.email)
            .input('created_date', new Date().toISOString().slice(0, 19).replace('T', ' '))
            .input('citizen_id', staffObj.citizen_id)
            .input('full_name', staffObj.full_name)
            .input('local_name', staffObj.local_name)
            .input('gender', staffObj.gender)
            .input('locale', staffObj.locale)
            .input('role', staffObj.role)
            .input('remark', staffObj.remark)
            .input('center', staffObj.center)
            .input('region', staffObj.region)
            .input('salary', staffObj.salary)
            .input('photo', staffObj.photo)
            .query('INSERT INTO user_staff ([user_id],[user_guid],[name],[phone],[mobile],[email],[created_date],[citizen_id],[full_name],[local_name],[gender],[locale],[role],[remark],[center],[region],[salary],[photo]) VALUES (@user_id,@user_guid,@name,@phone,@mobile,@email,@created_date,@citizen_id,@full_name,@local_name,@gender,@locale,@role,@remark,@center,@region,@salary,@photo)');
            // .execute('sp_user_staff_action');

            await transaction.commit();
            return resolve({
              user_id: user_id,
              user_guid: guid,
            });
        }
        catch(e)
        {
          console.log(e);
          await transaction.rollback();
          return reject(e);
        }

      } else {
        return reject("Data is incompleted");
      }
    } catch (error) {
      console.log(error);
      return reject(error);
    }
  });
};


export const updateStaff = (staffObj) => {
  return new Promise(async (resolve, reject) => {
    try {
        let _pool = await pool;
        let transaction = new sql.Transaction(_pool);

        try{
          await transaction.begin();
          // staffObj.password = 'abcd@1234';
          let encryptedPassword = bcrypt.hashSync(staffObj.password, 15);

          let user_result = await transaction.request()
            .input('user_id', staffObj.user_id)
            .input('timezone', staffObj.timezone)
            .input('locale', staffObj.locale)
            .input('enabled', staffObj.enabled)
            .input('password', encryptedPassword)
            .query("update user_login set enabled = @enabled, timezone = @timezone, locale = @locale where user_id = @user_id");

          let staff_result = await transaction.request()
            .input('user_id', staffObj.user_id)
            .input('user_guid', staffObj.user_guid)
            .input('name', staffObj.name)
            .input('phone', staffObj.phone)
            .input('mobile', staffObj.mobile)
            .input('email', staffObj.email)
            .input('citizen_id', staffObj.citizen_id)
            .input('full_name', staffObj.full_name)
            .input('local_name', staffObj.local_name)
            .input('gender', staffObj.gender)
            .input('locale', staffObj.locale)
            .input('role', staffObj.role)
            .input('remark', staffObj.remark)
            .input('center', staffObj.center)
            .input('region', staffObj.region)
            .input('salary', staffObj.salary)
            .input('photo', staffObj.photo)
            .query('UPDATE user_staff SET [name]=@name,[phone]=@phone,[mobile]=@mobile,[email]=@email,[citizen_id]=@citizen_id,[full_name]=@full_name,[local_name]=@local_name,[gender]=@gender,[locale]=@locale,[role]=@role,[remark]=@remark,[center]=@center,[region]=@region,[salary]=@salary,photo=@photo WHERE user_id = @user_id');
            // .execute('sp_user_staff_action');

            await transaction.commit();
            return resolve({
              user_id: staffObj.user_id,
              user_guid: staffObj.user_guid,
            });
        }
        catch(e)
        {
          console.log(e);
          await transaction.rollback();
          return reject(e);
        }
    } catch (error) {
      console.log(error);
      return reject(error);
    }
  });
};


export const deleteStaff = (user_id) => {
  return new Promise(async (resolve, reject) => {
    try {
        let _pool = await pool;
        let transaction = new sql.Transaction(_pool);

        try{
          await transaction.begin();
          let user_result = await transaction.request()
            .input('user_id', user_id)
            .query("delete from user_login where user_id = @user_id");

          let staff_result = await transaction.request()
            .input('user_id', user_id)
            .query('delete from user_staff WHERE user_id = @user_id');
            // .execute('sp_user_staff_action');

            await transaction.commit();
            return resolve({
              user_id: user_id,
            });
        }
        catch(e)
        {
          console.log(e);
          await transaction.rollback();
          return reject(e);
        }
    } catch (error) {
      console.log(error);
      return reject(error);
    }
  });
};

export const insertUser = (username, role, email, password, full_name) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (username && role && email && password && full_name) {
        if (role == 'student') {
          let _pool = await pool;
          let transaction = new sql.Transaction(_pool);
          await transaction.begin();
          let guid_result = await transaction.request().execute('sp_general_get_guid');
          let guid = guid_result?.recordset[0]?.guid??null;
          let duplicate_result = await transaction.request()
            .input('login', username)
            .input('email', email)
            .query("select user_guid from user_public where login = @login or email = @email;");
          if (duplicate_result?.recordset?.length??0 > 0) {
            return reject("User exists");
          }
          let encryptedPassword = bcrypt.hashSync(password, 15);
          let student_result = await transaction.request()
            .input('user_guid', guid)
            .input('email', email)
            .input('full_name', full_name)
            .query("insert into user_student (student_no, user_guid, email, full_name) values ('', @user_guid, @email, @full_name);");
          let user_result = await transaction.request()
            .input('user_guid', guid)
            .input('login', username)
            .input('password', encryptedPassword)
            .query("insert into user_login (user_guid, login, password) values (@user_guid, @login, @password);");
          await transaction.commit();
          return resolve({
            id: guid,
            username: username,
            role: role,
            email: email,
            full_name: full_name
          });
        } else {
          return reject("TODO");
        }
      } else {
        return reject("Data is incompleted");
      }
    } catch (error) {
      return reject(error);
    }
  });
};



const updateUser = (role, email, password, full_name, id) => {
  return new Promise((resolve, reject) => {
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
      pool.query(sqlStr, parameter, (error) => {
        if (error) {
          return reject(error);
        }
        return resolve("User updated");
      });
    } else {
      return reject("Data is incompleted");
    }
  });
};

const changePassword = (id, password) => {
  return new Promise((resolve, reject) => {
    if (id && password) {
      let encryptedPassword = bcrypt.hashSync(password, 15);
      sqlStr = 'UPDATE users SET password = ? WHERE id = ? and is_deleted = \'N\'';
      parameter = [
        encryptedPassword,
        id
      ]
      pool.query(sqlStr, parameter, (error) => {
        if (error) {
          return reject(error);
        }
        return resolve("User updated");
      });
    } else {
      return reject("Data is incompleted");
    }
  });
};

const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    pool.getConnection(async (connErr, connection) => {
      if (connErr) {
        return reject(connErr);
      }

      let beginTransaction = () => {
        connection.beginTransaction((error) => {
          if (error) {
            return release(error);
          }
          deleteUser();
        });
      };
      let deleteUser = () => {
        connection.query('UPDATE users SET is_deleted = \'Y\' WHERE id = ? and is_deleted = \'N\'', [id], (error) => {
          if (error) {
            return rollback(error);
          }
          deleteUserSignedInDevices();
        });
      };
      let deleteUserSignedInDevices = () => {
        connection.query('DELETE FROM user_signed_in_devices WHERE user_id = ?', [id], (error) => {
          if (error) {
            return rollback(error);
          }
          commit();
        });

      };
      let commit = () => {
        connection.commit((error) => {
          if (error) {
            return rollback(error);
          }
          release(null);
        });
      };
      let rollback = (error) => {
        connection.rollback((rollbackError) => {
          if (rollbackError) {
            return release(rollbackError);
          }
          return release(error);
        });
      };
      let release = (error) => {
        connection.release();
        if (error) {
          return reject(error);
        }
        return resolve("User deleted");
      };
      beginTransaction();
    });
  });
};

export const getUserByDevice = (user_id, browser, platform, csrf_token, access_token) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (user_id && browser && platform && csrf_token && access_token) {
        let _pool = await pool;
        let result = await _pool
          .request()
          .input('user_guid', user_id)
          .input('browser', browser)
          .input('platform', platform)
          .input('csrf_token', csrf_token)
          .input('access_token', access_token)
          .query("select user_public.*, browser, platform, csrf_token, access_token from user_signed_in_devices left join user_public on user_signed_in_devices.user_guid = user_public.user_guid where user_public.user_guid = @user_guid and browser = @browser and platform = @platform and csrf_token = @csrf_token and access_token = @access_token;");
        if (result?.recordset?.length??0 > 0) {
          return resolve(result?.recordset[0]??[]);
        } else {
          return reject("User does not exist");
        }
      } else {
        return reject("Data is incompleted");
      }
    } catch (error) {
      return reject(error);
    }
  });
};

export const insertUserSignedInDevice = (user_id, browser, platform, csrf_token, access_token) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (user_id && browser && platform && csrf_token && access_token) {
        let _pool = await pool;
        let result = await _pool.request()
          .input('user_guid', user_id)
          .input('browser', browser)
          .input('platform', platform)
          .input('csrf_token', csrf_token)
          .input('access_token', access_token)
          .query("insert into user_signed_in_devices (user_guid, browser, platform, csrf_token, access_token) values (@user_guid, @browser, @platform, @csrf_token, @access_token);");
        return resolve("Signed in device inserted");
      } else {
        return reject("Data is incompleted");
      }
    } catch (error) {
      return reject(error);
    }
  });
};

export const deleteUserSignedInDevice = (user_id, browser, platform, csrf_token, access_token) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (user_id && browser && platform && csrf_token && access_token) {
        let _pool = await pool;
        let result = await _pool.request()
          .input('user_guid', user_id)
          .input('browser', browser)
          .input('platform', platform)
          .input('csrf_token', csrf_token)
          .input('access_token', access_token)
          .query("delete from user_signed_in_devices where user_guid = @user_guid and browser = @browser and platform = @platform and csrf_token = @csrf_token and access_token = @access_token;");
        return resolve("Signed in device deleted");
      } else {
        return reject("Data is incompleted");
      }
    } catch (error) {
      return reject(error);
    }
  });
};

export default {
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
  getUserById,
  createStaff,
  getUserByEmail,
  getStaffById,
  updateStaff
};