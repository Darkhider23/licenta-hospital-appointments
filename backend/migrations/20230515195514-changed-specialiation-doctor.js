'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add specializationId foreign key column
    await queryInterface.addColumn('doctor', 'specializationId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'specializations',
        key: 'id',
      },
    });

    // Remove specialization field
    await queryInterface.removeColumn('doctor', 'specialization');
  },

  down: async (queryInterface, Sequelize) => {
    // Add specialization field
    await queryInterface.addColumn('doctor', 'specialization', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false,
    });

    // Remove specializationId foreign key column
    await queryInterface.removeColumn('doctor', 'specializationId');
  },
};
