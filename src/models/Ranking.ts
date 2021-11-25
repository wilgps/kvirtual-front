import { IUser } from "./user";

export interface IRanking {
  Id: number;
  UserId: number;
  User: any;
  Points: 1;
  GameName: string;
  updatedAt: string;
  Date: Date;
}
