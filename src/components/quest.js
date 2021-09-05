import React from 'react';

import axios from 'axios';

export default class AllPeople extends React.Component {
    state = {
        persons: []
    }

    componentDidMount() {
        axios.get('http://192.168.1.222:8000/users/', {
            // withCredentials:true,
            auth:{
                username: 'hbaj',
                password: 'Mamaoso77',
            }
        })
            .then(res => {
                console.log("inside promise, requesting data from API...", res.data)
                const persons = res.data.results;
                console.log(persons)
                this.setState({ persons });
            })
            .catch((error) => {
                console.log("error from http", error.response.data);
            }) //Logs a string: Error: Request failed with status code 404
    }

    render() {
        return (
            <ul>
                {this.state.persons.map(person => <li  key={person.username}>{person.url}</li>)}
            </ul>
        )
    }
}