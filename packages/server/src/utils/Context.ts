export enum Role {
  USER = "USER",
  ADMIN = "ADMIN"
}

export interface AdminPayLoad {
  id: number;
  role: Role.ADMIN;
}
export interface UserPayLoad {
  id: number;
  role: Role.USER;
}

export type JWTPayLoad = AdminPayLoad | UserPayLoad;

export interface Context {
  user?: JWTPayLoad;
}
