export default function authHeader() {
    
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (user && user.accessToken) {
        return { 'x-acess-token': user.accessToken };
    } else {
        return {};
    }
};