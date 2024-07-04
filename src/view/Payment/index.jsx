import React from 'react'


const Payment = () => {
    async function onApplePayButtonClicked() {
        console.log('test');
        // Consider falling back to Apple Pay JS if Payment Request is not available.
        if (!PaymentRequest) {
            console.log('failed');
            return;
        }
        
        try {
            // Define PaymentMethodData
            const paymentMethodData = [{
                "supportedMethods": "https://apple.com/apple-pay",
                "data": {
                    "version": 3,
                    "merchantIdentifier": "merchant.com.apdemo",
                    "merchantCapabilities": [
                        "supports3DS"
                    ],
                    "supportedNetworks": [
                        "amex",
                        "discover",
                        "masterCard",
                        "visa"
                    ],
                    "countryCode": "US"
                }
            }];
            // Define PaymentDetails
            const paymentDetails = {
                "total": {
                    "label": "Demo (Card is not charged)",
                    "amount": {
                        "value": "1.50",
                        "currency": "USD"
                    }
                }
            };
            // Define PaymentOptions
            const paymentOptions = {
                "requestPayerName": false,
                "requestBillingAddress": false,
                "requestPayerEmail": false,
                "requestPayerPhone": false,
                "requestShipping": false,
            };
            
            // Create PaymentRequest
            console.log(PaymentRequest)
            const request = new PaymentRequest(paymentMethodData, paymentDetails, paymentOptions);
            request.onmerchantvalidation = event => {
                // Call your own server to request a new merchant session.
                console.log(event)
                const merchantSessionPromise = validateMerchant();
                event.complete(merchantSessionPromise);
            };
            
            request.onpaymentmethodchange = event => {
                if (event.methodDetails.type !== undefined) {
                    // Define PaymentDetailsUpdate based on the selected payment method.
                    // No updates or errors needed, pass an object with the same total.
                    const paymentDetailsUpdate = {
                        'total': paymentDetails.total
                    };
                    event.updateWith(paymentDetailsUpdate);
                } else if (event.methodDetails.couponCode !== undefined) {
                    // Define PaymentDetailsUpdate based on the coupon code.
                    const total = calculateTotal(event.methodDetails.couponCode);
                    const displayItems = calculateDisplayItem(event.methodDetails.couponCode);
                    const shippingOptions = calculateShippingOptions(event.methodDetails.couponCode);
                    const error = calculateError(event.methodDetails.couponCode);
            
                    event.updateWith({
                        total: total,
                        displayItems: displayItems,
                        shippingOptions: shippingOptions,
                        modifiers: [
                            {
                                data: {
                                    additionalShippingMethods: shippingOptions,
                                },
                            },
                        ],
                        error: error,
                    });
                }
            };
        
            request.onshippingoptionchange = event => {
                // Define PaymentDetailsUpdate based on the selected shipping option.
                // No updates or errors needed, pass an object with the same total.
                const paymentDetailsUpdate = {
                    'total': paymentDetails.total
                };
                event.updateWith(paymentDetailsUpdate);
            };
        
            request.onshippingaddresschange = event => {
                // Define PaymentDetailsUpdate based on a shipping address change.
                const paymentDetailsUpdate = {};
                event.updateWith(paymentDetailsUpdate);
            };
        
            const response = await request.show();
            const status = "success";
            await response.complete(status);
        } catch (e) {
            // Handle errors
        }
    }
    
    return (
        <div className="mt-20 h-screen">
            <div onClick={ onApplePayButtonClicked } className="apple-pay-button-with-text apple-pay-button-black-with-text">
                <span className="text">Buy with</span>
                <span className="logo"></span>
            </div>
        </div>
    )
}

export default Payment;