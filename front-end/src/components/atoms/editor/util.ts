export const setLanguageString = (lang: string) => {
  switch (lang) {
    case 'C++':
      return 'text/x-c++src';
    case 'Java':
      return 'text/x-java';
    case 'Python':
      return 'text/x-python';
    case 'JavaScript':
      return 'text/javascript';
    default:
      return '';
  }
};

export const setThemeString = (theme: string) => {
  switch (theme) {
    case 'Dark':
      return 'material-darker';
    case 'Bright':
      return 'eclipse';
    default:
      return '';
  }
};

export const getBackgroundColor = (theme: string) => {
  if (theme === 'Dark') {
    return '#212121';
  } else {
    return '#ffffff';
  }
};
