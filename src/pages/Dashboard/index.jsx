/* eslint-disable no-nested-ternary */

import React, {
  useState, useEffect, useCallback, useMemo,
} from 'react';

import { AntDesign } from '@expo/vector-icons';

import { useIsFocused } from '@react-navigation/native';

import api from '../../services/api';
import {
  Title,
  Container,
  Text,
} from './styles';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const isFocused = useIsFocused();

  const loadTasks = useCallback(
    async () => {
      try {
        const response = await api.get('tasks');
        const sortedTasks = response.data.sort(({ createdAt: a },
          { createdAt: b }) => (a && b ? a < b ? 1 : -1 : 0));

        setTasks(sortedTasks);
      } catch (error) {
        console.log('load tasks', error);
      }
    }, [],
  );

  const loadProjects = useCallback(
    async () => {
      try {
        const response = await api.get('projects');
        const sortedProjects = response.data.sort(({ createdAt: a },
          { createdAt: b }) => (a && b ? a < b ? 1 : -1 : 0));

        setProjects(sortedProjects);
      } catch (error) {
        console.log('load tasks', error);
      }
    }, [],
  );

  useEffect(() => {
    loadProjects();
    loadTasks();
  }, [loadTasks, loadProjects, isFocused || false]);

  const filterById = (project) => (
    tasks.filter((task) => task.projectId === project.id));

  const tasksConcluded = useMemo(
    () => {
      const filtred = tasks.filter((task) => task.concluded);
      return filtred.length;
    }, [tasks],
  );

  return (
    <Container>
      <Title>
        <AntDesign name="profile" size={34} color="black" />
        Dashboard
      </Title>

      <Text>
        Total of Projects:
        {projects.length }
      </Text>

      <Text>
        Total of Tasks:
        {tasks.length}
      </Text>

      <Text>
        Tasks Cloncluded:
        {tasksConcluded}
      </Text>

      { projects.forEach((prjct) => {
        <Text>{prjct.description}</Text>;

        const filtred = filterById(prjct);

        return filtred.map((frt) => (
          <Text>{frt.description}</Text>
        ));
      }) }

    </Container>
  );
};

export default Dashboard;
