import { octokitApp } from "./octokitApp";

export async function getUserRepos(username: string) {
  const repos = await octokitApp.octokit.request(
    "GET /users/{username}/repos",
    {
      username,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  let repoNames: string[] = [];
  repos.data.forEach((repo) => {
    repoNames.push(repo.full_name);
  });

  return repoNames;
}
