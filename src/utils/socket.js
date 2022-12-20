import { useOverviewStore } from '@/stores/overview';
import { useStaticStore } from '@/stores/static';
import { countToLink } from '@/utils/links';

const state = {
  socket: null
};

export const useSocket = () => {
  const overviewStore = useOverviewStore();
  const staticStore = useStaticStore();
  const SOCKET_URL = (process.env.NODE_ENV === 'production'
    ? `wss://${location.hostname}:${location.port}/ws`
    : `ws://${location.hostname}:${location.port}/ws`
  );

  const onMessage = ev => {
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
    } else if (data.type === 'page') {
      staticStore.addPage(data.page);
    } else if (data.type === 'tf') {
      if (data.tf){ 
        staticStore.addTF(data.tf);
      } else if (data.done) {
        staticStore.tfLoaded();
      }
    }
  };
  
  const connectSocket = () => {
    if (state.socket === null) {
      state.socket = new WebSocket(SOCKET_URL);
      state.socket.addEventListener('error', () => {
        state.socket = null;
        setTimeout(connectSocket, 100);
      });

      state.socket.removeEventListener('message',onMessage);
      state.socket.addEventListener('message', onMessage);
    }
  }

  const socketSend = (data) => {
    if (state.socket === null ||
        state.socket.readyState !== 1) {
      return setTimeout(() => {
        socketSend(data);
      }, 10);
    }

    state.socket.send(JSON.stringify(data));
  }

  connectSocket();

  return {
    socketSend,
    socket: state.socket
  };
}