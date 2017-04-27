var mongoose = require('mongoose');
mongoose.connect('mongodb://alwaywrong:jackjack@ds155160.mlab.com:55160/node-test');
// mongoose.connect('mongodb://localhost:27017/person');
var Schema = mongoose.Schema;

// Define Schema
var personSchema = new Schema({
  ArtistName : String,
  ArtistEmail: String,
  ArtistPhone: Number,
  PieceDescription: String
});

module.exports = mongoose.model('Person', personSchema);
