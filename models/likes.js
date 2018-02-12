

module.exports = (sequelize, DataTypes) => {
  let likes = sequelize.define('likes', {
    bookid: DataTypes.INTEGER,
    status: DataTypes.STRING,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      },
    },
  });
  return likes;
};
