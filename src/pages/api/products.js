import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2022-11-15",
});

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const products = await stripe.products.list({
                active: true,
                limit: 100,
            });

            //console.log("PRODUCTOS: ", products);

            const productWithPrices = await Promise.all(
                products.data.map(async (product) => {
                    const price = await stripe.prices.retrieve(
                        product.default_price
                    );
                    return { ...product, price: price.unit_amount / 100 };
                })
            );
            //console.log("PRODUCTS WITH PRICE: ", productWithPrices);
            //OBJETO PRODUCTO CON PRECIOS
            res.status(200).json(productWithPrices);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader("Allow", "GET");
        res.status(405).end("Method not Allowed");
    }
}
