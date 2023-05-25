import axios from 'axios';
const API = process.env.REACT_APP_API_URL;

const login = async (username, password) => {
    const response = await axios.post(`${API}/api/login`, {
        username,
        password
    });
    console.log(username, password);
    if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem('token', response.data.token);
    }
    return response.data;
};

const register = async (payload) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/register`, payload);
    if (response.data) localStorage.setItem('userToken', response.data.token);
    return response;
};

const logout = async () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
};

const authActions = {
    register,
    logout,
    login
};

export default authActions;
