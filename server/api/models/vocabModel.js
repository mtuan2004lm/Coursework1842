const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VocabSchema = new Schema(
  {
    english: {
      type: String,
      required: 'English word cannot be blank'
    },
    german: {
      type: String,
      required: 'German word cannot be blank'
    },
     vietnamese: {
      type: String,
      required: 'Vietnamese word cannot be blank'
    },
     france: {
      type: String,
      required: 'France word cannot be blank'
    },
     spain: {
      type: String,
      required: 'Spain word cannot be blank'
    }
  },
  { collection: 'vocabs' }
);

module.exports = mongoose.model('Vocab', VocabSchema);
