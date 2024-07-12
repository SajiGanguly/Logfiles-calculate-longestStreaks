const fs = require("fs");

// Helper function to generate a random date
function getRandomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

// Helper function to format date as ISO 8601 string
function formatDate(date) {
  return date.toISOString();
}

// Generate random user log entries
function generateLogEntries(numEntries) {
  const users = ["User1", "User2", "User3", "User4", "User5"];
  const actions = ["post", "like", "comment"];
  const startDate = new Date("2024-07-01T00:00:00Z");
  const endDate = new Date("2024-08-01T00:00:00Z");

  const entries = [];

  for (let i = 0; i < numEntries; i++) {
    const timestamp = formatDate(getRandomDate(startDate, endDate));
    const user = users[Math.floor(Math.random() * users.length)];
    const action = actions[Math.floor(Math.random() * actions.length)];
    entries.push(`${timestamp}, ${user}, ${action}`);
  }

  return entries;
}

// Generate 50 log entries and write to a file
const logEntries = generateLogEntries(50);
fs.writeFileSync("./activity.log", logEntries.join("\n"), "utf8");
console.log("Generated 50 log entries and wrote to activity.log");
