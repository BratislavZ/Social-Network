export const setCookie = (name: string, value: string, seconds: number) => {
  let expires = "";
  const encodeValue = encodeURI(value);
  if (seconds) {
    const date = new Date();
    date.setTime(date.getTime() + seconds);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (encodeValue || "") + expires + "; path=/";
};

export const getCookie = (name: string) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0)
      return decodeURI(c.substring(nameEQ.length, c.length));
  }
  return null;
};

export const eraseCookie = (name: string) => {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};
