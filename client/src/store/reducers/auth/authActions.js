import axios from 'axios';

const login = async (payload) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, payload);
    if (response.data) {
        localStorage.setItem('userToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const register = async (payload) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, payload);
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
