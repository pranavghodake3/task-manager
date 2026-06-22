'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('taskComments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      taskId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tasks', // Target table name
          key: 'id',       // Target column name
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      companyMemberId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'companyMembers', // Target table name
          key: 'id',       // Target column name
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      comment: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('taskComments');
  }
};
