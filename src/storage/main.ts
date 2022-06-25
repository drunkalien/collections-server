import { UserService } from "./services/user";
import { CollectionService } from "./services/collection";
import { CommentService } from "./services/comment";
import { ItemService } from "./services/item";
import { SearchService } from "./services/search";
import ServiceType from "../types/ServiceType";

export const service: ServiceType = {
  user: new UserService(),
  collection: new CollectionService(),
  comment: new CommentService(),
  item: new ItemService(),
  search: new SearchService(),
};
