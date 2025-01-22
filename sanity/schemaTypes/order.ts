export default {
  name: "order",
  title: "Orders",
  type: "document",
  fields: [
    {
      name: "customer",
      title: "Customer",
      type: "reference",
      to: [{ type: "customer" }],
    },
    {
      name: "items",
      title: "Order Items",
      type: "array",
      of: [
        {
          type: "object",
          name: "orderItem",
          fields: [
            {
              name: "productId",
              type: "string",
              title: "Product ID",
            },
            {
              name: "name",
              type: "string",
              title: "Product Name",
            },
            {
              name: "quantity",
              type: "number",
              title: "Quantity",
            },
            {
              name: "price",
              type: "number",
              title: "Price",
            },
          ],
        },
      ],
    },
    {
      name: "totalAmount",
      title: "Total Amount",
      type: "number",
    },
    {
      name: "status",
      title: "Order Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Paid", value: "paid" },
          { title: "Processing", value: "processing" },
          { title: "Shipped", value: "shipped" },
          { title: "Delivered", value: "delivered" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
    },
    {
      name: "createdAt",
      title: "Created At",
      type: "datetime",
    },
    {
      name: "paymentIntentId",
      title: "Payment Intent ID",
      type: "string", 
    }
  ],
}

