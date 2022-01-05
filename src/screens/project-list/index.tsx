import React, { useState } from "react";
import List from "./list";
import SearchPanel from "./search-panel";
import { useDebounce, useDocumentTitle, useMount } from "../../utils";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { useProjects } from "utils/project";
import { useUrlQueryParam } from "../../utils/url";
import { ButtonNoPadding, Row } from "components/Lib";

const ProjectListScreen = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  const debounceParam = useDebounce(param, 200);
  const [users, setUsers] = useState([]);
  useDocumentTitle("项目列表", true);
  const client = useHttp();
  const { isLoading, data: list, retry } = useProjects(debounceParam);
  const loadUserData = () => {
    client("users").then(setUsers);
  };

  useMount(() => {
    loadUserData();
  });
  return (
    <Container>
      <Row marginBottom={2} between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding type={"link"}>创建项目</ButtonNoPadding>
      </Row>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List
        loading={isLoading}
        users={users}
        onLoad={() => retry()}
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
