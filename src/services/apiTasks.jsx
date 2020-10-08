/* eslint-disable no-nested-ternary */
import api from './api';

const sortList = (list) => list.sort((a, b) => (a.nome > b.nome ? 1 : a.nome < b.nome ? -1 : 0));
const taskApi = {

  getAll:
    async () => {
      try {
        const response = await api.get('tasks');
        return sortList(response.data);
      } catch (error) {
        return console.log('load projects', error);
      }
    },

  post:
    async (newTask, project) => {
      try {
        const reponse = await api.post('tasks', {
          description: newTask,
          concluded: false,
          projectId: project.id,
        });
        console.log(reponse.data);
        return reponse.data;
      } catch (error) {
        return console.log('error handleAddTask:', error);
      }
    },

  put:
    async (task, desc) => {
      console.log('puuuut', task, desc);
      try {
        const response = await api.put(`tasks/${task.id}`, {
          ...task,
          description: desc,
        });
        return response;
      } catch (error) {
        return console.log(error);
      }
    },

  setConcluded:
    async (task) => {
      await api.put(`tasks/${task.id}`, {
        ...task,
        concluded: !task.concluded,
      }).then(() => {
        console.log(task);
      })
        .catch((err) => console.log(err));
    },

  delete:
    async (task) => {
      try {
        const response = await api.delete(`tasks/${task.id}`);
        return response.data;
      } catch (error) {
        return console.log('delete projects', error);
      }
    },

};

export default taskApi;
