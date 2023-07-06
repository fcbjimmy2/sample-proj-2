export default function (pool) {
  
    const getAllCms = () =>{
        return new Promise((resolve, reject)=>{
            pool.query('SELECT * FROM cms_common', (error, result)=>{
                if(error){
                    return reject(error);
                }
                return resolve(result);
            });
        });
    };
  
    const updateAllCms = (termsOfService, privacyPolicy) => {
        return new Promise(async (resolve, reject)=>{
            pool.getConnection(async (connErr, connection) => {
                if (connErr) {                
                    return reject(connErr);
                }
    
                const beginTransaction = () => {
                    connection.beginTransaction((error)=>{
                        if(error){
                            return release(error);
                        }
                        updateTermsOfService();
                    });
                };
                const updateTermsOfService = () => {
                    let query = "UPDATE cms_common SET en=?, zh_Hant=?, zh_Hans=? WHERE cms_name='Terms of Service'"
                    let parameters  = [
                        termsOfService.en,
                        termsOfService.zh_Hant,
                        termsOfService.zh_Hans
                    ];
                    connection.query(query, parameters, (error)=>{
                        if(error){
                            return rollback(error);
                        }
                        updatePrivacyPolicy();
                    });
                };
                const updatePrivacyPolicy = () => {
                    let query = "UPDATE cms_common SET en=?, zh_Hant=?, zh_Hans=? WHERE cms_name='Privacy Policy'"
                    let parameters  = [
                        privacyPolicy.en,
                        privacyPolicy.zh_Hant,
                        privacyPolicy.zh_Hans
                    ];
                    connection.query(query, parameters, (error)=>{
                        if(error){
                            return rollback(error);
                        }
                        commit();
                    });
    
                };
                const commit = () => {
                    connection.commit((error)=>{
                        if(error){
                            return rollback(error);
                        }             
                        release(null);
                    });
                };
                const rollback = (error) => {
                    connection.rollback((rollbackError)=>{
                        if(rollbackError){
                            return release(rollbackError);
                        }
                        return release(error);
                    });
                };
                const release = (error) => {
                    connection.release();
                    if(error){
                        return reject(error);
                    } 
                    return resolve();
                };
                beginTransaction();
            });
        });
    };
  
    const getPrivacyPolicy = () =>{
        return new Promise((resolve, reject)=>{
            pool.query('SELECT * FROM cms_common WHERE cms_name=\'Privacy Policy\'', (error, result)=>{
                if(error){
                    return reject(error);
                }
                return resolve(result[0]);
            });
        });
    };
  
    const getTermsOfService = () =>{
        return new Promise((resolve, reject)=>{
            pool.query('SELECT * FROM cms_common WHERE cms_name=\'Terms of Service\'', (error, result)=>{
                if(error){
                    return reject(error);
                }
                return resolve(result[0]);
            });
        });
    };

    return {
        getAllCms,
        updateAllCms,
        getPrivacyPolicy,
        getTermsOfService
    }
};