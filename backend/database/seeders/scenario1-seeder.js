"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [
      {
        name: "Alice Smith",
        email: "alice@example.com",
        password:
          "1064f6934fc90d2b99afdf1829b5cd29:5f17453e08005a6a810acf3ba7589c2cf29848f391ab01472c84f9bb8a129ad396643303b6e637ac88e0b7a17e2ca120520ac435dab4b5a5ba664be6d13301ff",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Bob Johnson",
        email: "bob@example.com",
        password:
          "c8e78e328cf7119ab858aaf608ef14dd:2fa1326e29615922a40139bda11c53f31cfa331b964cc04edb2529931268a506f2eb0ca4bbf7ba6479f719afc12616ebd6682fd75c8be92eab03b0b4607f0ae2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Charlie Brown",
        email: "charlie@example.com",
        password:
          "b4cf03e79aee4fd538ed64f0325f1427:8a85a5012516162062e8587b75e1086fcda08585bf14f60dc440dc835cb1649e521d0663ddfd8c05472d0769e9f24f4e4cfc9bbbdb004073853e351e88340344",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("users", users, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
