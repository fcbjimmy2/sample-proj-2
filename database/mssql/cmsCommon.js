export default function (knex) {
  
    const getAllCms = () =>{
        return new Promise(async (resolve, reject)=>{
            try {
                const result = await knex.select('*').from('cms_common');
                return resolve(result);
            } catch (error) {
                return reject(error);
            }
        });
    };
  
    const updateAllCms = (termsOfService, privacyPolicy) => {
        return new Promise(async (resolve, reject)=>{
            let trx = null;
            try {
                trx = await knex.transaction();

                await trx('cms_common').update(termsOfService).where('cms_name', '=', 'Terms of Service');
                await trx('cms_common').update(privacyPolicy).where('cms_name', '=', 'Privacy Policy');

                await trx.commit();
            } catch (error) {
                if (trx && !trx.isCompleted()) {
                    await trx.rollback();
                }
                return reject(error);
            }
        });
    };
  
    const getPrivacyPolicy = () =>{
        return new Promise(async (resolve, reject)=>{
            try {
                const result = await knex('cms_common').first('*').where('cms_name', '=', 'Privacy Policy');
                return resolve(result);
            } catch (error) {
                return reject(error);
            }
        });
    };
  
    const getTermsOfService = () =>{
        return new Promise(async (resolve, reject)=>{
            try {
                const result = await knex('cms_common').first('*').where('cms_name', '=', 'Terms of Service');
                return resolve(result);
            } catch (error) {
                return reject(error);
            }
        });
    };

    return {
        getAllCms,
        updateAllCms,
        getPrivacyPolicy,
        getTermsOfService
    }
};