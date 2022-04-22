// const fs = require('fs');
// const path = require('path');
// const PDFDocument = require('pdfkit');
const Search = require('../models/search_model');
//
//var html = $('html')

import 'regenerator-runtime/runtime';
import axios from 'axios';
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
  const access_token = '3267694242802c23f79fea3dbc90a0877845de1e';
  const projects_count = 'http://www.archtscience.com:8070/api/projects/';
  const projects = "http://www.archtscience.com:8070/api/dm/tasks/";
  var counter, found_search;
  if (req.query.srchq === "") {
    res.render('search/create-new', {
      path: '/create'
    });
  } else {

    axios.get(projects_count, {
      headers: {
        'Authorization': `Token  ${access_token}`
      }
    })
      .then(response => {
        // access parsed JSON response data using response.data field
        console.log(response.data.count)
        counter = response.data.count
        var texts;
        for (let i = 1; i <= response.data.count; i++) {
          axios.get(projects + i, {
            headers: {
              'Authorization': `Token  ${access_token}`
            }
          })
            .then(response => {
              // access parsed JSON response data using response.data field
              console.log(response.data.data.text)
              texts += '<h1>' + response.data.data.text + '</h1><br/>';
              //res.write('<span>' + response.data.data.text + '</span><br/>');
              if(i == counter){
                console.log("!!!!!!!!!!!!!!!!!!!");
                res.render('search/create-new', function (err, html) {
                  res.send(texts);
                })
              }else{
                console.log("I is "+i+ " response.data.count "+response.data.count);
              }
              //req.body.charactersList = '<span>' + response.data.data.text + '</span><br/>'
            })
            .catch(error => {
              console.log(error)
            })
        }

      })
      .catch(error => {
        console.log(error)
      });


    // axios.get(projects, {
    //   headers: {
    //     'Authorization': `Token  ${access_token}`
    //   }
    // })
    //   .then(response => {
    //     // access parsed JSON response data using response.data field
    //     console.log(response.data.data.text)
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })

  }

};
exports.getPdfText = (req, res, next) => {
  res.render('search/pdf-to-txt', {
    path: '/pdftotxt'
  });

};
exports.getMainPage = (req, res, next) => {
  res.render('search/index', {
    path: '/index'
  });

};
exports.getTestingPage = (req, res, next) => {
  res.render('search/tests', {
    path: '/tests'
  });

};

exports.getSearchTestPage = (req, res, next) => {
  res.render('search/search-test', {
    path: '/search-test'
  });

};

