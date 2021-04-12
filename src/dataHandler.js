import React from 'react'

const dataHandler = {



    getUsers : async () =>
        fetch('http://localhost:3000/users'/*, {mode: 'cors'}*/)
            .then(response => response.json()),
            //.then(result => console.log(result))

    isDataExist : async ( fields = {} ) =>
        fetch('http://localhost:3000/users/exist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(fields)
        })
            .then(response=>response.json())
            .then(result => !!(+result[0].count))
            .catch(() => false),

    addUser : async data =>
        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        })
            .then(response=>response.json()),

    authUser : async (data) =>
        fetch(`http://localhost:3000/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
}
export const UserContext = React.createContext(null)
export default dataHandler
