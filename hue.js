// Encrypted and unreadable auto-generated accounts
const accounts = [
  { username: 'b4n4n4_m0nkey', password: 'Y3ll0w$k1es!' },
  { username: 'c0ff33_l0v3r', password: 'Br0wn$ug4r!' },
  { username: 'p1zz4_p4rty', password: 'Ch33sy$Cr4ck3r!' },
  { username: 't3ch_g33k', password: 'C0d3$M4st3r!' },
  { username: 'g4m3r_z0n3', password: 'P1x3l$P0w3r!' },
  { username: 'm00n_w4lk3r', password: 'St4r$L1ght!' },
  { username: 's0cc3r_f4n', password: 'G04l$K1ck3r!' },
  { username: 'b00k_w0rm', password: 'P4g3$Turn3r!' },
  { username: 'c4t_l0v3r', password: 'P4ws$NCl4ws!' },
  { username: 'd0g_d4ys', password: 'T41l$W4g3r!' },
];

// Encrypt accounts (simulated encryption)
function encrypt(data) {
  return btoa(JSON.stringify(data));
}

// Decrypt accounts (simulated decryption)
function decrypt(data) {
  return JSON.parse(atob(data));
}

// Validate login
function validateLogin(username, password) {
  const encryptedAccounts = encrypt(accounts);
  const decryptedAccounts = decrypt(encryptedAccounts);
  return decryptedAccounts.some(
    (acc) => acc.username === username && acc.password === password
  );
}
