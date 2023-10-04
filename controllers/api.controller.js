const api_key = 'api_key=665e5bf9c0f6dbf1af864998cc5d2414';
const base_url = 'https://api.themoviedb.org/3';
const movies_url = base_url + '/movie/popular?'+ api_key + "&page=";
const search_movies= base_url + '/search/movie?'+ api_key;
const series_url = base_url + '/tv/popular?'+ api_key + "&page=";
const search_series = base_url + '/search/tv?' + api_key;
const home_url = base_url + "/trending/all/day?" + api_key;
const axios = require('axios');
var page = 1;

exports.movies = async (req,res) =>{

   const movies = await axios
     .get(movies_url+page)
     .then((res) => {
      return res.data.results;
     })
     .catch((error)=> console.log(error));
   res.render("pages/movies", { movies: movies });
     } ;

exports.searchmovies = async (req,res) => {
   let search = req.body.searchmo
   
   const smovies = await axios
      .get(search_movies + '&query=' + search)
      .then((res) => {
         return res.data.results;
      })
      .catch((error)=> console.log(error));
   res.render("pages/search_movies", { smovies: smovies });
};

exports.series = async (req,res) =>{
   const series = await axios
     .get(series_url+page)
     .then((res) => {
      
      return res.data.results;
     })
     .catch((error) => console.log(error));
 
   res.render("pages/series", { series: series });
};

exports.searchseries = async (req,res)=>{
   let search = req.body.searchse
   
   const sseries = await axios
      .get(search_series + '&query=' + search)
      .then((res) => {
         return res.data.results;
      })
      .catch((error)=> console.log(error));
   res.render("pages/search_series", { sseries: sseries });
};

exports.trend = async (req,res) =>{
   const trend = await axios
     .get(home_url)
     .then((res) => {
      
      return res.data.results;
     })
     .catch((error) => console.log(error));
 
   res.render("pages/home", { trend: trend });
};