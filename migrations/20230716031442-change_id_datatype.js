// eslint-disable-next-line no-undef
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Rooms", "id", {
      type: Sequelize.UUID,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Rooms", "id", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
};
