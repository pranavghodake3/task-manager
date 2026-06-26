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
      'priorities',
      [
        {
          name: 'Lowest',
          rank: 1,
          color: '#D3D3D3',
        },
        {
          name: 'Low',
          rank: 2,
          color: '#4CAF50',
        },
        {
          name: 'Medium',
          rank: 3,
          color: '#2196F3',
        },
        {
          name: 'High',
          rank: 4,
          color: '#FF9800',
        },
        {
          name: 'Highest',
          rank: 5,
          color: '#F44336',
        },
        {
          name: 'Blocker',
          rank: 6,
          color: '#8B0000',
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
      'priorities',
      {
        name: [
          'Lowest',
          'Low',
          'Medium',
          'High',
          'Highest',
          'Blocker',
        ],
      },
      {},
    );
  }
};
