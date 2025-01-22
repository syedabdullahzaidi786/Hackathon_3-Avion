export default {
  name: 'customer',
  type: 'document',
  title: 'Customer Information',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Customer Name',
      description: 'Full name of the customer',
      validation: (Rule: any) => Rule.required().min(3).error('Name must be at least 3 characters long'),
    },
    {
      name: 'email',
      type: 'string',
      title: 'Email Address',
      description: "Customer's email address",
      validation: (Rule: any) => Rule.required().email().error('Please provide a valid email address'),
    },
    {
      name: 'contactNumber',
      type: 'string',
      title: 'Contact Number',
      description: 'Phone number of the customer',
      validation: (Rule: any) =>
        Rule.required()
          .regex(/^\d{10,15}$/, { name: 'phone number' })
          .error('Contact number must be 10 to 15 digits long'),
    },
    {
      name: 'address',
      type: 'text',
      title: 'Address',
      description: 'Residential address of the customer',
      validation: (Rule: any) => Rule.required().min(10).error('Address must be at least 10 characters long'),
    },
  ],
};
