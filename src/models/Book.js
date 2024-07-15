import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  title: { type: String, required: [true, 'O título do livro é obrigatório'] },
  publisher: { type: String, required: [true, 'O nome da editora é obrigatório'] },
  price: { type: Number },
  pagesNumber: { type: Number },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'authors', required: [true, 'O(a) autor(a) é obrigatório']}
}, { versionKey: false });

const book = mongoose.model("books", bookSchema);

export default book;