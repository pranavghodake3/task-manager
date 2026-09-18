import { ROLES, GLOBAL_ROLES } from "../constants";
import Cookies from "js-cookie";

export function formatDate(date, format = 'DD-MM-YYYY') {
  const d = new Date(date);

  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();

  const shortMonth = d.toLocaleString('en', {
    month: 'short'
  });

  return format
    .replace('DD', day)
    .replace('MMM', shortMonth)
    .replace('MM', month)
    .replace('YYYY', year)
    .replace('YY', String(year).slice(-2))
    .replace('HH', String(d.getHours()).padStart(2, '0'))
    .replace('MM', String(d.getMinutes()).padStart(2, '0'))
    .replace('SS', String(d.getSeconds()).padStart(2, '0'));
};

export default function getUserRoles() {
  const roles = {... ROLES, ...GLOBAL_ROLES};
  delete roles.COMPANY_ADMIN;
  delete roles.SUPER_ADMIN;
  return Object.values(roles);
}

export function getGlobalProjectId() {
  return Cookies.get('globalProjectId');
};

export function setGlobalProjectId(globalProjectId) {
  return Cookies.set('globalProjectId', globalProjectId);
};

export const isSuperOrCompanyAdmin = (user) => {
  return [GLOBAL_ROLES.SUPER_ADMIN, GLOBAL_ROLES.COMPANY_ADMIN].includes(user.globalRole.name);
}
