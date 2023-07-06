import {
    knex
} from '../../database';

export default function (apiUrl) {

    const getAuthToken = async () => {
        return new Promise(async (resolve, reject) => {
            try {

                var userName = "devteam@apex.hk";
                var token = '';
                token = await getAuthTokenByUserEmail(userName);
                if (token) {
                    resolve(token);
                } else {
                    var myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");
                    myHeaders.append("Accept", "application/json");

                    var raw = JSON.stringify({
                        "userName": userName,
                        "password": "abcd@1234"
                    });

                    var requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: raw,
                    };

                    var expires = Date.now();
                    var data = '';
                    const response = await fetch(apiUrl + "/authentication", requestOptions)
                        .then(response => response.json())
                        .then(result => data = result)
                        .catch(error => console.log('error', error));

                    token = data.response.token;
                    expires = data.response.expires;
                    if (token) {
                        await updateToken(userName, token, expires);
                        resolve(token);
                    } else {
                        reject();
                        //{ status: 'Failed to retrieve auth token.' }
                    }
                }
            } catch (error) {
                console.log(error);
                reject();
            }
        });
    };

    const getAuthTokenByUser = async (userName) => {
        return new Promise(async (resolve, reject) => {
            try {
                var token = '';
                token = await getAuthTokenByUserEmail(userName);
                if (token) {
                    resolve(token);
                } else {

                    var myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");
                    myHeaders.append("Accept", "application/json");

                    var raw = JSON.stringify({
                        "userName": userName,
                        "password": "abcd@1234"
                    });

                    var requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: raw,
                    };

                    var expires = Date.now();
                    var data = '';
                    await fetch(apiUrl + "/authentication", requestOptions)
                        .then(response => response.json())
                        .then(result => data = result)
                        .catch(error => console.log('error', error));

                    token = data.response.token;
                    expires = data.response.expires;

                    if (token) {
                        await updateToken(userName, token, expires)
                        resolve(token);
                    } else {
                        reject();
                        //{ status: 'Failed to retrieve auth token.' }
                    }
                }

            } catch (error) {
                console.log(error);
                reject();
            }
        });
    };


    const getAuthTokenByUserEmail = async (email) => {
        try {
            let result = await knex.select('token')
                .from('onlyoffice_token')
                .where('email', email)
                .where('expires', '>', new Date());

            if (result.length > 0) {
                return result[0].token;
            } else
                return ''
        } catch (err) {
            console.log(err);
            return '';
        }
    };

    const updateToken = async (email, token, expires) => {
        if (email && token && expires) {
            try {

                console.log('updating token');
                let exist = await knex('onlyoffice_token')
                    .count('* AS count')
                    .where({
                        email: email,
                    });

                let result = [];
                if (exist[0].count > 0) {
                    result = await knex('onlyoffice_token')
                        .returning('token')
                        .update({
                            token: token,
                        })
                        .where({
                            email: email,
                        });
                } else {
                    result = await knex('onlyoffice_token')
                        .returning('token')
                        .insert({
                            email: email,
                            token: token,
                            expires: new Date(expires),
                        })
                }

                return {
                    token: result[0].token
                };

            } catch (err) {
                console.log(err);
                return '';
            }
        } else {
            return '';
        }
    };

    return {
        getAuthToken,
        getAuthTokenByUser,
    }
};