import {
  pool,
  sql
} from 'database';

export const getOpportunities = (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      let args = {...query};
      let _pool = await pool;
      let offset_expression = '';
      let where_expression = 'where 1=1';
      let count_result = await _pool.request().query("select count(*) as count from crm_opportunity;");
      let _request = _pool.request();
      if (args.page && args.rowsPerPage) {
        _request.input('offset', args.page * parseInt(args.rowsPerPage));
        _request.input('limit', parseInt(args.rowsPerPage));
        offset_expression += 'offset @offset rows fetch next @limit rows only';
      }
      if (args.contact) {
        _request.input('contact', args.contact);
        where_expression += ' and crm_opportunity_contact.contact = @contact';
      }
      let data_result = await _request.query(`
        select crm_opportunity.*, crm_opportunity_contact.contact from crm_opportunity
        left join crm_opportunity_contact on crm_opportunity.op_guid = crm_opportunity_contact.op_guid
        ${where_expression}
        order by created_date desc
        ${offset_expression};
      `);
      return resolve({
        total: count_result?.recordset[0]?.count??0,
        rows: data_result?.recordset??[],
      });
    } catch (error) {
      return reject(error);
    }
  });
};

export const linkOpportunity = (contact, op_guid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let _pool = await pool;
      await _pool.request()
        .input('contact', contact)
        .input('op_guid', op_guid)
        .query("insert crm_opportunity_contact (contact, op_guid) values (@contact, @op_guid);");
      return resolve("Opportunity linked");
    } catch (error) {
      return reject(error);
    }
  });
};

export const unlinkOpportunity = (contact, op_guid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let _pool = await pool;
      await _pool.request()
        .input('contact', contact)
        .input('op_guid', op_guid)
        .query("delete from crm_opportunity_contact where contact=@contact and op_guid=@op_guid);");
      return resolve("Opportunity unlinked");
    } catch (error) {
      return reject(error);
    }
  });
};

export default {
  getOpportunities,
  linkOpportunity,
  unlinkOpportunity,
};