'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add diseasesId field
    await queryInterface.addColumn('Treatments', 'diseasesId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Diseases',
        key: 'id',
      },
    });

    // Add createdAt and updatedAt fields
    await queryInterface.addColumn('Treatments', 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });
    await queryInterface.addColumn('Treatments', 'updatedAt', {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Treatments', 'diseasesId');
    await queryInterface.removeColumn('Treatments', 'createdAt');
    await queryInterface.removeColumn('Treatments', 'updatedAt');
  },
};
