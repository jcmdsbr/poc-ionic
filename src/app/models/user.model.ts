export class User {
    constructor(
        public email: string,
        public password: string,
        public id: number = null,
        public roles: string[] = null
    ) { }
}