export default function (knex) {
  
    const getAllLeaveTypes = () =>{
        return new Promise(async (resolve, reject)=>{
            try {
                const result = await knex.select('*').from('lookup_leave_type');
                return resolve(result);
            } catch (error) {
                return reject(error);
            }
        });
    };
  
    const getLeaveType = (idx) =>{
        return new Promise(async (resolve, reject)=>{
            try {
                const result = await knex('lookup_leave_type').first('*').where('idx', '=', idx);
                return resolve(result);
            } catch (error) {
                return reject(error);
            }
        });
    };
  
    const insertLeaveType = (en, zh_hant, zh_hans) =>{
        return new Promise(async (resolve, reject)=>{
            try {
                const leaveType = {
                    en: en,
                    zh_hant: zh_hant,
                    zh_hans: zh_hans
                }
                const insertIds = await knex('lookup_leave_type').insert(leaveType);
                return resolve(insertIds[0]);
            } catch (error) {
                return reject(error);
            }
        });
    };
  
    const updateLeaveType = (idx, en, zh_hant, zh_hans) =>{
        return new Promise(async (resolve, reject)=>{
            try {
                const leaveType = {
                    en: en,
                    zh_hant: zh_hant,
                    zh_hans: zh_hans
                }
                await knex('lookup_leave_type').update(leaveType).where('idx', '=', idx);
                return resolve();
            } catch (error) {
                return reject(error);
            }
        });
    };
  
    const deleteLeaveType = (idx) =>{
        return new Promise(async (resolve, reject)=>{
            try {
                await knex('lookup_leave_type').where('idx', idx).del();
                return resolve();
            } catch (error) {
                return reject(error);
            }
        });
    };

    return {
        getAllLeaveTypes,
        getLeaveType,
        insertLeaveType,
        updateLeaveType,
        deleteLeaveType
    }
};