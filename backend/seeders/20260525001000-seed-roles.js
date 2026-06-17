'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'roles',
      [
        {
          name: 'Super Admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Company Admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Project Manager',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Scrum Master',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Developer',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'QA',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'DevOps',
          createdAt: new Date(),
          updatedAt: new Date(),
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
