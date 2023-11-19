const allRoles = {
  user: [],
  admin: ['freelancer', 'client'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
