export class LookupFieldDto {
    constructor(
        public id: string,
        public label: string
    ) { }

    public static empty(): LookupFieldDto {
        return new LookupFieldDto("", "");
    }
    public static from(json: any): LookupFieldDto {
        return new LookupFieldDto(json["id"], json["label"]);
    }
}