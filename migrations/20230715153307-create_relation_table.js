// eslint-disable-next-line no-undef
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addConstraint("Bookings", {
      fields: ["id"],
      type: "foreign key",
      name: "fk_booking_room",
      references: {
        table: "Rooms",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    await queryInterface.addConstraint("Bookings", {
      fields: ["username"],
      type: "foreign key",
      name: "fk_booking_user",
      references: {
        table: "Users",
        field: "username",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeConstraint("Bookings", "fk_booking_room");
    await queryInterface.removeConstraint("Bookings", "fk_booking_user");
  },
};
