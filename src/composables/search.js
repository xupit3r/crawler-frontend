import { removeStopwords } from 'stopword/dist/stopword.umd';
import { useStaticStore } from '@/stores/static';

const punctuation = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
const spaces = /\s+/g;
const newlines = /(\r\n|\n|\r)/gm;

/**
 * Removes duplicate spaces within the string and any newlines
 * that might be present.
 * 
 * @param text text to "clean"
 * @returns cleaned text
 */
 const cleanText = (text) => {
  return text.replace(spaces, ' ')
             .replace(punctuation, ' ')
             .replace(newlines, ' ')
             .trim();
}

export const useSearch = () => {
  const staticStore = useStaticStore();

  const tokenize = (text) => {
    return text.split(/\s+/);
  }

  const search = (term) => {
    const tokens = tokenize(cleanText(term.toLowerCase()));
    const noStops = removeStopwords(tokens);

    const matched = staticStore.state.tf.filter((doc) => {
      return noStops.reduce((b, token) => {
        return b || !!doc.tf[token];
      }, false);
    });
    const idf = 1 + Math.log(
      staticStore.state.tf.length / 
      (1 + matched.length)
    );

    return matched.map((doc) => {
      const sum = noStops.map((token) => {
        return doc.tf[token] || 0;
      }).reduce((s, w) => s + w, 0);

      return {
        id: doc.page,
        score: sum * idf
      };
    }).sort((a, b) => b.score - a.score);
  }

  return {
    search
  };
}