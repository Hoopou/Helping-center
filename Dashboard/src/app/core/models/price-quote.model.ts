import { LookupFieldDto } from './lookupFieldDto';

export class PriceQuote {
    private RevenueCAD(): number {
        let salePricePerMT = this.salePriceCAD * this.convertRateToMT(this.saleWeightUnit);
        let saleWeightInMt = this.weight / this.convertRateToMT(this.weightUnit);

        var num = (salePricePerMT * saleWeightInMt)
            + this.rechargesCAD;
        return isFinite(num) ? num : 0;
    }

    private CostCAD(): number {
        var num = (this.buyPriceCAD * this.weight)
            + this.sslFreightCAD
            + this.inlandFreightCAD
            + this.otherExpensesCAD;
        return isFinite(num) ? num : 0;
    }

    public get grossProfit(): number {
        var num = this.RevenueCAD() - this.CostCAD();
        return isFinite(num) ? parseFloat(num.toFixed(2)) : 0;
    }

    // Returns how many of a unit is inside 1 MT
    convertRateToMT(unit: string) {
        switch (unit.toUpperCase()) {
            case "LBS":
                return 2204.62;
            case "MT":
                return 1;
            case "KG":
                return 1000;
            case "ST":
                return 1.10231;
            default:
                return 1;
        }
    }

    // https://personalmba.com/profit-margin/
    public get grossProfitMargin(): number {
        let num = (this.RevenueCAD() - this.CostCAD()) / this.RevenueCAD() * 100;
        return isFinite(num) ? parseFloat(num.toFixed(2)) : 0;
    }

    public get grossProfitMT(): number {
        var weightInMT = (this.weight / this.convertRateToMT(this.weightUnit))
        var num = (this.RevenueCAD() - this.CostCAD()) / weightInMT;
        return isFinite(num) ? parseFloat(num.toFixed(2)) : 0;
    }

    public get salePriceCAD(): number {
        var num = (this.saleCurrency == "USD") ? this.salePrice * this.exchange : this.salePrice;

        return num && isFinite(num) ? parseFloat(num.toFixed(2)) : 0;
    }

    public get buyPriceCAD(): number {
        var num = (this.buyCurrency == "USD") ? this.buyPrice * this.exchange : this.buyPrice;

        return num && isFinite(num) ? parseFloat((+num).toFixed(2)) : 0;
    }

    public get inlandFreightCAD(): number {
        var num = (this.inlandFreightCurrency == "USD") ? this.inlandFreight * this.exchange : this.inlandFreight;
        return isFinite(num) ? num : 0;
    }

    public get otherExpensesCAD(): number {
        var num = (this.otherExpensesCurrency == "USD") ? this.otherExpenses * this.exchange : this.otherExpenses;
        return isFinite(num) ? num : 0;
    }

    public get rechargesCAD(): number {
        var num = (this.rechargesCurrency == "USD") ? this.recharges * this.exchange : this.recharges;
        return isFinite(num) ? num : 0;
    }

    public get sslFreightCAD(): number {
        var num = (this.sslFreightCurrency == "USD") ? this.sslFreight * this.exchange : this.sslFreight;
        return isFinite(num) ? num : 0;
    }

    constructor(
        public id: string,
        public expirationDate: Date,
        public name: string,
        public status: string,
        public supplier: LookupFieldDto, //lookup
        public customer: LookupFieldDto, //lookup
        public from: LookupFieldDto, //lookup
        public to: LookupFieldDto, //lookup
        public grade: LookupFieldDto, //lookup
        public weight: number,
        public weightUnit: string,
        public buyPrice: number,
        public salePrice: number,
        public saleWeightUnit: string,
        public sslFreight: number,
        public sslFreightCurrency: string,
        public exchange: number,
        public buyCurrency: string, // "CAD" or "USD"
        public saleCurrency: string, // "CAD" or "USD"
        public inlandFreight: number,
        public inlandFreightCurrency: string,
        public otherExpenses: number,
        public otherExpensesCurrency: string,
        public recharges: number,
        public rechargesCurrency: string,
        public notes: string
    ) { }

    public static empty() {
        return new PriceQuote(
            null,                       // Id
            null,                       // Expiration date
            "",                         // name
            "",                         // status
            null,                       // supplier 
            null,                       // customer
            null,                       // from
            null,                       // to
            null,                       // grade
            0,                          // weight
            "MT",                       // weightUnit
            0,                          // buyPrice
            0,                          // salePrice
            "MT",                       // salePriceUnit
            0,                          // sslFreight,
            "CAD",                      // sslFreightCurrency
            1.3,                        // exchange
            "CAD",                      // buyCurrency
            "CAD",                      // saleCurrency
            0,                          // inlandFreight
            "CAD",                      // inlandFreightCurrency
            0,                          // otherExpenses
            "CAD",                      // otherExpensesCurrency
            0,                          // Recharge
            "CAD",                      // RechargeCurrency
            ""                          // Note
        );
    }

    public static from(item: any): PriceQuote {
        return new PriceQuote(
            item.id, 
            item.expirationDate, 
            item.name, 
            item.status,
            item.supplier,
            item.customer,
            item.from,
            item.to,
            item.grade,
            item.weight,
            item.weightUnit,
            item.buyPrice,
            item.salePrice,
            item.saleWeightUnit,
            item.sslFreight,
            item.sslFreightCurrency,
            item.exchange,
            item.buyCurrency,
            item.saleCurrency,
            item.inlandFreight,
            item.inlandFreightCurrency,
            item.otherExpenses,
            item.otherExpensesCurrency,
            item.recharges,
            item.rechargesCurrency,
            item.notes);
    }

    public ToJSON(): string {
        let json = JSON.parse((JSON.stringify(this)));
        json.grossProfit = this.grossProfit;
        json.grossProfitMargin = this.grossProfitMargin;
        json.grossProfitMT = this.grossProfitMT;

        return json;
    }
}