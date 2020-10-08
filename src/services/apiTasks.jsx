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
    async (newTask, prjctId, userId) => {
      try {
        const reponse = await api.post('tasks', {
          description: newTask.description,
          concluded: false,
          projectId: prjctId,
          userId,
        });

        return reponse.data;
      } catch (error) {
        return console.log('error handleAddTask:', error);
      }
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
