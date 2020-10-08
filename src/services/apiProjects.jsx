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
    async (desc) => {
      try {
        const reponse = await api.post('projects', {
          description: desc,
        });
        return reponse.data;
      } catch (error) {
        return console.log('Post', error);
      }
    },

  put:
    async (project, desc) => {
      try {
        const response = await api.put(`projects/${project.id}`, {
          description: desc,
        });
        return response;
      } catch (error) {
        return console.log(error);
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
