// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from "openai";

// type Data = {
//   name: string
// }

type ContributorType = {
  name: string;
  link?: string;
  role?: string;
}


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const description = req.body.description || '';
  const screenshots = req.body.screenshots;
  const projectType = req.body.projectType || '';
  const projectLink = req.body.projectLink;
  const isOpenSource = req.body.isOpenSource;
  const license = req.body.license || "";
  const contributors = req.body.contributors;
  const contactInfo = req.body.contactInfo;
  const mustInclude = req.body.sections;


  // console.log({body: req.body})
  if (description.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid project description",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(description, projectType, screenshots, 
        license, projectLink, isOpenSource, contributors, contactInfo, mustInclude ),
    max_tokens: 3500,
      temperature: 0.6,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error: any) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}



function generatePrompt(description: string, projectType: string, screenshots: string[], 
  license: string, projectLink: string, isOpenSource: boolean, contributors: ContributorType[], contactInfo: string, mustInclude: string[] ) {
  const optimizedPrompt =
    `I need your help to create a README file for my GitHub project. Here are the details:

    - Project Description: ${description}
    - Project Type: ${projectType}
    - Screenshots:
      ${screenshots.map((shot, index) => `- ![Screenshot ${index}](${shot})`).join("\n  ")}
    - License Type: ${license}
    - Allow Contributions: ${isOpenSource}
    - Is Open Source: ${isOpenSource}
    - Project Link: ${projectLink}
    - Contributors Data Format:
      | Name          | Role          | Link                      |
      |---------------|---------------|---------------------------|
      
    - Contact Info: You can reach me at ${contactInfo}
    - Must Include: ${mustInclude.join(", ")}

    Contributors data: [${contributors.map(contr => `{name: ${contr.name}, role: ${contr.role || ""}, link: ${contr.link || ""}}`).join(", ")}]
    
    Please generate a well-formatted README file in Markdown format based on this information. The README should include tagline, table of contents, etc, and required sections for the project.
`    
  return `${optimizedPrompt}`;
}

// The README should include sections for the project description, screenshots, license, contribution guidelines, roadmap, status, contributors, and contact information.

// | John Doe      | Developer     | https://github.com/johndoe|
      // | Jane Smith    | Documentation | https://github.com/janesmith|