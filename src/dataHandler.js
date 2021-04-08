const dataHandler = {
    getUsers : async () =>
        fetch('http://localhost:3000/users'/*, {mode: 'cors'}*/)
            .then(response => response.json()),
            //.then(result => console.log(result))

    isNameExist : async name =>
        fetch(`http://localhost:3000/users/name=${name}`/*, {mode: 'cors'}*/)
            .then(response => response.json())
            .then(result => !!(+result[0].count))
            .catch(() => false),

    isEmailExist : async email =>
        fetch(`http://localhost:3000/users/email=${email}`/*, {mode: 'cors'}*/)
            .then(response => response.json())
            .then(result => !!(+result[0].count))
            .catch(() => false),

    addUser : data =>
        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        })
            .then(response=>response.json())
            //.then(result => result)
            /*.then(response=>console.log(response.json()))
            .catch(err=>alert(err.status))*/



}

module.exports = dataHandler
