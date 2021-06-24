import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class CreditCard {
  readonly id: string;
  readonly name?: string;
  readonly number?: string;
  readonly expiry?: string;
  readonly cvc?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<CreditCard>);
  static copyOf(source: CreditCard, mutator: (draft: MutableModel<CreditCard>) => MutableModel<CreditCard> | void): CreditCard;
}