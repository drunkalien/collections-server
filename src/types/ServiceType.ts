import { UserService } from "../storage/services/user";
import { CollectionService } from "../storage/services/collection";
import { CommentService } from "../storage/services/comment";
import { ItemService } from "../storage/services/item";
import { SearchService } from "../storage/services/search";
import { AdminService } from "../storage/services/admin";
import { CustomFieldsService } from "../storage/services/customFields";

type ServiceType = {
  user: UserService;
  collection: CollectionService;
  comment: CommentService;
  item: ItemService;
  search: SearchService;
  admin: AdminService;
  customFields: CustomFieldsService;
};

export default ServiceType;
