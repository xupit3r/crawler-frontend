import { defineStore } from 'pinia';
import { countToLink } from '@/utils/links';

const state = () => ({
  counts: [],
  upNext: [],

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
      const resp = await fetch('/api/next/10');
      const upNext = await resp.json();
      
      this.upNext = upNext;

      return this.upNext;
    } catch (err) {
      return err;
    }
  },
  async getCooldown () {
    try {
      const resp = await fetch('/api/cooldown');
      const cooldown = await resp.json();
      
      this.cooldown = cooldown;

      return this.cooldown;
    } catch (err) {
      return err;
    }
  }
};

export const useOverviewStore = defineStore('overview', {
  state,
  actions
});