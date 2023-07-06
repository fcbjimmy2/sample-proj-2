export default function (knex) {

    const getAllVenues = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await knex.select()
                    .from('venue')
                resolve(result);

            } catch (err) {
                reject(err);
            }
        });
    };
    
    return {
        getAllVenues
    }
}