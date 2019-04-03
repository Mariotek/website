import soap from 'soap-everywhere';
import appConfig from './appConfig';

export default {
    /**
     * Request new pay
     * @param zpamount
     * @param zpemail
     * @param zpphone
     * @param zpdesc
     * @param zppid
     * @param zpcallback
     */
    request(zpamount, zpemail, zpphone, zpdesc, zppid, zpcallback) {
        console.log('requested');
        const url = appConfig.zarinpalSoapServer;
        const args = {
            'MerchantID' : appConfig.zarinpalMerchant,
            'Amount'     : zpamount,
            'Description': zpdesc,
            'Email'      : zpemail,
            'Mobile'     : zpphone,
            'CallbackURL': `${appConfig.appAddress}/verify/?Amount=${zpamount}&pid=${zppid}`
        };
        soap.createClient(url, (err, client) => {
            client.PaymentRequest(args, (err, result) => {
                const parseData = JSON.parse(JSON.stringify(result));
                let status;
                if (Number(parseData.Status) === 100) {
                    status = true;
                    const url = `https://sandbox.zarinpal.com/pg/StartPay/${parseData.Authority}`;
                    zpcallback({ status, url });
                } else {
                    status = false;
                    const code = parseData.Status;
                    zpcallback({ status, 'code': `خطایی پیش آمد! ${code}` });
                }
            });
        });
    },

    /**
     * Verify pay
     * @param zpstatus
     * @param zpamount
     * @param zpau
     * @param zpcallback
     */
    verify(zpstatus, zpamount, zpau, zpcallback) {
        const url = appConfig.zarinpalSoapServer;
        const args = {
            'MerchantID': appConfig.zarinpalMerchant,
            'Authority' : zpau,
            'Amount'    : zpamount
        };
        soap.createClient(url, (err, client) => {
            client.PaymentVerification(args, (err, result) => {
                const parseData = JSON.parse(JSON.stringify(result));
                let status;
                if (zpstatus === 'OK') {
                    if (Number(parseData.Status) === 100) {
                        status = true;
                        zpcallback({ status, 'code': parseData.RefID });
                    } else {
                        status = false;
                        zpcallback({ status, 'code': parseData.Status });
                    }
                } else {
                    status = false;
                    const code = 'عملیات توسط کاربر لغو شده است.';
                    zpcallback({ status, 'code': `خطایی پیش آمد! ${code}` });
                }
            });
        });
    }
};
