export default function (apiUrl) {

    const createUser = async (token, email, firstname, lastname) => {

        return new Promise(async (resolve, reject) => {
            try {
                var myHeaders = new Headers();
                myHeaders.append("Authorization", token);
                myHeaders.append("Accept", "application/json");
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                    "isVisitor": false,
                    "email": email,
                    "firstname": firstname,
                    "lastname": lastname,
                    "password": "abcd@1234"
                });

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                };

                var onlyofficeId = '';
                await fetch(apiUrl + "/people", requestOptions)
                    .then(response => response.json())
                    .then(result => onlyofficeId = result.response.id) //  console.log(result)
                    .catch(error => console.log('create user api error:', error));

                console.log(onlyofficeId);
                resolve(onlyofficeId);
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }

    const deleteUser = async (token, id) => {

        return new Promise(async (resolve, reject) => {
            try {
                var myHeaders = new Headers();
                myHeaders.append("Authorization", token);
                myHeaders.append("Accept", "application/json");
                myHeaders.append("Content-Type", "application/json");


                var raw = JSON.stringify({
                    "disable": true,
                });

                var requestOptions = {
                    method: 'PUT',
                    headers: myHeaders,
                    body: raw,
                };

                var onlyofficeId = '';
                await fetch(apiUrl + "/people/" + id, requestOptions)
                    .then(response => response.json())
                    .then(result => { onlyofficeId = id }) //  console.log(result)
                    .catch(error => console.log('update user api error:', error));

                if (onlyofficeId) {

                    var requestOptions2 = {
                        method: 'DELETE',
                        headers: myHeaders,
                    };

                    var onlyofficeId2 = '';
                    await fetch(apiUrl + "/people/" + id, requestOptions2)
                        .then(response => response.json())
                        .then(result => { onlyofficeId2 = id }) //  console.log(result)
                        .catch(error => console.log('delete user api error:', error));

                    resolve(onlyofficeId2);
                }
                else
                {
                    reject('Failed on disable user');
                }
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }

    return {
        createUser,
        deleteUser,
    }
};