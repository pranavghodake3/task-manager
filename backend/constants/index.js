const obj = {
  TOKEN_EXPIRY: '5m',
  REFRESH_TOKEN_EXPIRY: '1h',
  GLOBAL_ROLES: {
    SUPER_ADMIN: 'Super Admin',
    COMPANY_ADMIN: 'Company Admin',
    PROJECT_USER: 'Project User',
  },
  ROLES: {
    PROJECT_ADMIN: 'Project Admin',
    PROJECT_MANAGER: 'Project Manager',
    PROJECT_MEMBER: 'Project Member',
    VIEWER: 'Viewer',
  },
  ENTITIES: {
    USER: 'User',
    COMPANY: 'Company',
    PROJECT: 'Project',
    TASK: 'Task',
    ROLE: 'Role',
    STATUS: 'Status',
    PRIORITY: 'Priority',
    TASK_TYPE: 'Task Type',
    TASK_COMMENT: 'Task Comment',
  },
  ACTION_TYPES: {
    CREATE: 'Create',
    READ: 'Read',
    UPDATE: 'Update',
    DELETE: 'Delete',
  },
  STATUSES: {
    
  }
};

module.exports = obj;
