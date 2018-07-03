var emoji = require('node-emoji');

module.exports = {
    SERVER_ERROR:'متاسفانه خطایی رخ داده است. لطفا لحظاتی بعد مجددا امتحان کنید.',
    BUY_VOUCHER: emoji.get('white_check_mark') + ' خرید ووچر پرفکت مانی',
    ORDER_HISTORY:'سوابق خرید',
    SUPPORT: 'پشتیبانی',
    CUSTOM_VOUCHER:'مبلغ دلخواه (تا سقف 500 دلار)',
    EMAIL_UPDATE_SUCCESS:'آدرس ایمیل با موفقیت ثبت شد.',
    SELECT_VOUCHER:'لطفا مبلغ مورد نظر خود را انتخاب نمایید.',
    MAIN_MENU:'منوی اصلی',
    CALL_TO_ACTION:'لطفا یک گزینه را انتخاب نمایید.',
    WELCOME_MESSAGE:'به سامانه خودکار فروش پرفکت مانی خوش آمدید. جهت ادامه کار لطفا یکی از گزینه ها را انتخاب نمایید.',
    INVOICE:"<b>Invoice</b> <a href='tg://#123'> #123 </a> \n<pre>Amount: %usdprice% USD \n" +
    "Exchange rate: 56,000 \nIRR: %irrprice% </pre>\n ---- \n<b>Information</b>\n<pre>Voucher code:" +
    " %vouchercode% \nActivation code: xxxxxxxxxx </pre> " +
    "\n \n کد فعالسازی پس از انجام تراکنش بصورت اتوماتیک ارسال خواهد شد.",
    NO_ORDER_MESSAGE:'شما تا بحال سفارشی نداشته اید.',
    ORDER_TEMPLATE:"<b>Invoice #%id% </b>\n <pre>Date: %date% \nAmount: %price% IRR\nStatus: %status%</pre>\n----\n"
}