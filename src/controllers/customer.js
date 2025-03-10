const prisma = require("../utils/prisma");

const createCustomer = async (req, res) => {
  const { name, phone, email } = req.body;

  console.log("name:", name, "phone", phone, "email", email);

  /**
   * This `create` will create a Customer AND create a new Contact, then automatically relate them with each other
   * @tutorial https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#create-a-related-record
   */
  const createdCustomer = await prisma.customer.create({
    data: {
      name,
      contact: {
        create: {
          phone,
          email,
        },
      },
    },
    // We add an `include` outside of the `data` object to make sure the new contact is returned in the result
    // This is like doing RETURNING in SQL
    include: {
      contact: true,
    },
  });

  res.json({ data: createdCustomer });
};

const updateCustomer = async (req, res) => {
  const { name, phone, email} = req.body;
  const id = Number(req.params.id);
  const updatedCustomer = await prisma.customer.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      contact: {
        update: {
          phone: phone,
          email: email,
        },
      },
    },
    include: {
      contact: true,
    },
  });
  res.json({ updatedCustomer: updatedCustomer });
};

module.exports = {
  createCustomer,
  updateCustomer,
};
