import config from "./config/config";
import app from "./app";

app.listen(config.port, () => {
	console.log(`server runing on port ${config.port}`);
});
