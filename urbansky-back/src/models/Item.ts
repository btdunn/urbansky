import { DateType, Model } from './Model';

export type Item = {
  id: number;
  serial: number;
  name: string;
  description: string;
  quantity: number;
};

export class ItemModel extends Model {
  static tableName = 'items';

  public static async create<Payload>(data: Payload): Promise<Item & DateType> {
    return super.insert<Payload, Item>({
      ...data,
    });
  }

  public static findBySerial(serial: number): Promise<Item> {
    return this.findBy<
      {
        serial: number;
      },
      Item
    >({ serial });
  }
}