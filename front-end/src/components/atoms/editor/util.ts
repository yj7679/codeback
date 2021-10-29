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
