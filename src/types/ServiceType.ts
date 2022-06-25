import { UserService } from "../storage/services/user";
import { CollectionService } from "../storage/services/collection";
import { CommentService } from "../storage/services/comment";
import { ItemService } from "../storage/services/item";
import { SearchService } from "../storage/services/search";
import { AdminService } from "../storage/services/admin";

type ServiceType = {
  user: UserService;
  collection: CollectionService;
  comment: CommentService;
  item: ItemService;
  search: SearchService;
  admin: AdminService;
};

export default ServiceType;
