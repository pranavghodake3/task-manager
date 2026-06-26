'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert(
      'globalRoles',
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
          name: 'Project User',
          slug: 'project_user',
        },
      ],
      {},
    );
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete(
      'globalRoles',
      {
        name: [
          'Super Admin',
          'Company Admin',
          'Project User',
        ],
      },
      {},
    );
  }
};
