
$(document).ready(function(e){

    $(".cancel-order").click(function(){

    
    let orderId = $(this).attr('order-id')

    $.ajax({
        type:'POST',
        url:'https://a1a2b3df7c9f.ngrok.io/api/v1/shopify/cancel-order',
        data: JSON.stringify({order_id:orderId}),
        contentType: 'application/json',
        success: function (data) 
        {   
            if(!data){
                $(".order-action-msg").text("Order cannot be cancelled")
            }
            else{
                $(".order-action-msg").text("Order Sucessfully cancelled.").css("text-colour","green")
                setTimeout(function() {
                    location.reload();
                }, 5000);
            }      
           
          
        }
      });
    
 
    });
   
});