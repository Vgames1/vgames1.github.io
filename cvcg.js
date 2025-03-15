
const accounts = [
  { username: "CoolGamer123", password: "encryptedPassword1" },
  { username: "EpicPlayer456", password: "encryptedPassword2" },

];


function encrypt(data) {
  return btoa(data);
}

function decrypt(data) {
  return atob(data); 
}
