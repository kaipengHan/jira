import React from "react";
import { Form, Input } from "antd";
import { User } from "types/user";
import { Project } from "../../types/project";
import { IdSelect } from "../../components/id-select";

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
        <IdSelect
          value={param.personId}
          defaultOptionName={"负责人"}
          options={users}
          onChange={(value) => setParam({ ...param, personId: value })}
        />
      </Form.Item>
    </Form>
  );
};

export default SearchPanel;
