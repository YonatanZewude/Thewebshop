export class Product {
  constructor(
    public id: number,
    public brand: string,
    public model: string,
    public color: string,
    public sizes: Array<number>,
    public price: number,
    public imageUrl: string,
    public quantity: number,
    public discription: string
  ) {}
}
