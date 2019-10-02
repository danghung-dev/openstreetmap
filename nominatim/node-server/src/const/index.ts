export const USER_DB_CONNECTION = 'userDBConnection';
export const LOCATION_DB_CONNECTION = 'locationDBConnection';
export const STMV3_DB_CONNECTION = 'stmv3DBConnection';
export const EventName = {
  dbConnectionCreated: 'dbConnectionCreated',
};

export enum ActionRoles {
  ORDER_CREATE = 'order.create',
  ORDER_READ = 'order.read',
  ORDER_DELETE = 'order.delete',
  ACCEPT_BID = 'bid.accept',
}

export enum Roles {
  SHIPPER = 'shipper',
  CARRIER = 'carrier',
  DRIVER = 'driver',
}
