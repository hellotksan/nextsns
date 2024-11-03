export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  profilePicture?: string;
  followings: string[];
  followers: string[];
  createdAt: Date;
  updatedAt: Date;
}
