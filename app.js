const shell = require("shelljs");
const repoName = process.argv[4];
const version = process.argv[3];
const fs = require("fs");

const data = fs.readFileSync("versions.json", "utf-8");
const parsedData = JSON.parse(data);

for (let item in parsedData) {
  if (item === repoName) {
    parsedData[item]["version"] = +version;
    fs.writeFileSync("versions.json", JSON.stringify(parsedData));
  }
}

shell.exec(
  `./deploy.sh 4001 ${parsedData["node-react-blog-backend"]["version"]} ${parsedData["node-react-blog-frontend"]["version"]} ${parsedData["node-react-blog-nginx"]["version"]}`
);
