'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert(
      'taskTypes',
      [
        {
          name: 'Epic',
          slug: 'epic',
        },
        {
          name: 'Story',
          slug: 'story',
        },
        {
          name: 'Task',
          slug: 'task',
        },
        {
          name: 'Bug',
          slug: 'bug',
        },
      ],
      {},
    );
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete(
      'taskTypes',
      {
        name: [
          'Epic',
          'Story',
          'Task',
          'Bug'
        ],
      },
      {},
    );
  }
};
