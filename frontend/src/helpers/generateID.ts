const generateID = (length: number) =>
  window
    .btoa(
      Array.from(window.crypto.getRandomValues(new Uint8Array(length * 2)))
        .map((c) => String.fromCharCode(c))
        .join("")
    )
    .replace(/[+/]/g, "")
    .substring(0, length);

export default generateID;
