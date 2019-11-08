import { Employe } from '../employe.model';

export class LoginInfo {
    constructor(
        public Username,
        public Password,
        public employe:Employe = Employe.empty(),
        public exists = true
    ) {
    }

    public static empty(): LoginInfo {
        return new LoginInfo("", "",Employe.empty(), false);
    }
}