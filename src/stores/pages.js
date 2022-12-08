import { defineStore } from 'pinia';


const state = () => ({
  pages: []
});

const actions = {
  async getPages () {
    try {
      const resp = await fetch('/api/pages');
      const pages = await resp.json();

      this.pages = pages;

      return pages;
    } catch (err) {
      return err;
    }
  },
  async getPage (pageId) {
    try {
      const resp = await fetch(`/api/pages/byid/${pageId}`);
      const page = await resp.json();

      return page;
    } catch (err) {
      return err;
    }
  }
};

export const usePagesStore = defineStore('pages', {
  state,
  actions
})