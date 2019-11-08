import { ImageSnippet } from '../../shared/components/multi-picture-manager/multi-picture-manager.component';

export class Ignite {
    constructor(
        public type: string,
        public grade: string,
        public location: string,
        public weightDouble: number,
        public weightUnit: number,
        public priceOffered: number,
        public unitPriceOffered: number,
        public priceSuggested: number,
        public unitPriceSuggested: number,
        public transport: number,
        public repeat: number,
        public notes: string,
        public imageList: ImageSnippet[]) {
    }

    static new(): Ignite {
        return new Ignite(
            "",          // type: any,
            "",         // grade
            "",         // location
            null,       // weightDouble
            0,          // weightUnit
            null,       // priceOffered
            0,          // unitPriceOffered
            null,       // priceSuggested
            0,          // unitPriceSuggested
            0,          // transport
            0,          // repeat
            "",         // notes
            [],         // imageList
        )
    }
}