export default function (knex) {
  
    const getAllClaimTypes = () =>{
        return new Promise(async (resolve, reject)=>{
            try {
                const result = await knex.select('*').from('lookup_claim_type');
                return resolve(result);
            } catch (error) {
                return reject(error);
            }
        });
    };
  
    const getClaimType = (idx) =>{
        return new Promise(async (resolve, reject)=>{
            try {
                const result = await knex('lookup_claim_type').first('*').where('idx', '=', idx);
                return resolve(result);
            } catch (error) {
                return reject(error);
            }
        });
    };
  
    const insertClaimType = (en, zh_hant, zh_hans) =>{
        return new Promise(async (resolve, reject)=>{
            try {
                const claimType = {
                    en: en,
                    zh_hant: zh_hant,
                    zh_hans: zh_hans
                }
                const insertIds = await knex('lookup_claim_type').insert(claimType);
                return resolve(insertIds[0]);
            } catch (error) {
                return reject(error);
            }
        });
    };
  
    const updateClaimType = (idx, en, zh_hant, zh_hans) =>{
        return new Promise(async (resolve, reject)=>{
            try {
                const claimType = {
                    en: en,
                    zh_hant: zh_hant,
                    zh_hans: zh_hans
                }
                await knex('lookup_claim_type').update(claimType).where('idx', '=', idx);
                return resolve();
            } catch (error) {
                return reject(error);
            }
        });
    };
  
    const deleteClaimType = (idx) =>{
        return new Promise(async (resolve, reject)=>{
            try {
                await knex('lookup_claim_type').where('idx', '=', idx).del();
                return resolve();
            } catch (error) {
                return reject(error);
            }
        });
    };

    return {
        getAllClaimTypes,
        getClaimType,
        insertClaimType,
        updateClaimType,
        deleteClaimType
    }
};