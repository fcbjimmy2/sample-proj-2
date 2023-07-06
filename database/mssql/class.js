export default function (knex) {

    const getAllClasses = async (startDate, endDate, userGuid) => {
        return new Promise(async (resolve, reject) => {
            try {
                
                const result = await knex.raw('EXEC sp_class_get @datefrom=?, @dateto=?, @user_guid=?',
                [
                    startDate,
                    endDate,
                    userGuid,
                ]);

                return result;

            } catch (err) {
                reject(err);
            }
        });
    };
    
    return {
        getAllClasses
    }
}