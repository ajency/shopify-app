'use strict';
module.exports = (sequelize, DataTypes) => {
  const stores = sequelize.define('stores', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    access_token: DataTypes.STRING,
    additional_data: DataTypes.JSON
  }, {});
  stores.associate = function(models) {
    // associations can be defined here
  };
  return stores;
};