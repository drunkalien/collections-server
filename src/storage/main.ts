import { UserService } from "./services/user";
import { CollectionService } from "./services/collection";

type ServiceType = {
  user: UserService;
  collection: CollectionService;
};

export const service: ServiceType = {
  user: new UserService(),
  collection: new CollectionService(),
};
