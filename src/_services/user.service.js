import { authHeader, handleResponse } from '../_helpers';

export const userService = {
    getAll, 
    getById
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`http://localhost:4000/users`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`http://localhost:4000}/users/${id}`, requestOptions).then(handleResponse);
}