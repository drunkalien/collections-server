import { UserService } from "./services/user";
import { CollectionService } from "./services/collection";
import { CommentService } from "./services/comment";
import { ItemService } from "./services/item";

type ServiceType = {
  user: UserService;
  collection: CollectionService;
  comment: CommentService;
  item: ItemService;
};

export const service: ServiceType = {
  user: new UserService(),
  collection: new CollectionService(),
  comment: new CommentService(),
  item: new ItemService(),
};
