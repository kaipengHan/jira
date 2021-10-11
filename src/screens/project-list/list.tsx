import React from "react";

type ProjectType = {
  id: number;
  name: string;
  personId: number;
  organization: string;
  created: number;
};
type Users = {
  id: number;
  name: string;
};
interface ListProps {
  users: Users[];
  list: ProjectType[];
}
const List = ({ users, list }: ListProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>
              {users.find((user) => user.id === item.personId)?.name || "未知"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default List;
