export class User {
    constructor(
        public email: string, 
        public token: string, 
        public id: string, 
        public expirationDate: Date
        ) {}
}