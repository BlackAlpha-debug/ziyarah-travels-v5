// Hardcoded credentials (for demo only)
const ADMIN_CREDENTIALS = [
  { username: "ziyarahadmin", password: "Ziyarah@11" }
];

export const authenticateAdmin = (username: string, password: string): boolean => {
  return ADMIN_CREDENTIALS.some(
    (cred) => cred.username === username && cred.password === password
  );
};

export const isAdminLoggedIn = (): boolean => {
  return localStorage.getItem("ziyarah_admin_logged_in") === "true";
};

export const loginAdmin = () => {
  localStorage.setItem("ziyarah_admin_logged_in", "true");
};

export const logoutAdmin = () => {
  localStorage.removeItem("ziyarah_admin_logged_in");
};