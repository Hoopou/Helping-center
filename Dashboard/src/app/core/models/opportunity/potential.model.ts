import { description } from './description.model';

export class Potential {
    constructor(
        public title?: string,
        public descriptions?: description[],
        public dategory?: string,
        public LotNo?: string,
        public OppNo?: string) {
        }
    static empty(): Potential {
        return new Potential("", [description.empty()], "", "", "");
    }
}
