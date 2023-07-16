// eslint-disable-next-line no-undef
module.exports = {
  up: async (queryInterface) => {
    // Add foreign key constraint for roomId
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

    // Add foreign key constraint for username
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
    // Remove foreign key constraint for roomId
    await queryInterface.removeConstraint("Bookings", "fk_booking_room");

    // Remove foreign key constraint for username
    await queryInterface.removeConstraint("Bookings", "fk_booking_user");
  },
};
