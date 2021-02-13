
$(document).ready(function(e){

    $(".configure-cancel-order").click(function(){
        $.ajax({
            type:'POST',
            url:'https://a1a2b3df7c9f.ngrok.io/api/v1/shopify/configure-cancel-order',
            success: function (data) 
            {         
              console.log(data);
              
            }
        });
    });


    $(".configure-wishlist-btn").click(function(){
        $.ajax({
            type:'POST',
            url:'https://a1a2b3df7c9f.ngrok.io/api/v1/shopify/configure-wishlist',
            success: function (data) 
            {         
              console.log(data);
              
            }
        });
    });
   
});