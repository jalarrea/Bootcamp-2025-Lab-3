const API_URL = 'http://localhost:3001/api/v1';

class Api {
    constructor() {
        this.API_URL = 'http://localhost:3001/api/v1';
    }

    async login(email, password){
        const response = await fetch(`${API_URL}/auths/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('Login failed');
        }
        return response.json();
    }

    async logout () {
        const response = await fetch(`${API_URL}/auths/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('Logout failed');
        }
        return response.json();
    }

}

export const api = new Api();
export default api;