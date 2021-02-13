function loadScripts(){
  alert(12321)
}

$(document).ready(function(e){
  $(".wishlist-btn").click(function(){

    let isWishlisted = ($(this).hasClass('wishlisted')) ? 0:1
    let btnObj = $(this)
    
    let customerId = $(this).attr('customer-id')
    let productId = $(this).attr('prod-id')


    $.ajax({
        type:'POST',
        url:'https://a1a2b3df7c9f.ngrok.io/api/v1/shopify/wishlist-product',
        data: JSON.stringify({customer_id:customerId,product_id:productId,is_wishlisted:isWishlisted}),
        contentType: 'application/json',
        success: function (data) 
        {         
          if(btnObj.hasClass('wishlisted')){
            btnObj.removeClass('wishlisted')
            btnObj.text('Wishlist')
          }
          else{
            btnObj.addClass('wishlisted')
            btnObj.text('Wishlisted')
          }
          
        }
      });

    });


    let customerId = $(".wishlist-btn").attr('customer-id')
    let productId = $(".wishlist-btn").attr('prod-id')
    $.ajax({
      type:'POST',
      url:'https://a1a2b3df7c9f.ngrok.io/api/v1/shopify/get-wishlist-product',
      data: JSON.stringify({customer_id:customerId,product_id:productId}),
      contentType: 'application/json',
      success: function (data) 
      {   
        if(data.wishlist == true){
            $(".wishlist-btn").addClass('wishlisted')
            $(".wishlist-btn").text('Wishlisted')
        }
        else{
          $(".wishlist-btn").removeClass('wishlisted')
          $(".wishlist-btn").text('Wishlist')
        }      
        console.log(data);
        
      }
    });

   
});