const dataHandler = {
    getUsers : async () =>
        fetch('http://localhost:3000/users'/*, {mode: 'cors'}*/)
            .then(response => response.json()),
            //.then(result => console.log(result))

    isNameExist : async name =>
        fetch(`http://localhost:3000/users/name=${name}`/*, {mode: 'cors'}*/)
            .then(response => response.json()),

    isEmailExist : async email =>
        fetch(`http://localhost:3000/users/email=${email}`/*, {mode: 'cors'}*/)
            .then(response => response.json()),

}

module.exports = dataHandler
