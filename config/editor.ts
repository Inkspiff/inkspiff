import { BlockType } from "@codemirror/view";


export const MENU_HEIGHT = 150;

export const SUPPORTED_BLOCKS: {
  id: string,
    content: string,
    tag: string,
    label: string,
}[] = [
  {
    id: "heading-1",
    content: "# ",
    tag: "h1",
    label: "Heading 1",
  },
  {
    id: "heading-2",
    content: `## `,
    tag: "h2",
    label: "Heading 2"
  },
  
  {
    id: "heading-3",
    content: "### ",
    tag: "h3",
    label: "Heading 3"
  },
  {
    id: "numbered-list",
    content: "1. ",
    tag: "list",
    label: "Numbered List"
  },
  {
    id: "bulleted-list",
    content: "* ",
    tag: "list",
    label: "Bulletted List"
  },
  {
    id: "bulleted-list",
    content: "* ",
    tag: "list",
    label: "Bulletted List"
  },
  
  {
    id: "dashed-list",
    content: "- ",
    tag: "list",
    label: "Dashed List"
  },
  {
    id: "checkmark",
    content: "[x] ",
    tag: "[x] ",
    label: "Bulletted List"
  },
  {
    id: "code-inline",
    content: "` code `",
    tag: "code",
    label: "Code Inline"
  },
  {
    id: "code-block",
    content:   `\`\`\`
     code here...
    \`\`\``,
    tag: "code",
    label: "Code Block"
  },
  {
    id: "table",
    content: `| A | B |
    | --- | --- |
    |   |   |`,
    tag: "table",
    label: "Table"
  },
  {
    id: "link",
    content: `[Link Text](https://..)`,
    tag: "a",
    label: "Link"
  },
  {
    id: "image",
    content: `![Image Description](https://..)`,
    tag: "img",
    label: "Image"
  },
  {
    id: "divider",
    content: `---`,
    tag: "hr",
    label: "Divider"
  }
];

export const SUPPORTED_SECTIONS: {
  name: string,
  content: string,
}[] = [
  {
      name: "Title & Description",
      content: "# Project Title\nA brief description of what this project does and who it's for"
  },
  {
      name: "Acknowledgement",
      content: "# Acknowledgement\nA brief description of what this project does and who it's for"
  },
  {
      name: "Badges",
      content: "# Badges\nA brief description of what this project does and who it's for"
  },
  
]


export const SUPPORTED_TAGS = [
  {
    id: "heading-1",
    tag: "h1",
    label: "Heading 1"
  },
  {
    id: "heading-2",
    tag: "h2",
    label: "Heading 2"
  },
  
  {
    id: "heading-3",
    tag: "h3",
    label: "Heading 3"
  },
  {
    id: "heading-4",
    tag: "h4",
    label: "Heading-4"
  },
  {
    id: "heading-5",
    tag: "h5",
    label: "Heading-5"
  },
  {
    id: "heading-6",
    tag: "h6",
    label: "Heading-6"
  },
  {
    id: "code",
    tag: "code",
    label: "Code"
  },
  {
    id: "paragraph",
    tag: "p",
    label: "Paragraph"
  }
];


