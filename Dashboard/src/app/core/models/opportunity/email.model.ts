import { Contact } from "./contact.model";
import { Potential } from "./potential.model";
export class Email {
    constructor(public id?: string, public to?: Contact, public fromEmail?: string, public potential?: Potential, public offerName?: string, public customMessage?: string, public language?: string) { }
    static empty(): Email {
        return new Email("", Contact.empty(), "", Potential.empty(), "", "", "");
    }
}
