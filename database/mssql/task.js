import {
  pool,
  sql
} from 'database';

export const getTasks = (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      let _default = {
        rowsPerPage: 5,
        page: 0,
      };
      let args = {..._default, ...query};
      let _pool = await pool;
      let offset_expression = 'offset @offset rows fetch next @limit rows only';
      let count_result = await _pool.request().query("select count(*) as count from crm_task;");
      let data_result = await _pool.request()
        .input('offset', args.page * parseInt(args.rowsPerPage))
        .input('limit', parseInt(args.rowsPerPage))
        .query(`select * from crm_task order by created_date desc ${offset_expression};`);
      return resolve({
        total: count_result?.recordset[0]?.count??0,
        rows: data_result?.recordset??[],
      });
    } catch (error) {
      return reject(error);
    }
  });
}

export const updateTask = (task_guid, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const filter = [
        'create_user',
        'created_date',
        'task_title',
        'task_category',
        'contact',
        'contact_app',
        'due_date',
        'alert',
        'assignto',
        'assignto_app',
        'notify',
        'task_description',
        'task_completed',
      ];
      let _pool = await pool;
      let request = _pool.request();
      let args = Object.entries(body).filter(([key]) => filter.includes(key));
      let set_expression = [];
      args.forEach(([key, value]) => {
        request.input(key, value);
        set_expression.push(`${key} = @${key}`);
      });
      request.input('task_guid', task_guid);
      set_expression = set_expression.join(', ');
      await request.query(`update crm_task set ${set_expression} where task_guid = @task_guid;`);
      return resolve("Task updated");
    } catch (error) {
      return reject(error);
    }
  });
}

export const deleteTask = (task_guid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let _pool = await pool;
      await _pool.request()
        .input('task_guid', task_guid)
        .query("delete from crm_task where task_guid = @task_guid;");
      return resolve("Task deleted");
    } catch (error) {
      return reject(error);
    }
  });
}

export default {
  getTasks,
  updateTask,
  deleteTask,
};