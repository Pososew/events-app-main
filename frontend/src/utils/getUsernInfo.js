const decodeToken = (token) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

  const decodedPayload = JSON.parse(window.atob(base64));
  return decodedPayload;
};

export const getUserInfo = () => {
  const token = localStorage.getItem("authToken");
  if (token) {
    const decoded = decodeToken(token);
    const userEmail = decoded.email;
    const userId = decoded.userId;

    return {
      userEmail,
      userId,
    };
  } else return {
    userEmail: null,
    userId: null,
  }
};
