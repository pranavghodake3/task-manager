const obj = {
  TOKEN_EXPIRY: 60 * 5, // 5 minutes
  REFRESH_TOKEN_EXPIRY: 60 * 60, // 1 hour
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
  JOB_TITLE: {
    DEVELOPER: 'Developer',
    QA_ENGINEER: 'QA Engineer',
    DEVOPS_ENGINEER: 'DevOps Engineer',
    SCRUM_MASTER: 'Scrum Master',
    PRODUCT_OWNER: 'Product Owner',
    DESIGNER: 'Designer',
    TECH_LEAD: 'Tech Lead',
    BUSINESS_ANALYST:'Business Analyst',
  },
  ENTITIES: {
    USER: 'USER',
    COMPANY: 'COMPANY',
    PROJECT: 'PROJECT',
    TASK: 'TASK',
    ROLE: 'ROLE',
    STATUS: 'STATUS',
    PRIORITY: 'PRIORITY',
    TASK_TYPE: 'TASK_TYPE',
    TASK_COMMENT: 'TASK_COMMENT',
  },
  ACTION_TYPES: {
    CREATE: 'CREATE',
    READ: 'READ',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
  },
  STATUSES: {
    
  },
  X_DEVICE: 'BROWSER'
};

module.exports = obj;
