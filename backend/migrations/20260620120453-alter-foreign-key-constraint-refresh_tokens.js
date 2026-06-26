'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.removeConstraint('refresh_tokens', 'refresh_tokens_userId_fkey');

    // 2. Add the constraint back with the cascade rule
    await queryInterface.addConstraint('refresh_tokens', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'refresh_tokens_userId_fkey', // Custom constraint name
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down (queryInterface, _Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint('refresh_tokens', 'refresh_tokens_userId_fkey');

    // 2. Add the constraint back with the cascade rule
    await queryInterface.addConstraint('refresh_tokens', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'refresh_tokens_userId_fkey', // Custom constraint name
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });
  }
};
