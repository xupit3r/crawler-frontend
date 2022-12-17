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
  const corpus = [];
  
  const tokenize = (text) => {
    return text.split(/\s+/);
  }

  const getWeightedFrequencies = (doc) => {
    const cleaned = cleanText(doc);
    const tokens = tokenize(cleaned);

    const freqs = tokens.reduce((freqs, token) => {
      if (!freqs[token]) {
        freqs[token] = 0;
      }

      freqs[token]++;

      return freqs;
    }, {});

    const maxTermFreq = Math.max.apply(Math.max, Object.values(freqs));

    return Object.keys(freqs).reduce((w, key) => {
      w[key] = freqs[key] / maxTermFreq;
      return w;
    }, {});
  }

  const addDocuments = (docs, idKey = 'page') => {
    docs.forEach(doc => {
      corpus.push({
        id: doc[idKey],
        freqs: getWeightedFrequencies(doc.text) 
      });
    });
  }

  const search = (term) => {
    const tokens = tokenize(term.toLowerCase());
    const matched = corpus.filter((doc) => {
      return tokens.reduce((b, token) => {
        return b || !!doc.freqs[token];
      }, false);
    });
    const idf = 1 + Math.log(corpus.length / 1 + matched.length);

    return matched.map((doc) => {
      const sum = tokens.map((token) => {
        return doc.freqs[token] || 0;
      }).reduce((s, w) => s + w, 0);

      return {
        id: doc.id,
        score: sum * idf
      };
    }).sort((a, b) => b.score - a.score);
  }

  return {
    addDocuments,
    search
  };
}