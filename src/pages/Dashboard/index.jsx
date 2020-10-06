import React, {
  useState, useEffect, useCallback, useMemo,
} from 'react';

import { Feather } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import api from '../../services/api';

import {
  TaskText, TaskView, Title, LogoutBtnTxt, LogoutBtn, TaskP, TaskBoldP, Container,
} from './styles';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  const isFocused = useIsFocused();

  const loadTasks = useCallback(
    async () => {
      const response = await api.get('tarefas');
      setTasks(response.data);
      console.log('loadTasks Aqui');
    }, [],
  );

  const tasksConcludedQtd = useMemo(
    () => {
      const filtered = tasks.filter((task) => task.concluido === true);
      console.log('memoriaa');

      return filtered.length;
    }, [tasks],
  );

  const taskQtd = useMemo(
    () => tasks.length, [tasks],
  );

  // load page at start
  useEffect(() => {
    loadTasks();
  }, [loadTasks, isFocused || false]);

  return (
    <Container>
      <Title>
        <Feather name="layers" size={34} color="black" />

        Dashboard
      </Title>
      <TaskView>
        {taskQtd - tasksConcludedQtd === 0 ? (
          <TaskText>Congratz! You have done all Tasks</TaskText>
        ) : (
          <TaskText>
            You have
            {' '}
            { taskQtd - tasksConcludedQtd }
            {' '}
            pendding tasks
          </TaskText>
        )}
        <TaskP>
          Tasks concluded:
          {' '}
          <TaskBoldP>
            {tasksConcludedQtd }
            {' '}
          </TaskBoldP>
        </TaskP>
        <TaskP>
          Total:
          {' '}
          <TaskBoldP>
            {taskQtd }
            {' '}
          </TaskBoldP>
        </TaskP>
        <LogoutBtn>
          <LogoutBtnTxt>
            Logout
          </LogoutBtnTxt>
        </LogoutBtn>
      </TaskView>
    </Container>
  );
};

export default Dashboard;
