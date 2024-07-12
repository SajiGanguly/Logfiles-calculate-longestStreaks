const fs = require("fs");

function readLogFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const lines = data.split("\n");
    const activities = lines.map((line) => {
      const [timestamp, user, action] = line.trim().split(", ");
      return { timestamp, user, action };
    });
    return activities;
  } catch (err) {
    console.error("Error reading log file:", err);
    return [];
  }
}

function parseDate(timestamp) {
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date format: ${timestamp}`);
  }
  return date;
}

function calculateStreaks(activities) {
  const userStreaks = {};

  activities.forEach(({ timestamp, user }) => {
    console.log("Time", timestamp);
    const date = parseDate(timestamp).toISOString().split("T")[0];

    if (!userStreaks[user]) {
      userStreaks[user] = {
        lastDate: null,
        currentStreak: 0,
        longestStreak: 0,
        activityCount: 0,
      };
    }

    userStreaks[user].activityCount += 1;

    if (userStreaks[user].lastDate) {
      const lastDate = new Date(userStreaks[user].lastDate);
      const currentDate = new Date(date);
      const dayDiff = (currentDate - lastDate) / (1000 * 60 * 60 * 24);

      if (dayDiff === 1) {
        userStreaks[user].currentStreak += 1;
      } else if (dayDiff > 1) {
        userStreaks[user].currentStreak = 1;
      }
    } else {
      userStreaks[user].currentStreak = 1;
    }

    userStreaks[user].lastDate = date;

    if (userStreaks[user].currentStreak > userStreaks[user].longestStreak) {
      userStreaks[user].longestStreak = userStreaks[user].currentStreak;
    }
  });

  return userStreaks;
}

function getTopUsersWithLongestSteerks(userStreaks, K) {
  const users = Object.keys(userStreaks).map((user) => ({
    user,
    longestStreak: userStreaks[user].longestStreak,
    activityCOunt: userStreaks[user].activityCOunt,
  }));
  users.sort((a, b) => {
    if (b.longestStreak !== a.longestStreak) {
      return b.longestStreak - a.longestStreak;
    } else {
      return b.activityCOunt - a.activityCOunt;
    }
  });
  return users.slice(0, K).map((user) => user.user);
}

const logFilePath = "./activity.log";
const activities = readLogFile(logFilePath);
console.log(activities);

if (activities.length) {
  const userStreaks = calculateStreaks(activities);
  const topKUsers = getTopUsersWithLongestSteerks(userStreaks, 2);
  console.log(topKUsers);
} else {
  console.log("Top Ko users with longest Streaks:", topKUsers);
}
