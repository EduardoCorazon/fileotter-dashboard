import Cookies from 'js-cookie';

export async function authenticate(credentials) {
    try {
        const response = await fetch('http://localhost:3200/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
            credentials: 'include',
        });

        if (response.ok) {
            //create cookie
            const responseData = await response.json();
            const {user} = responseData;
            Cookies.set('connect.sid', responseData, {secure: true, sameSite: 'strict'});
            return {success: true, user};
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Authentication failed');
        }
    } catch (error) {
        throw new Error('Authentication failed');
    }
}

export async function logout() {
    try {
        const response = await fetch('http://localhost:3200/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (response.ok) {
            //clear cookies
            localStorage.removeItem('token');
            Cookies.remove('connect.sid', {secure: true, sameSite: 'strict'});

            return response.json();
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Logout failed');
        }
    } catch (error) {
        throw new Error('Logout failed');
    }
}

export const authenticateTest = async () => {
    try {
        const response = await fetch('http://localhost:3200/user', {
            method: 'GET',
            credentials: 'include',
        });

        if (response.ok) {
            const data = await response.json();
            return data.user;
        } else {
            //user not auth
            return null;
        }
    } catch (error) {
        console.error('Error checking authentication:', error);
        return null;
    }
};