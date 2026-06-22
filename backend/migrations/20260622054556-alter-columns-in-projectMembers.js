'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('projectMembers', 'userId');
    await queryInterface.addColumn('projectMembers', 'companyMemberId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'companyMembers', // Target table name
        key: 'id',       // Target column name
      },
      after: 'id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('projectMembers', 'companyMemberId');
    await queryInterface.addColumn('projectMembers', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users', // Target table name
        key: 'id',       // Target column name
      },
      after: 'id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  }
};
