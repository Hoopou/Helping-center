
export class CustomError {
    constructor(
        public error_number,
        public message
    ) {}

    public static empty(): CustomError {
        return new CustomError("", "");
    }
}