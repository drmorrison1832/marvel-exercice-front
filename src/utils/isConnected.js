function userConnected() {
  const isConnected = !Cookies.get("userCookie");
  if (!isConnected) {
    console.log("User has been disconnected");
    setCurrentUser(null);
    setCurrentUserSavedItems(null);
  }
  return isConnected;
}

export default userConnected;
