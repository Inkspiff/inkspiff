import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GITHUB_SECRET,
});

export async function getUserRepos(username: string) {
  const repos = await octokit.request("GET /users/{username}/repos", {
    headers: { "X-GitHub-Api-Version": "2022-11-28" },
    sort: "updated",
    type: "all",
    username,
  });

  let repoNames: string[] = [];
  repos.data.forEach((repo) => {
    repoNames.push(repo.full_name);
  });

  return repoNames;
}
