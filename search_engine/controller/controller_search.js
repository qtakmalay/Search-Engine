// const fs = require('fs');
// const path = require('path');
// const PDFDocument = require('pdfkit');
const Search = require('../models/search_model');



exports.getIndex = (req, res, next) => {
  Search.find()
        .then(search => {
          
        console.log(search);
      })
      .catch(err => console.log(err));
  };