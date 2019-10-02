import { LocationController } from '../modules/geocoder/geocoder.controller';

export type Lazy<T extends object> = Promise<T> | T;

const createController = () => {
  const arrayController = [];
  arrayController.push(LocationController);

  return arrayController;
};

export const expressListController = createController();
