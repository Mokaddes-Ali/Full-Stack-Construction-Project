export const apiUrl = 'http://127.0.0.1:8000/api/';
export const token = () => {
    const userInfo = localStorage.getItem('userInfo');
    const data = JSON.parse(userInfo);
    return data.token;
   
}