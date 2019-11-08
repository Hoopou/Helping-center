export class UserModelConnection{
    constructor(
        public id: number,
        public username: string,
        public email: string,
        public token: string,
        public password: string
    ) {
    }
    
    public static empty(): UserModelConnection {
        return new UserModelConnection(1, "", "", "", "");
    }
}