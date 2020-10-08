/* eslint-disable no-nested-ternary */

import React, {
  useState, useEffect, useCallback, useMemo,
} from 'react';

import { useIsFocused } from '@react-navigation/native';

// Api calls
import apiProjects from '../../services/apiProjects';
import apiTasks from '../../services/apiTasks';
import api from '../../services/api';
// Styles
import {
  Container,
  Text,
  Dash,
  TitleTxt,
  Views,
  ViewDash,
} from './styles';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [projectTasks, setProjectTasks] = useState([]);
  const isFocused = useIsFocused();

  const loadTasks = useCallback(
    async () => {
      apiTasks.getAll()
        .then((resp) => setTasks(resp))
        .catch((error) => {
          console.log('load tasks', error);
        });
    }, [],
  );

  const loadProjects = useCallback(
    async () => {
      apiProjects.getAll()
        .then((resp) => setProjects(resp))
        .catch(((err) => {
          console.log('getAll Projects', err);
        }));
    }, [],
  );

  const loadProjectsTasks = useCallback(
    async () => {
      const response = await api.get('projects?_embed=tasks')
        .then((resp) => {
          setProjectTasks(resp.data);
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

  useEffect(() => {
    loadProjects();
    loadTasks();
    loadProjectsTasks();
  }, [loadProjectsTasks, loadTasks, loadProjects, isFocused || false]);

  return (
    <Container>

      <Dash>
        <TitleTxt>
          Total of Projects:
          <Text>{projects.length }</Text>
        </TitleTxt>

        <TitleTxt>
          Total of Tasks:
          <Text>{tasks.length}</Text>
        </TitleTxt>

        <TitleTxt>
          Tasks Cloncluded:
          <Text>{tasksConcluded}</Text>
        </TitleTxt>
      </Dash>

      <Views />

      <Dash key="1">
        {projectTasks.map((project) => (
          <ViewDash key={project.id}>

            <TitleTxt key={project.id}>{project.description}</TitleTxt>

            {project.tasks.map((tsk) => <Text key={tsk.id}>{tsk.description}</Text>)}
          </ViewDash>
        ))}
      </Dash>

    </Container>
  );
};

export default Dashboard;
