const prisma = require("../utils/prisma");

const getMovies = async (req, res) => {
  const runtimeLessThan = parseInt(req.query.runtimeLess);
  const runtimeGreaterThan = parseInt(req.query.runtimeGreater);

  console.log(req.query);
  const whereClauses = {
    runtimeMins: {},
  };

  let moviesList;

  if (runtimeLessThan) {
    whereClauses.runtimeMins.lt = runtimeLessThan;
  }
  if (runtimeGreaterThan) {
    whereClauses.runtimeMins.gt = runtimeGreaterThan;
  }
  console.log(whereClauses);
  moviesList = await prisma.movie.findMany({
    where: whereClauses,
    include: {
      screenings: true,
    },
  });
  res.json({ movies: moviesList });
};

const addMovie = async (req, res) => {
  const title = req.body.title;
  const runtime = req.body.runtime;

  const movieData = {
    data: {
      title: title,
      runtimeMins: runtime,
    },
  };

  if (req.body.screenings) {
    const screeningsToCreate = [];
    for (const requestScreening of req.body.screenings) {
      screeningsToCreate.push({
        startsAt: new Date(Date.parse(requestScreening.startsAt)),
        screenId: requestScreening.screenId,
      });
    }
    movieData.data.screenings = {
      create: screeningsToCreate,
    };
  }

  const createdMovie = await prisma.movie.create({
    data: {
      title: title,
      runtimeMins: runtime,
    },
  });

  res.json({ data: createdMovie });
};

 const getMovie =  async (req, res) => {
  
    console.log(req.params)
    const whereClauses = {}
    if (req.params.id) {
        whereClauses.id = Number(req.params.id)
    }
    console.log(whereClauses)
    const movie = await prisma.movie.findFirst({
        where: whereClauses,
      })
      if (!movie){
        res.status(404)
        res.json({ error: 'Movie not found' })
        return
      }
    res.json({test: movie})
 }

module.exports = {
  getMovies,
  addMovie,
  getMovie
};
