import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header/Header";
import Auth from "./components/Auth/Auth";
import Goals from "./components/Goals/Goals";
import AddGoal from "./components/Goals/AddGoal";
import GoalDetail from "./components/Goals/GoalDetail";
import { authActions } from "./store";
import Tasks from "./components/Tasks/Tasks";
import AddTask from "./components/Tasks/AddTask";
import TaskDetail from "./components/Tasks/TaskDetail";

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  // console.log(isLoggedIn);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(authActions.login());
    }
  }, [dispatch]);

  return (
    <div>
      <React.Fragment>
        <header>
          <Header />
        </header>
        <main>
          <Routes>
            {!isLoggedIn ? (
              <Route path="/auth" element={<Auth />} />
            ) : (
              <>
                <Route path="/goals" element={<Goals />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/goals/add" element={<AddGoal />} />
                <Route path="/tasks/add" element={<AddTask />} />
                <Route path="/goal/:id" element={<GoalDetail />} />
                <Route path="/task/:id" element={<TaskDetail />} />
              </>
            )}
            {/* <Route path="/" element={<Tasks />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/today" element={<Today />} /> */}
          </Routes>
        </main>
      </React.Fragment>
      {/* <Tasks /> */}
    </div>
  );
};

export default App;
