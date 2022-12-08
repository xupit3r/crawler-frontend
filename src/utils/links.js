export const countToLink = (name) => {
  if (name === 'pages') {
    return 'pages';
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