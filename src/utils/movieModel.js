import mongoose from "mongoose";

// Define the schema
const MovieSchema = new mongoose.Schema({
	movieId: {
		type: Number,
		required: true,
		unique: true,
	},
	title: {
		type: String,
	},
	posterPath: {
		type: String,
	},
	releaseDate: {
		type: String,
	},
	genres: {
		type: [String],
	},
});

// Create the model
const Movie = mongoose.models.Movie || mongoose.model("Movie", MovieSchema);

export default Movie;
