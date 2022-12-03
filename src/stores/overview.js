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
  } else {
    return 'dashboard';
  }
}

const state = () => ({
  counts: []
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

      return counts;
    } catch (err) {
      return err;
    }
  }
};

export const useOverviewStore = defineStore('overview', {
  state,
  actions
});