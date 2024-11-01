export interface Post {
  _id: string;
  userId: string;
  desc: string;
  updatedAt: string;
  likes?: string[];
}
