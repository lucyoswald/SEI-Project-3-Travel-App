import jwt_decode from "jwt-decode";

export function getLoggedInUser() {
  if (!localStorage) return false;

  const token = localStorage.getItem("token");
  if (!token) return false;
  const decodedToken = jwt_decode(token);
  console.log(decodedToken);
  const userId = decodedToken.id;
  return userId;
}
