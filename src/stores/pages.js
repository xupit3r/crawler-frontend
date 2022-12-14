import { defineStore } from 'pinia';


const state = () => ({
  filter: {
    textSearch: ''
  },
  results: {
    pages: [],
    suggestions: []
  }
});

const actions = {
  async getPages (limit = -1) {
    const url = (limit > -1
      ? `/api/pages?limit=${limit}`
      : '/api/pages'
    );
    
    try {
      const resp = await fetch(url);
      const pages = await resp.json();

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
  },
  async getPageTexts () {
    try {
      const resp = await fetch(`/api/pages/texts`);
      const texts = await resp.json();

      return texts;
    } catch (err) {
      return err;
    }
  },
  async getPageText (pageId) {
    try {
      const resp = await fetch(`/api/pages/text/${pageId}`);
      const text = await resp.json();

      return text;
    } catch (err) {
      return err;
    }
  },
  async getPageResults (term) {
    try {
      const resp = await fetch(`/api/search/pages?term=${term}`);
      const pages = await resp.json();

      this.results.pages = pages;

      return pages;
    } catch (err) {
      return err;
    }
  },
  async getSuggestions (term) {
    try {
      const resp = await fetch(`/api/search/pages/suggestions?term=${term}`);
      const suggestions = await resp.json();

      this.results.suggestions = suggestions;

      return suggestions;
    } catch (err) {
      return err;
    }
  }
};

export const usePagesStore = defineStore('pages', {
  state,
  actions
})