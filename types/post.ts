export interface Post {
  _id: string;
  userId: string;
  desc: string;
  likes?: string[];
  createdAt: Date;
  updatedAt: Date;
}
