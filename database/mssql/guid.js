export default function (knex) {
  
  const get_guid = async () =>{
    const result = await knex.raw('EXEC sp_general_get_guid');
    return result[0].guid;
  };

  return {
    get_guid
  }
};