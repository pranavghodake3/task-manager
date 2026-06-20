'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('tasks', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('tasks', 'projectId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'projects', // Target table name
        key: 'id',       // Target column name
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    await queryInterface.addColumn('tasks', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'users', // Target table name
        key: 'id',       // Target column name
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    await queryInterface.addColumn('tasks', 'creatorId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users', // Target table name
        key: 'id',       // Target column name
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    await queryInterface.addColumn('tasks', 'statusId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'statuses', // Target table name
        key: 'id',       // Target column name
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    await queryInterface.addColumn('tasks', 'priorityId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'priorities', // Target table name
        key: 'id',       // Target column name
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    await queryInterface.addColumn('tasks', 'companyId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'companies', // Target table name
        key: 'id',       // Target column name
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async down (queryInterface, _Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('tasks');
     */
    await queryInterface.removeColumn('tasks', 'companyId');
    await queryInterface.removeColumn('tasks', 'priorityId');
    await queryInterface.removeColumn('tasks', 'statusId');
    await queryInterface.removeColumn('tasks', 'creatorId');
    await queryInterface.removeColumn('tasks', 'userId');
    await queryInterface.removeColumn('tasks', 'projectId');
  }
};
