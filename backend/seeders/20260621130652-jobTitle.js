'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert(
      'jobTitles',
      [
        {
          name: 'Developer',
          slug: 'developer',
        },
        {
          name: 'QA Engineer',
          slug: 'qa_engineer',
        },
        {
          name: 'DevOps Engineer',
          slug: 'devops_engineer',
        },
        {
          name: 'Scrum Master',
          slug: 'scrum_master',
        },
        {
          name: 'Product Owner',
          slug: 'product_owner',
        },
        {
          name: 'Designer',
          slug: 'designer',
        },
        {
          name: 'Tech Lead',
          slug: 'tech_lead',
        },
        {
          name: 'Business Analyst',
          slug: 'business_analyst',
        },
      ],
      {},
    );
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete(
      'jobTitles',
      {
        name: [
          'Developer',
          'QA Engineer',
          'DevOps Engineer',
          'Scrum Master',
          'Product Owner',
          'Designer',
          'Tech Lead',
          'Business Analyst',
        ],
      },
      {},
    );
  }
};
