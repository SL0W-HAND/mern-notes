import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	numberOfNotes: {
		type: Number,
		default: 0,
	},
	notes: [],
});

UserSchema.methods.matchPassword = async function (password) {
	if (await bcrypt.compare(password, this.password)) {
		return true;
	}
	return false;
};

export interface typeUser extends Document {
	username: string;
	email: string;
	password: string;
	numberOfNotes: number;
	notes: string[];
	_id: string;
	matchPassword: (password: string) => Promise<boolean>;
}

export default model('User', UserSchema);
