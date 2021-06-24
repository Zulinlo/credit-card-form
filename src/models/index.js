// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { CreditCard } = initSchema(schema);

export {
  CreditCard
};