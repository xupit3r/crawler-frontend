export const useText = () => {
  const RELEVANT_PARENTS = ['p', 'div'];

  const isRelevant = (type, text) => {
    const tokens = text.split(/\s/);

    return tokens.length > 1 && RELEVANT_PARENTS.includes(type);
  }

  const assignEmoji = (score) => {
    if (score > 4) {
      return '😁';
    } else if (score > 3) {
      return '😄'
    } else if (score > 2) {
      return '😀';
    } else if (score > 1) {
      return '😆';
    } else if (score > 0) {
      return '🙂';
    } else if (score > -1) {
      return '😐'
    } else if (score > -2) {
      return '🙁'
    } else if (score > -3) {
      return '😬'
    } else if (score > -4) {
      return '😦';
    } else {
      return '🤢';
    }
  }

  return {
    isRelevant,
    assignEmoji
  };
}