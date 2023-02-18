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
  },
  async getSite (siteId) {
    try {
      const resp = await fetch(`/api/sites/byid/${siteId}`);
      const site = await resp.json();

      return site;
    } catch (err) {
      return err;
    }
  }
}

export const useSitesStore = defineStore('sites', {
  state,
  actions
});