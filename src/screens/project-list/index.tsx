import React, { useState } from "react";
import List from "./list";
import SearchPanel from "./search-panel";
import { useDebounce, useDocumentTitle, useMount } from "../../utils";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { useProjects } from "utils/project";
import { useUrlQueryParam } from "../../utils/url";

const ProjectListScreen = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  const debounceParam = useDebounce(param, 200);
  const [users, setUsers] = useState([]);
  useDocumentTitle("项目列表", true);
  const client = useHttp();
  const { isLoading, data: list } = useProjects(debounceParam);
  const loadUserData = () => {
    client("users").then(setUsers);
  };
  const ListLoad = () => {
    loadUserData();
  };
  useMount(() => {
    loadUserData();
  });
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List
        loading={isLoading}
        users={users}
        onLoad={() => ListLoad()}
        dataSource={list || []}
      />
    </Container>
  );
};

// ProjectListScreen.whyDidYouRender = true;

export default ProjectListScreen;

const Container = styled.div`
  padding: 3.2rem;
`;
