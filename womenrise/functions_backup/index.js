const functions = require('firebase-functions');
const admin = require('firebase-admin');
const Razorpay = require('razorpay');
const cors = require('cors')({ origin: true });

admin.initializeApp();

const razorpay = new Razorpay({
  key_id: 'rzp_test_51Iw5gGQXnPZ3nX',
  key_secret: 'rRmLm9ENlqNRVG5K8Xg3NzYp'
});

exports.createRazorpayOrder = functions.https.onCall(async (data, context) => {
  cors(data, context);
  // Verify user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }

  try {
    const { amount, currency = 'INR' } = data;

    if (!amount || amount <= 0) {
      throw new functions.https.HttpsError('invalid-argument', 'Invalid amount specified');
    }

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Convert to paise
      currency,
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1
    });

    return {
      orderId: order.id,
      amount: order.amount,
      currency: order.currency
    };
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});

exports.verifyRazorpayPayment = functions.https.onCall(async (data, context) => {
  cors(data, context);
  // Verify user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }

  try {
    const { paymentId, orderId, signature } = data;

    if (!paymentId || !orderId || !signature) {
      throw new functions.https.HttpsError('invalid-argument', 'Missing payment verification parameters');
    }

    // Verify payment signature
    const body = orderId + "|" + paymentId;
    const crypto = require('crypto');
    const expectedSignature = crypto
      .createHmac('sha256', razorpay.key_secret)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== signature) {
      throw new functions.https.HttpsError('invalid-argument', 'Invalid payment signature');
    }

    // Save order details to Firestore
    const orderRef = admin.firestore().collection('orders').doc();
    await orderRef.set({
      userId: context.auth.uid,
      orderId,
      paymentId,
      status: 'completed',
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });

    return { success: true };
  } catch (error) {
    console.error('Error verifying Razorpay payment:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});
