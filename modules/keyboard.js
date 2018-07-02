module.exports = {
    welcome_menu :
        JSON.stringify({
            keyboard: [[{
                text:'خرید ووچر پرفکت مانی',
                request_contact:true,
                request_location:true}]],
            resize_keyboard:true,
            one_time_keyboard:true
        }),
    payment_button:
        JSON.stringify({
            inline_keyboard:[[{text:'ورود به درگاه پرداخت'}]]
        })

    }
