module.exports = {
    apps: [
        {
            name: "bot-roleta",
            script: "src/index.ts",
            interpreter: "node_modules/.bin/ts-node",
            watch: true
        }
    ]
};


//pm2 start ecosystem.config.js
