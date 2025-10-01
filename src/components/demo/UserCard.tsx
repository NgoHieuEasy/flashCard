import { User } from "@/types/user";
import React from "react";

type Props = {
  user: Readonly<User>;
};

export const UserCard: React.FC<Props> = ({ user }) => {
  return (
    <div style={{ border: "1px solid gray", padding: 10, borderRadius: 8 }}>
      <h4>{user.name}</h4>
      <p>Email: {user.email}</p>
      <p>Age: {user.age}</p>
    </div>
  );
};
