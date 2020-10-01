const functions = require('firebase-functions');
const fetch = require('node-fetch');

exports.createOrder = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'Endpoint requires authentication!',
    );
  }
  const {amount, currency, receipt} = data;
  //   var instance = new Razorpay({
  //     key_id: 'rzp_test_kZbHjGLGpAAz0g',
  //     key_secret: 'QacYkyHOaf1cTMrPQKCKaiGQ',
  //   });
  //   instance.orders.create(options, function (err, order) {
  //     return order;
  //   });

  fetch(`https://api.razorpay.com/v1/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Basic rzp_test_kZbHjGLGpAAz0g_QacYkyHOaf1cTMrPQKCKaiGQ',
      Accept: 'application/json',
    },
    body: {
      amount,
      currency,
      receipt,
    },
  })
    .then((res) => res.json())
    .then((order) => {
      return order;
    });
});
