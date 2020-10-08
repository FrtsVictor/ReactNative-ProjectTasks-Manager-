import React, { useState, useEffect, useCallback } from 'react';

import { AntDesign } from '@expo/vector-icons';

import { useIsFocused } from '@react-navigation/native';

// Api
import api from '../../services/api';
import projectApi from '../../services/apiProjects';
// Styles
import {
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
  const [newTask, setNewProject] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const isFocused = useIsFocused();

  const loadProjects = useCallback(
    async () => {
      projectApi.getAll()
        .then((resp) => {
          setProjects(resp);
        }).catch(((err) => {
          console.log('getAll Projects', err);
        }));
    }, [],
  );

  //   const user = async () => {
  //     const resp = await AsyncStorage.getItem('@TODO:user');
  //     console.log('assync storage here', resp);
  //   };

  useEffect(() => {
    loadProjects();
  }, [isFocused || false]);

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

      projectApi.post(params).then((resp) => {
        loadProjects();
        setNewProject('');
        console.log(resp);
      }).catch((err) => {
        setErrorMessage('Problems with server');
        console.log('post Project', err);
      });
    }, [loadProjects, newTask],
  );

  const removeProject = async (project) => {
    await api.delete(`projects/${project.id}`);
    loadProjects();
  };

  return (
    <Container>
      <FormAddNewProject>
        <Input
          value={newTask}
          onChangeText={(text) => setNewProject(text)}
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
                onPress={() => removeProject(prjct)}
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
