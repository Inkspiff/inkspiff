import { query, where, getDocs, collection } from "@firebase/firestore";
import { db } from "@/firebase";


const mdCollection = collection(db, "markdowns");
const editorUrl = process.env.INKSPIFF_EDITOR_URL;

export async function handlePullRequestOpened(octokit: any, payload: any) {
  console.log(payload.repository.full_name);
  if (payload.pull_request.base.ref == payload.repository.default_branch) {
    const q = query(
      mdCollection,
      where("github", "==", payload.repository.full_name)
    );

    await getDocs(q)
      .then((querySnapshot) => {
        let mdEditors: string[] = [];
        querySnapshot.forEach((doc) => {
          const stylizedUrl = `\n✨ ${editorUrl}/${doc.id}?pr=${payload.number} ✨`;
          mdEditors.push(stylizedUrl);
          console.log(stylizedUrl);
        });
        console.log(mdEditors);
        try {
          octokit.request(
            "POST /repos/{owner}/{repo}/issues/{issue_number}/comments",
            {
              owner: payload.repository.owner.login,
              repo: payload.repository.name,
              issue_number: payload.pull_request.number,
              body: `Spotted some neat updates in your PR! But before it merges, let's use Inkspiff's AI to keep your documentation in sync.${mdEditors.join()}`,
              headers: {
                "x-github-api-version": "2022-11-28",
              },
            }
          );
        } catch (error: any) {
          if (error.response) {
            console.error(
              `Error! Status: ${error.response.status}. Message: ${error.response.data.message}`
            );
          }
          console.error(error);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    console.log("Pull request not to default branch");
  }
}
