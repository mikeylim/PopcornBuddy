// utils/userModel.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Define the schema
const UserSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	favorites: [
		{
			movieId: {
                type: Number,
                required: true,
            },
			title: String,
			posterPath: String,
			releaseDate: String,
		},
	],
    watchlist: [
		{
			movieId: {
                type: Number,
                required: true,
            },
			title: String,
			posterPath: String,
			releaseDate: String,
		},
	],
});

// Hash the password before saving the user model
UserSchema.pre("save", async function (next) {
	if (!this.isModified("password") || this.isNew) return next();

	try {
		this.password = await bcrypt.hash(this.password, 10);
		next();
	} catch (err) {
		next(err);
	}
});

// Create the model
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
