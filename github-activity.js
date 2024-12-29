async function githubUserActivity(username) {
  const url = `https://api.github.com/users/${username}/events`;
  const userData = await fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error("Error:", error));

  if (!userData || userData.length == 0) {
    console.error("No events found for the user");
  }

  let key = userData[0].type;
  let repo = userData[0].repo.name;
  switch (key) {
    case "PushEvent":
      console.log(`pushed 1 commit to ${repo}`);
      break;

    case "IssueCommentEvent":
      console.log(`opened a new issue in ${repo}`);
      break;

    case "CreateEvent":
      console.log(`Initialized a new repo ${repo}`);
      break;

    case "WatchEvent":
      console.log(`Starred ${repo}`);
      break;

    case "ForkEvent":
      console.log(`Forked ${repo}`);
      break;

    default:
      console.log("Enter the username correctly!!");
      break;
  }
}

const args = process.argv.slice(1);
const username = args[1];

!username ? console.error("404, user not found") : githubUserActivity(username);
