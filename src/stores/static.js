import { reactive } from "vue";

const state = {
  pages: {},
  tf: []
};

const ready = reactive({
  pages: false,
  tf: false
});

const loaded = reactive({
  pages: false,
  tf: false
});

export const useStaticStore = () => {
  const addPage = (doc) => {
    state.pages[doc._id] = doc;
    
    if (Object.keys(state.pages).length > 10000) {
      ready.pages = true;
    }
  }

  const pagesLoaded = () => {
    loaded.pages = true;
  }

  const addTF = (doc) => {
    state.tf.push(doc);
    
    if (state.tf.length > 10000) {
      ready.tf = true;
    }
  }

  const tfLoaded = () => {
    loaded.tf = true;
  }

  return {
    state,
    addPage,
    pagesLoaded,
    addTF,
    tfLoaded,
    ready,
    loaded
  };
}