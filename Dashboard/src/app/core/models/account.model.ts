export class Account {
    constructor(
        public name,
        public currency
    ) {
    }

    public static empty(): Account {
        return new Account("", "");
    }

    public static from(json: any): Account {
        return new Account(
            json["name"],
            json["currency"]
        );
    }
}