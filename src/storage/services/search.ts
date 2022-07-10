import { SearchRepo } from "../repo/searchRepo";
import User from "../../models/User";
import Collection from "../../models/Collection";
import Item from "../../models/Item";
import Comment from "../../models/Comment";

export class SearchService implements SearchRepo {
  async search(query: string): Promise<object[]> {
    try {
      const collections = await Collection.find({
        $text: { $search: query },
      });
      const users = await User.find({
        $text: { $search: query },
      });
      const comments = await Comment.find({
        $text: { $search: query },
      });
      const items = await Item.find({
        $text: { $search: query },
      });

      return [
        { ...collections, type: "collection" },
        { ...users, type: "user" },
        { ...comments, type: "comment" },
        { ...items, type: "item" },
      ];
    } catch (error) {
      throw error;
    }
  }
}
