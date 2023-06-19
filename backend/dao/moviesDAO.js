let movies

export default class MoviesDAO{
    static async injectDB(conn){
        if(movies){
            return
        }
        try{
            movies = await conn.db(process.env.MOVIEREVIEWS_NS).collection('movies')
        }catch(err){
            console.error(`Unable to establish collection handles in moviesDAO: ${err}`)
        }
    }

    static async getMovies({//default filter
        filters = null,
        page = 0,
        moviesPerPage = 20, //will only get 20 movies per page
    } = {}){
      let query
      if(filters){
          if('title' in filters){
              query = {$text:{$search: filters['title']}}
          }else if("rated" in filters){
            query = {"rated":{$eq: filters['rated']}}
          }
      }
      let cursor
      try{
          cursor = await movies
          .find(query)
          .limit(moviesPerPage)
          .skip(moviesPerPage * page)
          const moviesList = await cursor.toArray()
          const totalNumMovies = await movies.countDocuments(query)
          return {moviesList, totalNumMovies}
      }catch(e){
          console.error(`Unable to get movies: ${e}`)
          return {moviesList: [], totalNumMovies: 0}
      }
    }
}