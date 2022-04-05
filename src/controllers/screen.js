const prisma = require("../utils/prisma");

const addScreen = async (req, res) => {
  console.log(prisma.screen)

    const screens = await prisma.screen.findMany({})
    const createdScreen = await prisma.screen.create({
        data: {
            number: screens.length+1
        },
      });
    res.json({screen: createdScreen})
}


module.exports = {
    addScreen
  };