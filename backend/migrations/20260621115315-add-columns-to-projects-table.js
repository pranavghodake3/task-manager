'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('projects', 'description', {
      type: Sequelize.STRING,
      allowNull: true,
      after: 'name'
    });
    await queryInterface.addColumn('projects', 'key', {
      type: Sequelize.STRING,
      allowNull: true,
      after: 'description'
    });
    await queryInterface.addColumn('projects', 'createdBy', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users', // Target table name
        key: 'id',       // Target column name
      },
      after: 'description',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.removeColumn('projects', 'createdBy');
    await queryInterface.removeColumn('projects', 'key');
    await queryInterface.removeColumn('projects', 'description');
  }
};
