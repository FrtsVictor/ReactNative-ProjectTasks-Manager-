/* eslint-disable no-nested-ternary */
import React, {
  useState, useEffect, useCallback, useMemo, useContext,
} from 'react';

import { useIsFocused } from '@react-navigation/native';
import { UserContext } from '../../context/userContext';
// Api calls
import api from '../../services/api';

import Container from '../../components/container';

// Styles
import {
  Text,
  Dash,
  TitleTxt,
  ViewDash,
  TxtNotConclued,
  TxtConclued,
} from './styles';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const isFocused = useIsFocused();

  const { user } = useContext(UserContext);

  const tasksByUser = (list) => list.filter((prjTsk) => prjTsk.userId === user.id);

  const projectjTasks = (resp) => resp.reduce((taskList, project) => {
    project.tasks.forEach((pt) => taskList.push(pt));
    return taskList;
  }, []);

  const loadProjectsTasks = useCallback(
    async () => {
      const response = await api.get('projects?_embed=tasks')
        .then((resp) => {
          setProjects(resp.data);
          const prjTsk = projectjTasks(resp.data);
          setTasks(tasksByUser(prjTsk));
          return response;
        })
        .catch((error) => {
          console.log('load tasks', error);
        });
    }, [],
  );

  const tasksConcluded = useMemo(
    () => {
      const filtred = tasks.filter((task) => task.concluded);
      return filtred.length;
    }, [tasks],
  );

  const pendingTasks = useMemo(
    () => {
      const filtred = tasks.filter((task) => !task.concluded);
      return filtred.length;
    }, [tasks],
  );

  useEffect(() => {
    loadProjectsTasks();
  }, [loadProjectsTasks, isFocused || false]);

  return (
    <Container>

      <Dash>
        <TitleTxt>
          Total of  Projects:
          <Text>{projects.length }</Text>
        </TitleTxt>

        <TitleTxt>
          Total of your Tasks:
          <Text>{tasks.length}</Text>
        </TitleTxt>

        <TitleTxt>
          Yout tasks Cloncluded:
          <Text>{tasksConcluded}</Text>
        </TitleTxt>
        <TitleTxt>
          Your pending tasks:
          <Text>{pendingTasks}</Text>
        </TitleTxt>
      </Dash>

      <Dash key="1">
        {projects.map((project) => (
          <ViewDash key={project.id}>

            <TitleTxt key={project.id}>{project.description}</TitleTxt>

            {project.tasks.map(
              (tsk) => {
                if (user.id === tsk.userId) {
                  return tsk.concluded ? (
                    <TxtConclued key={tsk.id}>
                      {tsk.description}
                    </TxtConclued>
                  ) : (
                    <TxtNotConclued key={tsk.id}>
                      {tsk.description}
                    </TxtNotConclued>
                  );
                }
              },
            )}
          </ViewDash>
        ))}
      </Dash>

    </Container>
  );
};

export default Dashboard;
