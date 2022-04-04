const prisma = require("../utils/prisma");

const getMovies = async (req, res) => {

  const runtimeLessThan = req.query.runTimeLess
  const runtimeGreaterThan = req.query.runTimeGreater

  console.log(runtimeLessThan, runtimeGreaterThan)

  const moviesList = await prisma.movie.findMany({
    include: {
      screenings: true,
    },
    where: {
        runtimeMins: {
            lt: Number(runtimeLessThan),
            gt: Number(runtimeGreaterThan)
        }
    }
  });
  res.json({ movies: moviesList });
};

module.exports = {
  getMovies,
};
