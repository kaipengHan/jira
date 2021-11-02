import React, { useState } from "react";
import List from "./list";
import SearchPanel from "./search-panel";
import { useDebounce, useMount } from "../../utils";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { useProjects } from "utils/project";
import { Project } from "types/project";

const ProjectListScreen = () => {
  const [param, setParam] = useState<Partial<Project>>({
    name: "",
    personId: "",
  });
  const debounceParam = useDebounce(param, 200);
  const [users, setUsers] = useState([]);
  const client = useHttp();
  const { isLoading, data: list } = useProjects(debounceParam);
  useMount(() => {
    client("users").then(setUsers);
  });
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List loading={isLoading} users={users} dataSource={list || []} />
    </Container>
  );
};

export default ProjectListScreen;

const Container = styled.div`
  padding: 3.2rem;
`;
