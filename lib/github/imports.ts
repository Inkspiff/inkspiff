import { octokitApp } from "./octokitApp";
import { GithubData } from "./types";

export async function getUserRepos(username: string, installationId: number) {
  const octokit = await octokitApp.getInstallationOctokit(installationId)
  const repos = await octokit.request(
    "GET /users/{username}/repos",
    {
      headers: { "X-GitHub-Api-Version": "2022-11-28" },
      sort: "updated",
      type: "all",
      username,
    }
  );

  let githubData: GithubData[] = [];
  repos.data.forEach((repo) => {
    githubData.push({
      gitRef: String(repo.default_branch),
      repoFullName: repo.full_name,
      repoOwner: repo.owner.login,
      repoName: repo.name,
      installationId
    });
  });

  return githubData;
}

let mdFiles: any[] = [];
export async function getFiles(githubData: GithubData) {
  const octokit = await octokitApp.getInstallationOctokit(githubData.installationId)
  const tree = await octokit.request(
    "GET /repos/{owner}/{repo}/git/trees/{tree_sha}",
    {
      owner: githubData.repoOwner,
      repo: githubData.repoName,
      tree_sha: githubData.gitRef,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  tree.data.tree.forEach((file) => {
    const suffix = file.path?.split(".")[1];
    if (suffix == "md") {
      mdFiles.push(file.sha);
    } else if (file.type == "tree") {
      const _githubData = githubData;
      _githubData.gitRef = file.sha;
      getFiles(_githubData);
    }
  });
  // console.log(mds)
  return new Set(mdFiles);
}

export async function getContent(githubData: GithubData) {
  const octokit = await octokitApp.getInstallationOctokit(githubData.installationId)
  const blob = await octokit.request(
    "GET /repos/{owner}/{repo}/git/blobs/{sha}",
    {
      owner: githubData.repoOwner,
      repo: githubData.repoName,
      sha: githubData.gitRef,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  return atob(blob.data.content);
}
