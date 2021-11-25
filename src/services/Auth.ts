export const TOKEN_KEY = "auth";
export const isAuthenticated = (): boolean => !!getCookie(TOKEN_KEY);
export const getToken = () => getCookie(TOKEN_KEY);

export const login = (token: string, scope: string) => {
  createCookie(TOKEN_KEY, token, 3600);
  localStorage.setItem(TOKEN_KEY + "_scope", scope);
};
export const logout = () => {
  createCookie(TOKEN_KEY, "", -1);
  localStorage.removeItem(TOKEN_KEY + "_scope");
};
export const getScope = (): string => {
  return localStorage.getItem(TOKEN_KEY + "_scope") ?? "";
};

function createCookie(name: string, value: string, minutos: number) {
  var expires;
  if (minutos) {
    var date = new Date();
    date.setTime(date.getTime() + minutos * 60 * 1000);
    expires = "; expires=" + date.toISOString();
  } else {
    expires = "";
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(c_name: string) {
  if (document.cookie.length > 0) {
    let c_start = document.cookie.indexOf(c_name + "=");
    if (c_start !== -1) {
      c_start = c_start + c_name.length + 1;
      let c_end = document.cookie.indexOf(";", c_start);
      if (c_end === -1) {
        c_end = document.cookie.length;
      }
      return unescape(document.cookie.substring(c_start, c_end));
    }
  }
  return "";
}

export const isAdmin = getScope().toLocaleLowerCase() === "admin";
