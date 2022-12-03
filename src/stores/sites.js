import { defineStore } from 'pinia';

const state = () => ({
  sites: []
});

const actions = {
  async getSites () {
    const resp = await fetch('/api/sites');
    const sites = await resp.json();

    this.sites = sites;

    return sites;
  }
}

export const useSitesStore = defineStore('sites', {
  state,
  actions
});