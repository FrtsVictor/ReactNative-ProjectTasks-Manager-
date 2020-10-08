/* eslint-disable no-nested-ternary */
import api from './api';

const sortList = (list) => list.sort((a, b) => (a.nome > b.nome ? 1 : a.nome < b.nome ? -1 : 0));

const projectApi = {

  getAll:
    async () => {
      try {
        const response = await api.get('projects');
        return sortList(response.data);
      } catch (error) {
        return console.log('load projects', error);
      }
    },

  post:
    async (newProject) => {
      try {
        const reponse = await api.post('projects', {
          description: newProject.description,
          concluded: false,
        });
        return reponse.data;
      } catch (error) {
        return console.log('Post', error);
      }
    },

  delete:
    async (project) => {
      try {
        const response = await api.delete(`projects/${project.id}`);
        return response.data;
      } catch (error) {
        return console.log('delete projects', error);
      }
    },

};

export default projectApi;
