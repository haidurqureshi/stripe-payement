const stripe = require('stripe')(STRIPE_SECRET_KEY);
const express = require('express');
const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const YOUR_DOMAIN = 'https://www.known.org.uk';

app.post('/create-checkout-session', async (req, res) => {
  let quantity = req.body.quantity;
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, price_1234) of the product you want to sell
        price: 'price_1TNbaTDyUy1iirlvK79Gxa5Q',
        quantity: quantity,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
  });

  res.redirect(303, session.url);
});

app.listen(4242, () => console.log('Running on port 4242'));
