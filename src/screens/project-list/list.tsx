import React from "react";
import { Table, TableProps, Dropdown, Menu } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { User } from "types/user";
import { Project } from "types/project";
// react-router 和 react-router-dom的关系，类似于 react 和 react-dom/react-native/react-vr...
import { Link } from "react-router-dom";
import Pin from "../../components/pin";
import { useEditProjects } from "../../utils/project";
import { ButtonNoPadding } from "../../components/Lib";
import { useDispatch } from "react-redux";
import { projectListActions } from "screens/project-list/project-list.slice";

interface ListProps extends TableProps<Project> {
  users: User[];
  onLoad?: () => void;
}
// <Link to={String(project.id)}> 会默认认为是当前路由下的子路由
const List = ({ users, onLoad, ...props }: ListProps) => {
  const dispatch = useDispatch();
  const { mutate } = useEditProjects();
  const pinProject = (id: number, pin: boolean) => {
    mutate({ id, pin });
    onLoad?.();
  };
  const columns: ColumnsType<Project> = [
    {
      title: <Pin checked={true} />,
      render: (_, project) => {
        return (
          <Pin
            checked={project.pin}
            onCheckedChange={(pin) => pinProject(project.id, pin)}
          />
        );
      },
    },
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
    {
      render(value, project) {
        return (
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key={"edit"}>
                  <ButtonNoPadding
                    onClick={() =>
                      dispatch(projectListActions.openProjectModal())
                    }
                    type={"link"}
                  >
                    编辑
                  </ButtonNoPadding>
                </Menu.Item>
              </Menu>
            }
          >
            <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
          </Dropdown>
        );
      },
    },
  ];
  return (
    <Table rowKey={"id"} columns={columns} pagination={false} {...props} />
  );
};

export default List;
