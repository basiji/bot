var emoji = require('node-emoji');

module.exports = {
    SERVER_ERROR:'متاسفانه خطایی رخ داده است. لطفا لحظاتی بعد مجددا امتحان کنید.',
    BUY_VOUCHER: emoji.get('white_check_mark') + ' خرید ووچر پرفکت مانی',
    ORDER_HISTORY:'سوابق خرید',
    SUPPORT: emoji.get('question') + ' پشتیبانی',
    CUSTOM_VOUCHER:'مبلغ دلخواه (تا سقف 500 دلار)',
    EMAIL_UPDATE_SUCCESS:'آدرس ایمیل با موفقیت ثبت شد.',
    SELECT_VOUCHER:'لطفا مبلغ مورد نظر خود را انتخاب نمایید.',
    WELCOME_MESSAGE:'به سامانه خودکار فروش پرفکت مانی خوش آمدید. جهت ادامه کار لطفا یکی از گزینه ها را انتخاب نمایید.',
    INVOICE:"<b>Invoice</b> \n<pre>Amount: %usdprice% USD \n" +
    "Exchange rate: 56,000 \nIRR: %irrprice% </pre>\n ---- \n<b>Voucher info </b>\n<pre>Voucher Code:" +
    " <a>%vouchercode%</a></pre> \n<pre>Activation code: 1234-56789-xxxx</pre>" +
    "\n \n کد فعالسازی پس از انجام تراکنش بصورت اتوماتیک بروزرسانی و نمایان خواهد شد."
}