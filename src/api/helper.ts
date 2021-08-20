export const jsonFormat = (str: any) => {
  const string = JSON.stringify(str).replace(/(?:\\[rn])+/g, '');
  const object = JSON.parse(string);
  return object;
};
