import { useOverviewStore } from '@/stores/overview';
import { countToLink } from '@/utils/links';

const state = {
  socket: null
};

export const useSocket = () => {
  const overviewStore = useOverviewStore();
  const SOCKET_URL = `ws://${location.hostname}:${location.port}/ws`;
  
  try {
    state.socket = new WebSocket(SOCKET_URL);
  } catch (err) {
    console.error('could not connect to socket', err);
  }

  state.socket.addEventListener('message', ev => {
    const data = JSON.parse(ev.data);
  
    if (data.type === 'dashboard') {
      overviewStore.counts = data.counts.map(count => ({
        ...count,
        ...{
          value: count.value.toLocaleString('en-US'),
          link: countToLink(count.name)
        }
      }));

      overviewStore.upNext = data.upNext;
      overviewStore.cooldown = data.cooldown;
    }
  });
}