import { defineStore } from 'pinia';

const countToLink = (name) => {
  if (name === 'pages') {
    return 'pages';
  } else if (name === 'links') {
    return 'links';
  } else if (name === 'queue') {
    return 'queue';
  } else if (name === 'cooldown') {
    return 'cooldown';
  } else if (name === 'sites') {
    return 'sites';
  } else {
    return 'dashboard';
  }
}

const state = () => ({
  counts: [],
  upNext: []
});

const actions = {
  async getCounts () {
    try {
      const resp = await fetch('/api/counts');
      const counts = await resp.json();

      this.counts = counts.map(count => ({
        ...count,
        ...{
          value: count.value.toLocaleString('en-US'),
          link: countToLink(count.name)
        }
      }))

      return this.counts;
    } catch (err) {
      return err;
    }
  },
  async getUpNext () {
    try {
      const resp = await fetch('/api/next/25');
      const upNext = await resp.json();
      
      this.upNext = upNext;

      return upNext;
    } catch (err) {
      return err;
    }
  }
};

export const useOverviewStore = defineStore('overview', {
  state,
  actions
});