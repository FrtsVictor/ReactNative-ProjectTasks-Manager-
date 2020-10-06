/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useCallback } from 'react';

import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';
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

const Projectss = ({ navigation }) => {
  const [projects, setProjects] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const loadProjects = useCallback(
    async () => {
      try {
        const response = await api.get('projects');
        const sortedTasks = response.data.sort(({ createdAt: a },
          { createdAt: b }) => (a && b ? a < b ? 1 : -1 : 0));

        console.log('load tasks', sortedTasks);
        setProjects(sortedTasks);
      } catch (error) {
        console.log('load tasks', error);
      }
    }, [],
  );

  //   const clearAsyncStorage = async () => { await AsyncStorage.clear(); };

  useEffect(() => {
    // clearAsyncStorage();
    loadProjects();
  }, []);

  const handleAddProjects = useCallback(
    async () => {
      if (newTask === '') {
        setErrorMessage('Insert brand new Project');
        return;
      }

      setErrorMessage('');

      const params = {
        description: newTask,
        concluded: false,
      };

      try {
        await api.post('projects', params);

        loadProjects();
        setNewTask('');
      } catch (error) {
        console.log('error handleAddTask:', error);

        setErrorMessage('Problems with server');
      }
    }, [loadProjects, newTask],
  );

  const removeTask = async (task) => {
    await api.delete(`projects/${task.id}`);
    loadProjects();
  };

  return (
    <Container>
      {/* <Title>
        <AntDesign name="profile" size={34} color="black" />
        Projects
      </Title> */}

      <FormAddNewProject>
        <Input
          value={newTask}
          onChangeText={(text) => setNewTask(text)}
          placeholder="Create new project"
        />

        <Button onPress={() => { handleAddProjects(); }}>
          <ButtonTxt>
            Create
          </ButtonTxt>
        </Button>
      </FormAddNewProject>

      <Projects>
        { projects.map((prjct) => (
          <Project key={prjct.id}>
            <ProjectTxt>{prjct.description}</ProjectTxt>

            <ProjectActions>

              <AntDesign.Button
                backgroundColor="#FFF"
                name="closecircleo"
                size={24}
                color="red"
                onPress={() => removeTask(prjct)}
              />

              <AntDesign.Button
                backgroundColor="#FFF"
                name="rightsquareo"
                size={24}
                color="black"
                onPress={() => navigation.navigate('StackTasks', { prjct })}
              />

            </ProjectActions>
          </Project>
        ))}
      </Projects>
    </Container>
  );
};

export default Projectss;
