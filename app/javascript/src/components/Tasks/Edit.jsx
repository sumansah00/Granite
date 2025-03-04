import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import tasksApi from "apis/tasks";
import usersApi from "apis/users";
import { Container, PageLoader, PageTitle } from "components/commons";

import Form from "./Form";

const Edit = ({ history }) => {
  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState("");
  const [assignedUser, setAssignedUser] = useState({ id: null, name: "" });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const { slug } = useParams();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await tasksApi.update({
        slug,
        payload: { title, assigned_user_id: userId },
      });
      setLoading(false);
      history.push("/dashboard");
    } catch (error) {
      setLoading(false);
      logger.error(error);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const {
        data: { users },
      } = await usersApi.fetch();
      setUsers(users);
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchTaskDetails = async () => {
    try {
      const response = await tasksApi.show(slug);
      const {
        data: {
          task: { title, assigned_user },
        },
      } = response;
      setTitle(title);
      setAssignedUser(assigned_user);
      setUserId(assigned_user.id);
    } catch (error) {
      logger.error(error);
    }
  };

  const loadData = async () => {
    await Promise.all([fetchTaskDetails(), fetchUserDetails()]);
    setPageLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (pageLoading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container>
      <div className="flex flex-col gap-y-8">
        <PageTitle title="Edit task" />
        <Form
          {...{ assignedUser }}
          handleSubmit={handleSubmit}
          loading={loading}
          {...{ setTitle }}
          setUserId={setUserId}
          title={title}
          users={users}
          {...{ userId }}
        />
      </div>
    </Container>
  );
};

export default Edit;
