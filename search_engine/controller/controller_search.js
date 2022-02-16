// const fs = require('fs');
// const path = require('path');
// const PDFDocument = require('pdfkit');
const Search = require('../models/search_model');



exports.getSearches = (req, res, next) => {
  Search.find()
        .then(search => {
          res.render('search/index', {
            search: search,
            pageTitle: search,
            path: '/'
          });  
        console.log(search);
      })
      .catch(err => console.log(err));
  };

  exports.getSearchPage = (req, res, next) => {
    // Search.find()
    //       .then(search => {
            res.render('search/create-new', {
              path: '/create'
            });  
        //   console.log(search);
        // })
        // .catch(err => console.log(err));
    };

  // exports.addToSearches = (req, res, next) => {
  //   const Search = new Search({
  //     searchText: req.search.searchText
  //   });
  //   return order.save();
  // };
  