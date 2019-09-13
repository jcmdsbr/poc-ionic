export class UserUtil {

    static get(): any {
        const data = localStorage.getItem('user');
        if (!data) return null;
        return JSON.parse(data);
    }
    static set(user: any) {
        localStorage.setItem('user', JSON.stringify(user));
    }
    static clear() {
        localStorage.removeItem('user');
    }
}