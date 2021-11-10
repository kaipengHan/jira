import React from "react";
import { Table, TableProps } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { User } from "types/user";
import { Project } from "types/project";
// react-router 和 react-router-dom的关系，类似于 react 和 react-dom/react-native/react-vr...
import { Link } from "react-router-dom";

interface ListProps extends TableProps<Project> {
  users: User[];
}
// <Link to={String(project.id)}> 会默认认为是当前路由下的子路由
const List = ({ users, ...props }: ListProps) => {
  const columns: ColumnsType<Project> = [
    {
      title: "名称",
      render: (_, project) => {
        return <Link to={String(project.id)}>{project.name}</Link>;
      },
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
    <Table rowKey={"id"} columns={columns} pagination={false} {...props} />
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
