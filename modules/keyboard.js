var constants = require('./constants');

module.exports = {
    welcome_menu :
        JSON.stringify({
            keyboard: [[constants.BUY_VOUCHER],[constants.SUPPORT,constants.ORDER_HISTORY,]],
            resize_keyboard:true,
            one_time_keyboard:true
        }),
    
    payment_button:
        JSON.stringify({
            inline_keyboard:[[{text:'ورود به درگاه پرداخت'}]]
        }),

    voucher_menu:
        JSON.stringify({
            keyboard: [
                [{text:'5 $'}, {text:'10 $'}, {text:'20 $'}],
                [{text:'50 $'},{text:'100 $'},{text:'200 $'}],
                [{text:'300 $'},{text:'500 $'}],
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        }),


    }
