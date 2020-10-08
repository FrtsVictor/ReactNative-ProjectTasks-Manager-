/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useCallback } from 'react';

import { AntDesign, Feather } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
// styles
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
  ErrorMessage,
} from './styles';

import apiTasks from '../../services/apiTasks';

const ProjectTasks = ({ route }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [updateTask, setUpdateTask] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [buttonEdit, setButtonEdit] = useState(false);

  const isFocused = useIsFocused();
  const project = route.params?.prjct;

  const loadTasks = useCallback(
    async () => {
      await apiTasks.getAll()
        .then((resp) => {
          const projectTasks = resp.filter((task) => task.projectId === project.id);
          setTasks(projectTasks);
        })
        .catch((error) => {
          console.log('load tasks', error);
        });
    }, [],
  );

  const editTaskInput = useCallback(
    (task) => {
      setNewTask(task.description);
      setButtonEdit(true);
      setUpdateTask(task);
      console.log('taaaaksss', updateTask);
    }, [],
  );

  const editTask = useCallback(
    async () => {
      await apiTasks.put(updateTask, newTask).then(() => {
        setNewTask('');
        setButtonEdit(false);
        loadTasks();
      }).catch((err) => console.log(err));
    }, [editTaskInput, updateTask, newTask],
  );

  const addTask = useCallback(
    async () => {
      if (newTask === '') {
        setErrorMessage('Insert brand new Task');
        return;
      }
      setErrorMessage('');
      await apiTasks.post(newTask, project).then(() => {
        loadTasks();
        setNewTask('');
      }).catch((error) => {
        console.log('error handleAddTask:', error);
        setErrorMessage('Problems with server');
      });
    }, [loadTasks, newTask],
  );

  const setConclued = useCallback(
    async (task) => {
      await apiTasks.setConcluded(task)
        .then((resp) => resp)
        .catch((err) => err);
      loadTasks();
    }, [loadTasks],
  );

  const removeTask = useCallback(
    async (task) => {
      await apiTasks.delete(task);
      loadTasks();
    }, [loadTasks],
  );

  useEffect(() => {
    loadTasks();
    setErrorMessage('');
  }, [loadTasks, isFocused || false]);

  return (
    <Container>
      <FormAddNewProject>
        <Input
          value={newTask}
          onChangeText={(text) => setNewTask(text)}
          placeholder="Create new tasks"
        />
        { !buttonEdit ? (
          <Button onPress={() => { addTask(); }}>
            <ButtonTxt>
              Create
            </ButtonTxt>
          </Button>
        )
          : (
            <Button onPress={() => { editTask(); }}>
              <ButtonTxt>
                Edit
              </ButtonTxt>
            </Button>
          )}

      </FormAddNewProject>

      { errorMessage !== '' ? (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      ) : (
        null
      )}

      <Projects>
        { tasks.map((tsk) => (
          <Project key={tsk.id}>
            <ProjectTxt>{tsk.description}</ProjectTxt>

            <ProjectActions>
              {tsk.concluded ? (
                <>
                  <AntDesign.Button
                    backgroundColor="#FFF"
                    name="closecircleo"
                    size={20}
                    color="red"
                    onPress={() => removeTask(tsk)}
                  />
                  <AntDesign.Button
                    backgroundColor="#FFF"
                    name="checkcircleo"
                    size={20}
                    color="green"
                    onPress={() => setConclued(tsk)}
                  />

                </>
              ) : (
                <>
                  <Feather.Button
                    backgroundColor="#FFF"
                    name="edit-3"
                    size={20}
                    color="black"
                    onPress={() => editTaskInput(tsk)}
                  />

                  <AntDesign.Button
                    backgroundColor="#FFF"
                    name="check"
                    size={20}
                    color="black"
                    onPress={() => setConclued(tsk)}
                  />
                </>
              )}

            </ProjectActions>
          </Project>
        ))}
      </Projects>
    </Container>
  );
};

export default ProjectTasks;
