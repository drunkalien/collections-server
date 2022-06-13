import { UserService } from "../storage/services/user";
import { CollectionService } from "../storage/services/collection";
import { CommentService } from "../storage/services/comment";
import { ItemService } from "../storage/services/item";

type ServiceType = {
  user: UserService;
  collection: CollectionService;
  comment: CommentService;
  item: ItemService;
};

export default ServiceType;
