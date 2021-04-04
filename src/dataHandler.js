const dataHandler = {
    getUsers : async () =>
        fetch('http://localhost:3000/users'/*, {mode: 'cors'}*/)
            .then(response => response.json())
            //.then(result => console.log(result))

}

module.exports = dataHandler
