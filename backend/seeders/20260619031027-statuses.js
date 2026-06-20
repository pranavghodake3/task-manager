'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert(
      'statuses',
      [
        {
          name: 'Backlog',
          color: '#607D8B',
          displayOrder: 1,
          isClosed: false,
        },
        {
          name: 'To Do',
          color: '#9E9E9E',
          displayOrder: 2,
          isClosed: false,
        },
        {
          name: 'In Progress',
          color: '#2196F3',
          displayOrder: 3,
          isClosed: false,
        },
        {
          name: 'Code Review',
          color: '#3F51B5',
          displayOrder: 4,
          isClosed: false,
        },
        {
          name: 'Testing',
          color: '#9C27B0',
          displayOrder: 5,
          isClosed: false,
        },
        {
          name: 'Blocked',
          color: '#F44336',
          displayOrder: 6,
          isClosed: false,
        },
        {
          name: 'Done',
          color: '#4CAF50',
          displayOrder: 7,
          isClosed: true,
        },
        {
          name: 'Cancelled',
          color: '#795548',
          displayOrder: 8,
          isClosed: true,
        },
        
      ],
      {},
    );
  },

  async down (queryInterface, _Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(
      'statuses',
      {
        name: [
          'Backlog',
          'To Do',
          'In Progress',
          'Code Review',
          'Testing',
          'Blocked',
          'Done',
          'Cancelled',
        ],
      },
      {},
    );
  }
};
