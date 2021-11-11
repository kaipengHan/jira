import React from "react";
import { Form, Input, Select } from "antd";
import { User } from "types/user";
import { Project } from "../../types/project";

interface SearchPanelProps {
  users: User[];
  param: Partial<Project>;
  setParam: (param: SearchPanelProps["param"]) => void;
}
const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  return (
    <Form style={{ marginBottom: "2rem" }} layout={"inline"}>
      <Form.Item>
        <Input
          placeholder={"请输入名称"}
          type="text"
          value={param.name}
          onChange={(e) => setParam({ ...param, name: e.target.value })}
        />
      </Form.Item>
      <Form.Item>
        <Select
          value={param.personId}
          onChange={(e) => setParam({ ...param, personId: e })}
        >
          <Select.Option value={""}>负责人</Select.Option>
          {users.map((item) => (
            <Select.Option value={String(item.id)} key={item.id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};

export default SearchPanel;
