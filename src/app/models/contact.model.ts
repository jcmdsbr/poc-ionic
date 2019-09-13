import { Address } from './address.model';

export class Contact {
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public cpf: string,
        public phone: string,
        public address: Address,
        public image: string = ""
    ) { }
}