module.exports = {
    welcome_menu :
        JSON.stringify({
            keyboard: [[{
                text:'خرید ووچر پرفکت مانی',
                request_contact:false,
                request_location:false}]],
            resize_keyboard:true,
            one_time_keyboard:true
        }),
    
    payment_button:
        JSON.stringify({
            inline_keyboard:[[{text:'ورود به درگاه پرداخت'}]]
        }),

    voucher_menu:
        JSON.stringify({
            inline_keyboard: [
                [{text:'5 $'}, {text:'10 $'}, {text:'20 $'}],
                [{text:'50 $'},{text:'100 $'}],
                [{text:'مبلغ دلخواه (تا سقف 500 دلار)'}]
            ]
        }),


    }
