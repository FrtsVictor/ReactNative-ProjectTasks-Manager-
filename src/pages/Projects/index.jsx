import React, { useState, useEffect, useCallback } from 'react';

import { AntDesign, Feather } from '@expo/vector-icons';

import { useIsFocused } from '@react-navigation/native';

import Container from '../../components/container';
import Btn from '../../components/ButtonCreatEdit';
import Input from '../../components/textInput';

// Api
import api from '../../services/api';

import apiProject from '../../services/apiProjects';
// Styles
import {
  ButtonTxt,
  FormAddNewProject,
  Projects,
  Project,
  ProjectTxt,
  ProjectActions,
  ErrorMessage,
} from './styles';

const Projectss = ({ navigation }) => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [updateProject, setUpdateProject] = useState({});
  const [buttonEdit, setButtonEdit] = useState(false);
  const isFocused = useIsFocused();

  const loadProjects = useCallback(
    async () => {
      apiProject.getAll()
        .then((resp) => {
          setProjects(resp);
        }).catch(((err) => {
          console.log('getAll Projects', err);
        }));
    }, [],
  );

  const editTaskInput = useCallback(
    (project) => {
      setNewProject(project.description);
      setButtonEdit(true);
      setUpdateProject(project);
    }, [],
  );

  const editTask = useCallback(
    async () => {
      await apiProject.put(updateProject, newProject).then(() => {
        setNewProject('');
        setButtonEdit(false);
        loadProjects();
      }).catch((err) => console.log(err));
    }, [editTaskInput, updateProject, newProject],
  );

  const addProject = useCallback(
    async () => {
      if (!newProject) {
        setErrorMessage('Insert brand new Project');
        return;
      }

      setErrorMessage('');

      apiProject.post(newProject).then(() => {
        loadProjects();
        setNewProject('');
      }).catch((err) => {
        setErrorMessage('Problems with server');
        console.log('post Project', err);
      });
    }, [loadProjects, newProject],
  );

  const removeProject = async (project) => {
    await api.delete(`projects/${project.id}`);
    loadProjects();
  };

  useEffect(() => {
    loadProjects();
    setErrorMessage('');
  }, [loadProjects, isFocused || false]);

  return (
    <Container>
      <FormAddNewProject>
        <Input
          value={newProject}
          onChangeText={(text) => setNewProject(text)}
          placeholder="Create new project"
        />

        { !buttonEdit ? (
          <Btn onPress={() => { addProject(); }}>
            <ButtonTxt>
              Create
            </ButtonTxt>
          </Btn>
        )
          : (
            <Btn onPress={() => { editTask(); }}>
              <ButtonTxt>
                Edit
              </ButtonTxt>
            </Btn>
          )}
      </FormAddNewProject>

      { errorMessage !== '' ? (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      ) : (
        null
      )}

      <Projects>
        { projects.map((prjct) => (
          <Project key={prjct.id}>
            <ProjectTxt>{prjct.description}</ProjectTxt>

            <ProjectActions>

              <Feather.Button
                backgroundColor="trasnparent"
                name="edit-3"
                size={20}
                color="black"
                onPress={() => { editTaskInput(prjct); }}
              />

              <AntDesign.Button
                backgroundColor="#trasnparent"
                name="closecircleo"
                size={20}
                color="red"
                onPress={() => removeProject(prjct)}
              />

              <AntDesign.Button
                backgroundColor="#trasnparent"
                name="rightsquareo"
                size={20}
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
