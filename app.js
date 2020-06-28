const shell = require("shelljs");
const repoName = process.argv[2];
const version = process.argv[3];
const fs = require("fs");

const repos = {
  "node-react-blog-backend": {
    version: 26,
  },
  "node-react-blog-frontend": {
    version: 22,
  },
  "node-react-blog-nginx": {
    version: 3,
  },
};

for (let item in repos) {
  if (item === repoName) {
    repos[item]["version"] = +version;
    fs.writeFileSync("versions.json", JSON.stringify(repos));
  }
}

const data = fs.readFileSync("versions.json", "utf-8");
const parsedData = JSON.parse(data);
shell.exec(
  `./deploy.sh 4001 ${parsedData["node-react-blog-backend"]["version"]} ${parsedData["node-react-blog-frontend"]["version"]} ${parsedData["node-react-blog-nginx"]["version"]}`
);
