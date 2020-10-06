/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useCallback } from 'react';

import { AntDesign } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import {
  Title,
  Input,
  Button,
  ButtonTxt,
  Container,
  FormAddNewProject,
  Projects,
  Project,
  ProjectTxt,
  ProjectActions,
} from './styles';

import api from '../../services/api';

const ProjectTasks = ({ route }) => {
  // eslint-disable-next-line react/prop-types
  const project = route.params?.prjct;

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const isFocused = useIsFocused();

  const loadTasks = useCallback(
    async () => {
      try {
        const response = await api.get('tasks');

        const sortedTasks = response.data.sort(({ createdAt: a },
          { createdAt: b }) => (a && b ? a < b ? 1 : -1 : 0));

        const projectTasks = sortedTasks.filter((task) => task.projectId === project.id);
        setTasks(projectTasks);
      } catch (error) {
        console.log('load tasks', error);
      }
    }, [],
  );

  useEffect(() => {
    loadTasks();
  }, [loadTasks, isFocused || false]);

  const handleAddTask = useCallback(
    async () => {
      if (newTask === '') {
        setErrorMessage('Insert brand new Task');
        return;
      }

      setErrorMessage('');

      const params = {
        description: newTask,
        concluded: false,
      };

      try {
        await api.post('tasks', params);

        loadTasks();
        setNewTask('');
      } catch (error) {
        console.log('error handleAddTask:', error);

        setErrorMessage('Problems with server');
      }
    }, [loadTasks, newTask],
  );

  const handleTask = useCallback(
    async (task) => {
      const params = {
        ...task,
        concluded: !task.concluded,
      };

      await api.put(`tasks/${task.id}`, params);

      loadTasks();
    }, [loadTasks],
  );

  const removeTask = async (task) => {
    await api.delete(`tasks/${task.id}`);
    loadTasks();
  };

  return (
    <Container>
      <Title>
        <AntDesign name="profile" size={34} color="black" />
        {project.description}
      </Title>

      <FormAddNewProject>
        <Input
          value={newTask}
          onChangeText={(text) => setNewTask(text)}
          placeholder="Create new tasks"
        />

        <Button onPress={() => { handleAddTask(); }}>
          <ButtonTxt>
            Create
          </ButtonTxt>
        </Button>
      </FormAddNewProject>

      <Projects>
        { tasks.map((tsk) => (
          <Project key={tsk.id}>
            <ProjectTxt>{tsk.description}</ProjectTxt>

            <ProjectActions>
              {tsk.concluded ? (
                <>
                  <AntDesign.Button
                    backgroundColor="#FFF"
                    name="checkcircleo"
                    size={24}
                    color="green"
                    onPress={() => handleTask(tsk)}
                  />

                  <AntDesign.Button
                    backgroundColor="#FFF"
                    name="closecircleo"
                    size={24}
                    color="red"
                    onPress={() => removeTask(tsk)}
                  />

                </>
              ) : (

                <AntDesign.Button
                  backgroundColor="#FFF"
                  name="loading1"
                  size={24}
                  color="black"
                  onPress={() => handleTask(tsk)}
                />

              )}

            </ProjectActions>
          </Project>
        ))}
      </Projects>
    </Container>
  );
};

export default ProjectTasks;
