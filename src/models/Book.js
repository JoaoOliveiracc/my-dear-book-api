import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  id: { 
    type: mongoose.Schema.Types.ObjectId 
  },
  title: {
    type: String,
    required: [true, 'O título do livro é obrigatório']
  },
  publisher: {
    type: String,
    required: [true, 'O nome da editora é obrigatório'],
    enum: {
      values: ['Casa do código', 'Alura'],
      message: 'A editora {VALUE} não é permitida'
    }
  },
  price: {
    type: Number
  },
  pagesNumber: {
    type: Number,
    validate: {
      validator:(value) => {
        return value >= 10 && value <= 5000;
      },
      message: 'O número de páginas deve estar entre 10 e 5000' 
    }
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'authors',
    required: [true, 'O(a) autor(a) é obrigatório']
  }
}, { versionKey: false });

const book = mongoose.model("books", bookSchema);

export default book;