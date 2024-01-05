const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { price_id, night, roomId, booking_id } = req.body;
        try {
            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                        price: price_id,
                        quantity: night,
                    },
                ],
                // payment_method_types: ["card"],
                mode: "payment",
                success_url: `${req.headers.origin}/thank-you?booking_id=${booking_id}&session_id={CHECKOUT_SESSION_ID}`,
                // success_url: `${req.headers.origin}/thank-you?success=true&session_id={CHECKOUT_SESION_ID}`,

                cancel_url: `${req.headers.origin}/checkout/${roomId}`,
            });
            res.json(session);
        } catch (err) {
            res.status(err.statusCode || 500).json(err.message);
        }
    } else if (req.method === "GET") {
        try {
            //console.log("query: ", req.query);
            const session = await stripe.checkout.sessions.retrieve(
                req.query.session_id
            );
            res.json(session);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(500).end("Method Not Allowed");
    }
}
