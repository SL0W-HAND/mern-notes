type IUser = {
	username: string;
	email: string;
	password: string;
	numberOfNotes: number;
	notes: INote[];
	matchPassword: (password: string) => Promise<boolean>;
	_id: any;
};

type INote = {
	title: string;
	description: string;
	userId: string;
};
