function required(key: string, defaultValue: any = undefined) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}

export const config = {
  api: required('REACT_APP_API_DOMAIN_URL'),
  openviduApi: required('REACT_APP_OPENVIDU_URL'),
  openviduKey: required('REACT_APP_OPENVIDU_KEY')
};
