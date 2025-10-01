export type User = {
    id: number;
    name: string;
    age: number;
    email: string;
  };
  
  export type UserPreview = Pick<User, "name" | "email">;
  export type UserUpdate = Partial<User>;
  