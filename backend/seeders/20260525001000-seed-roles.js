'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'roles',
      [
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
        name: ['Project Admin', 'Project Manager', 'Project Member', 'Viewer'],
      },
      {},
    );
  },
};
