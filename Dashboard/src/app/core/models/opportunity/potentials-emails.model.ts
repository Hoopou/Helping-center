import { Email } from "./email.model";

export class PotentialsEmails {
    constructor(public emails?: Email[], public oppNo?: string) { }
    static empty(): PotentialsEmails {
        return new PotentialsEmails([], "");
    }
}
