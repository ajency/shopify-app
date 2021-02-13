'use strict';
module.exports = (sequelize, DataTypes) => {
  const wishlist_product = sequelize.define('wishlist_product', {
    shopify_customer_id: DataTypes.STRING,
    shopify_product_id: DataTypes.STRING,
    is_wishlisted: DataTypes.BOOLEAN,
    additional_data: DataTypes.JSON
  }, {});
  wishlist_product.associate = function(models) {
    // associations can be defined here
  };
  return wishlist_product;
};