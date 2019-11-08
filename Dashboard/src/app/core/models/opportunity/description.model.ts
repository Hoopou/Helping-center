export class description{
    constructor(public language: string, public description:string){}
    static empty(): description{
        return new description("","");
    }
}