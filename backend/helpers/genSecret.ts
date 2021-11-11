import crypto from 'crypto';

function GenSecret() {
	let secret = crypto.randomBytes(64).toString('hex');
	return secret;
}

export default GenSecret;
