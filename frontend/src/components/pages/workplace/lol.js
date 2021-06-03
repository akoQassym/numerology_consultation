import React from "react"


export default function Lol() {

    return (
        <form action="https://perfectmoney.is/api/step1.asp" method="POST">
            <p>
                <input type="hidden" name="PAYEE_ACCOUNT" value="U30773915" />
                <input type="hidden" name="PAYEE_NAME" value="Luckyhits" />
                <input type="hidden" name="PAYMENT_AMOUNT" value="0.5" />
                <input type="hidden" name="PAYMENT_UNITS" value="USD" />
                <input type="hidden" name="STATUS_URL" 
                    value="http://localhost:8000/perfectMoney" />
                <input type="hidden" name="PAYMENT_URL" 
                    value="https://www.google.kz/" />
                <input type="hidden" name="NOPAYMENT_URL" 
                    value="https://yandex.kz/" />
                <input type="text" name="PAYMENT_ID" 
                    placeholder="Login"/>

                <input type="submit" name="PAYMENT_METHOD" value="Оплатить" />
            </p>
        </form>
    )
}
