const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var searchSchema = new Schema({
  searchText: {
    type: String,
    required: true
  }
  // description: {
  //   type: String,
  //   required: true
  // },
  // image: {
  //   public_id: {
  //     type: String
  //   },
  //   url: {
  //     type: String,
  //     required: true
  //   }
  // },
  // userId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: 'User'
  // }
});

module.exports = mongoose.model('Search', searchSchema);
