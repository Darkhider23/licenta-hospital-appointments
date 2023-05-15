'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('specializations', 'description', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
    });

  //   // Update existing rows with a default value
  //   await queryInterface.sequelize.query(
  //     `UPDATE specializations SET description = 'default description' WHERE description IS NULL`
  //   );
   },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('specializations', 'description');
  },
};
