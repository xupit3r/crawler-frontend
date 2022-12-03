import { defineStore } from 'pinia';

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
          value: count.value.toLocaleString('en-US')
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