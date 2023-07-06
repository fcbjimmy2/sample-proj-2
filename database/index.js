import mysql from 'mysql2';
import mssql from 'mssql';
// config
import {
  CONNECTION_LIMIT,
  DB_PORT,
  DB_LIB,
  DB_HOST,
  DB_USER,
  DB_PASS,
  DB_NAME,
} from '../src/config';

export let sql;
export let pool;
export let knex;
export const teachingTeamDb = require('./teachingTeam').default(null);
export const customerSaysDb = require('./customerSays').default(null);
export let userDb;
export let cmsCommonDb;
export let claimTypeDb;
export let leaveTypeDb;
export let filesDb;
export let lookupDb;
export let taskDb;
export let opportunityDb;
export let mailDb;
export let guidDb;
export let studentDb;
export let courseDb;
export let teacherDb;
export let venueDb;

if (DB_LIB == 'mssql') {
  sql = mssql;
  pool = mssql.connect({
    password: DB_PASS,
    user: DB_USER,
    database: DB_NAME,
    server: DB_HOST,
    port: DB_PORT,
    trustServerCertificate: true,
  });

  knex = require('knex')({
    client: 'mssql',
    connection: {
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
      option: {
        mapBinding: (value) => {
          // allow devs to pass tedious type at query time
          if (value != null && value.type) {
            return {
              type: value.type,
              value: value.value,
            };
          }
        },
      },
    },
  });

  userDb = require('./mssql/user');
  guidDb = require('./mssql/guid').default(knex);
  cmsCommonDb = require('./mssql/cmsCommon').default(knex);
  claimTypeDb = require('./mssql/claimType').default(knex);
  leaveTypeDb = require('./mssql/leaveType').default(knex);
  filesDb = require('./mssql/files').default(knex);
  lookupDb = require('./mssql/lookup').default(knex);
  taskDb = require('./mssql/task');
  opportunityDb = require('./mssql/opportunity');
  mailDb = require('./mssql/mail').default(knex);
  studentDb = require('./mssql/student').default(knex);
  teacherDb = require('./mssql/teacher').default(knex);
  courseDb = require('./mssql/course').default(knex);
  venueDb = require('./mssql/venue').default(knex);
  
} else {
  sql = mysql;
  const mysqlPool = mysql.createPool({
    connectionLimit: CONNECTION_LIMIT, // the number of connections node.js will hold open to our database
    password: DB_PASS,
    user: DB_USER,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
  });

  courseDb = require('./course').default(null);
  userDb = require('./user').default(mysqlPool);
  cmsCommonDb = require('./cmsCommon').default(mysqlPool);
  filesDb = require('./files').default(mysqlPool);
}
