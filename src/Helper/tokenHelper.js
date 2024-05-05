class tokenHelper {
  constructor() {
    this.key = "token";
  }
  get = () => {
    return window.localStorage.getItem(this.key);
  };
  create = (token, value) => {
    window.localStorage.setItem(token, value);
  };
}
export default tokenHelper = new tokenHelper();
