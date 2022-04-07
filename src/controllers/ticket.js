const prisma = require("../utils/prisma");

const addTicket = async (req, res) => {
  const createdTicket = await prisma.ticket.create({
    data: {
        screening: {
            connect: {id: req.body.screeningId},
        },
        customer: {
            connect: {id: req.body.customerId},
        }
    },
    include: {
      customer: true,
      screening: {
          include: {
              movie: true,
              screen: true
          }
      },
    },
  });
  res.json({ screen: createdTicket});
};

module.exports = {
    addTicket
  };
