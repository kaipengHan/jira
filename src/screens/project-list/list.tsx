import React from "react";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

type ProjectType = {
  id: number;
  name: string;
  personId: number;
  organization: string;
  created: number;
};
export type Users = {
  id: number;
  name: string;
  token: string;
};
interface ListProps {
  users: Users[];
  list: ProjectType[];
}
const List = ({ users, list }: ListProps) => {
  console.log(list);
  const columns: ColumnsType<ProjectType> = [
    {
      title: "名称",
      dataIndex: "name",
    },
    {
      title: "部门",
      dataIndex: "organization",
    },
    {
      title: "负责人",
      render: (value) => {
        return (
          <span>
            {users.find((user) => user.id === value.personId)?.name || "未知"}
          </span>
        );
      },
    },
    {
      title: "创建时间",
      render: (value) => (
        <div>
          {value.created ? dayjs(value.created).format("YYYY-MM-DD") : "无"}
        </div>
      ),
    },
  ];
  return (
    <Table
      rowKey={"id"}
      columns={columns}
      dataSource={list}
      pagination={false}
    />
    // <table>
    //   <thead>
    //     <tr>
    //       <th>名称</th>
    //       <th>负责人</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {list.map((item) => (
    //       <tr key={item.id}>
    //         <td>{item.name}</td>
    //         <td>
    //           {users.find((user) => user.id === item.personId)?.name || "未知"}
    //         </td>
    //       </tr>
    //     ))}
    //   </tbody>
    // </table>
  );
};

export default List;
