var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/zhouziDemo', {
  useNewUrlParser: true
});

var novelSchma = new mongoose.Schema({
  cover: {
    type: String,
    require: true
  },
  title: {
    type: String,
    require: true
  },
  author: {
    type: String,
    require: true
  },
  smallDetail: {
    type: String,
    require: true
  },
  bigDetail: {
    type: String,
    require: true
  }

})
var novelModel = mongoose.model('novel', novelSchma);
module.exports = {
  novelModel
}