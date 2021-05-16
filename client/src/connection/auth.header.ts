import AuthService from './auth.service';

 const authHeader = async () =>  {    
    
    const user = await AuthService.getCurrentUser() || null;
    
    if (user && user.accessToken) {
        return { 'x-acess-token': user.accessToken };
    } else {
        return {'x-acess-token': null};
    }

};

export default authHeader;