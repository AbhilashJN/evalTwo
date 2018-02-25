

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bookid: {
        type: Sequelize.INTEGER,
        unique:true
      },
      author: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      rating: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('books'),
};
