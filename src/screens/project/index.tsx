import React from "react";
import { Route, Routes, Navigate } from "react-router";
import { Link } from "react-router-dom";
import KanbanScreen from "../kanban";
import EpicScreen from "../epic";

const ProjectScreen = () => {
  return (
    <div>
      <Link to={"kanban"}>看板</Link>
      <Link to={"epic"}>任务</Link>
      <Routes>
        <Route path={"/kanban"} element={<KanbanScreen />}>
          看板
        </Route>
        <Route path={"/epic"} element={<EpicScreen />}>
          任务组
        </Route>
        <Route
          index
          element={
            <Navigate replace to={window.location.pathname + "/kanban"} />
          }
        />
      </Routes>
    </div>
  );
};

export default ProjectScreen;
