'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'roles',
      [
        {
          name: 'Super Admin',
          slug: 'super_admin',
        },
        {
          name: 'Company Admin',
          slug: 'company_admin',
        },
        {
          name: 'Project Admin',
          slug: 'project_admin',
        },
        {
          name: 'Project Manager',
          slug: 'project_manager',
        },
        {
          name: 'Project Member',
          slug: 'project_member',
        },
        {
          name: 'Viewer',
          slug: 'viewer',
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(
      'roles',
      {
        name: ['Super Admin', 'Company Admin', 'Manager', 'User'],
      },
      {},
    );
  },
};
