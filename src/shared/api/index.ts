import {
  AccountsApi,
  CustomersApi,
  OrdersApi,
  ProductsApi,
  SellersApi,
  ElasticApi,
} from './gen';
import { $api as api } from './axios';

const $api = api as never;

export const $apiAccountsApi = new AccountsApi(undefined, undefined, $api);
export const $apiCustomersApi = new CustomersApi(undefined, undefined, $api);
export const $apiElasticApi = new ElasticApi(undefined, undefined, $api);
export const $apiOrdersApi = new OrdersApi(undefined, undefined, $api);
export const $apiProductsApi = new ProductsApi(undefined, undefined, $api);
export const $apiSellersApi = new SellersApi(undefined, undefined, $api);
