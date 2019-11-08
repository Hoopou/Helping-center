export class Contact {
    constructor(public firstName?: string, public lastName?: string, public fullName?: string, public salutation?: string, public email?: string) { }
    static empty(): Contact {
        return new Contact("", "", "", "", "");
    }
}
