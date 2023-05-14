'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('doctor', 'role', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'doctor'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('doctor', 'role');
  }
};
