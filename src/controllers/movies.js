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

// const createMovie = async (req, res) => {
//   const { title, runtimeMins } = req.body;

//   console.log("title", title, "runtimeMins", runtimeMins);

//   /**
//    * This `create` will create a Customer AND create a new Contact, then automatically relate them with each other
//    * @tutorial https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#create-a-related-record
//    */
//   const createdCustomer = await prisma.movie.create({
//     data: {
//       name,
//       contact: {
//         create: {
//           phone,
//           email,
//         },
//       },
//     },
//     // We add an `include` outside of the `data` object to make sure the new contact is returned in the result
//     // This is like doing RETURNING in SQL
//     include: {
//       contact: true,
//     },
//   });

//   res.json({ data: createdCustomer });
// };

module.exports = {
  getMovies,
  addMovie,
};
