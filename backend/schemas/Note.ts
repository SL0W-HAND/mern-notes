import { Schema, model, Document } from 'mongoose';
import { Interface } from 'readline';

const NoteSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	userId: {
		type: String,
		required: true,
	},
});

export interface typeNote extends Document {
	title: string;
	description: string;
	userId: string;
}

export default model('Note', NoteSchema);
