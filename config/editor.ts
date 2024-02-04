import { BlockSelectItemType } from "@/types/editor";
import { BlockType } from "@codemirror/view";


export const MENU_HEIGHT = 150;

export const SUPPORTED_BLOCKS: BlockSelectItemType[] = [
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

export const SUPPORTED_BLOCKS_GITHUB: BlockSelectItemType[] = [
  {
    id: "stats",
    content: `<img align="center" src="https://github-readme-stats.vercel.app/api?username=madushadhanushka&include_all_commits=true&count_private=true&show_icons=true&line_height=20&title_color=2B5BBD&icon_color=1124BB&text_color=A1A1A1&bg_color=0,000000,130F40" alt="my Github Stats"/>`,
    tag: "stats",
    label: "Github Stats",
  },
  {
    id: "top-langs",
    content: `<img align="center" src="https://github-readme-stats.vercel.app/api/top-langs/?username=madushadhanushka&layout=compact&title_color=2B5BBD&text_color=A1A1A1&bg_color=0,000000,130F40" alt="my Github Stats"/>`,
    tag: "top-langs",
    label: "Top Languages"
  },
    
    {
      id: "activity-graph",
      content: `<img align="center" src="https://activity-graph.herokuapp.com/graph?username=madushadhanushka&bg_color=0,000000,130F40&color=2B5BBD&line=2B5BBD&point=2B5BBD&area=true&hide_border=true" alt="my Github Stats"/>`,
      tag: "activity-graph",
      label: "Activity Graph"
    },
    {
      id: "github-stats",
      content: `<img align="center" src="https://github-readme-stats.vercel.app/api/wakatime?username=madushadhanushka&layout=compact&title_color=2B5BBD&text_color=A1A1A1&bg_color=0,000000,130F40" alt="my Github Stats"/>`,
      tag: "github-stats",
      label: "Wakatime Stats"
    },
    {
      id: "github-stats",
      content: `<img align="center" src="https://github-readme-stats.vercel.app/api/wakatime?username=madushadhanushka&layout=compact&title_color=2B5BBD&text_color=A1A1A1&bg_color=0,000000,130F40" alt="my Github Stats"/>`,
      tag: "github-stats",
      label: "Wakatime Stats"
    },
    {
      id: "github-stats",
      content: `<img align="center" src="https://github-readme-stats.vercel.app/api/wakatime?username=madushadhanushka&layout=compact&title_color=2B5BBD&text_color=A1A1A1&bg_color=0,000000,130F40" alt="my Github Stats"/>`,
      tag: "github-stats",
      label: "Wakatime Stats"
    },
    {
      id: "github-stats",
      content: `<img align="center" src="https://github-readme-stats.vercel.app/api/wakatime?username=madushadhanushka&layout=compact&title_color=2B5BBD&text_color=A1A1A1&bg_color=0,000000,130F40" alt="my Github Stats"/>`,
      tag: "github-stats",
      label: "Wakatime Stats"
    },
    {
      id: 'github-all-stats',
      content: `<<img src="https://myreadme.vercel.app/api/embed/YOURUSERNAME?panels=userstatistics,toprepositories,toplanguages,commitgraph" alt="reimaginedreadme" />`,
      tag: 'github-all-stats',
      label: 'Github All Stats',
    },
    {
      id: 'longest-streak-stats',
      content: `<img src="https://github-readme-streak-stats.herokuapp.com/?user=madushadhanushka&theme=tokyonight" alt="mystreak"/>`,
      tag: 'longest-streak-stats',
      label: 'Longest Streak Stats',
    },
    {
      id: 'github-repo-stats',
      content: `[![ReadMe Card](https://github-readme-stats.vercel.app/api/pin/?username=madushadhanushka&repo=differ)](https://github.com/madushadhanushka/differ)
      [![ReadMe Card](https://github-readme-stats.vercel.app/api/pin/?username=madushadhanushka&repo=simple-sqlite)](https://github.com/madushadhanushka/simple-sqlite)`,
      tag: 'github-repo-stats',
      label: 'Github Repo Stats',
    },
    {
      id: 'html-table',
      content: `<table>
      <thead align="center">
        <tr border: none;>
          <td><b>📘 Project</b></td>
          <td><b>⭐ Stars</b></td>
          <td><b>🤝 Forks</b></td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><a href="https://github.com/madushadhanushka/differ"><b>Differ</b></a></td>
          <td><img alt="Stars" src="https://img.shields.io/github/stars/madushadhanushka/differ?style=flat-square&labelColor=343b41"/></td>
          <td><img alt="Forks" src="https://img.shields.io/github/forks/madushadhanushka/differ?style=flat-square&labelColor=343b41"/></td>
        </tr>
        <tr>
          <td><a href="https://github.com/madushadhanushka/differ"><b>Simple SQLite</b></a></td>
          <td><img alt="Stars" src="https://img.shields.io/github/stars/madushadhanushka/simple-sqlite?style=flat-square&labelColor=343b41"/></td>
          <td><img alt="Forks" src="https://img.shields.io/github/forks/madushadhanushka/simple-sqlite?style=flat-square&labelColor=343b41"/></td>
        </tr>
      </tbody>
    </table>`,
      tag: 'html-table',
      label: 'HTML Table',
    },
    {
      id: 'contribution-graph',
      content: `![Contribution](https://activity-graph.herokuapp.com/graph?username=madushadhanushka&theme=react-dark&hide_border=true&area=true)`,
      tag: 'contribution-graph',
      label: 'Contribution Graph',
    },
    {
      id: 'snake-animation',
      content: `![Snake animation](https://github.com/madushadhanushka/github-readme/blob/output/github-contribution-snake.svg)`,
      tag: 'snake-animation',
      label: 'Snake Animation',
    },
    {
      id: 'repo-contributors',
      content: `<a href = "https://github.com/madushadhanushka/simple-sqlite/graphs/contributors">
      <img src = "https://contrib.rocks/image?repo=madushadhanushka/simple-sqlite"/>
    </a>`,
    tag: 'repo-contributors',
    label: 'Repo Contributors',

    },
    {
      id: 'trophy',
      content: `<img src="https://github-profile-trophy.vercel.app/?username=madushadhanushka&theme=juicyfresh&no-bg=true" />`,
      tag: 'trophy',
      label: 'Trophy',
    },
    {
      id: 'history-graph',
      content: `![star-history](https://api.lucabubi.me/chart?username=USERNAME&repository=REPOSITORY&color=COLOR)`,
      tag: 'history-graph',
      label: 'History Graph',
    },
    {
      id: 'random-joke',
      content: `![Jokes Card](https://readme-jokes.vercel.app/api)`,
      tag: 'random-joke',
      label: 'Random Joke',
    },
    {
      id: 'spotify-playing',
      content: `[![Spotify](https://novatorem.bgstatic.vercel.app/api/spotify)](https://open.spotify.com/artist/6hyCmqlpgEhkMKKr65sFgI)`,
      tag: 'spotify-playing',
      label: 'Spotify Playing',
    },
    {
      id: 'profile-view-count',
      content: `![Profile View Counter](https://komarev.com/ghpvc/?username=madushadhanushka)`,
      tag: 'profile-view-count',
      label: 'Profile View Count',
    },
    {
      id: 'profile-view-count',
      content: `<a href="https://www.linkedin.com/in/dhanushkamadushan/" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-%230077B5.svg?&style=flat-square&logo=linkedin&logoColor=white" alt="LinkedIn"></a>
      <a href="https://www.instagram.com/dhanushka_m/" target="_blank"><img src="https://img.shields.io/badge/Instagram-%23E4405F.svg?&style=flat-square&logo=instagram&logoColor=white" alt="Instagram"></a>
      <a href="https://www.facebook.com/dhanushka.madushan.37" target="_blank"><img src="https://img.shields.io/badge/Facebook-%231877F2.svg?&style=flat-square&logo=facebook&logoColor=white" alt="Facebook"></a>
      <a href="https://open.spotify.com/playlist/37i9dQZF1DWYfNJLV7OBMA" target="_blank"><img src="https://img.shields.io/badge/Spotify-%231ED760.svg?&style=flat-square&logo=spotify&logoColor=white" alt="Spotify"></a>
      <a href="https://dev.to/dhanushkadev" target="_blank"><img src="https://img.shields.io/badge/DEV-%230A0A0A.svg?&style=flat-square&logo=DEV.to&logoColor=white" alt="DEV.to"></a>`,
      tag: 'socials-1',
      label: 'Socials 1',
    },

]

export const SUPPORTED_BLOCKS_PROFILE: BlockSelectItemType[] = [
  // ...
  {
    id: 'leetcode-stats',
    content: `[![KnlnKS's LeetCode stats](https://leetcode-stats-six.vercel.app/api?username=madushandhanushka)](https://github.com/madushadhanushka/github-readme)`,
    tag: 'leetcode-stats',
    label: 'LeetCode Stats',
  },
  {
    id: 'codeforces-stats',
    content: `[![KnlnKS's Codeforces stats](https://cf.leed.at?id=madushandhanushka)]( https://codeforces.com/profile/madushandhanushka)`,
    tag: 'codeforces-stats',
    label: 'Codeforces Stats',
  },
  {
    id: 'codechef-stats',
    content: `[![KnlnKS's Codechef stats](https://cc.leed.at?id=madushandhanushka)](https://www.codechef.com/users/madushandhanushka)`,
    tag: 'codechef-stats',
    label: 'Codechef Stats',
  },
  {
    id: 'atcoder-stats',
    content: `[![KnlnKS's Atcoder stats](https://atcoder-badges.now.sh/api/atcoder/madushandhanushka)](https://atcoder.jp/users/madushandhanushka)`,
    tag: 'atcoder-stats',
    label: 'Atcoder Stats',
  },
  {
    id: 'hackerrank-stats',
    content: `[![KnlnKS's Hackerrank stats](https://hackerrank-badges.vercel.app/api/madushandhanushka)](https://www.hackerrank.com/madushandhanushka)`,
    tag: 'hackerrank-stats',
    label: 'Hackerrank Stats',
  },
  {
    id: 'hackerearth-stats',
    content: `[![KnlnKS's Hackerearth stats](https://he-badge.vercel.app/api/profile/madushandhanushka)](https://www.hackerearth.com/@madushandhanushka)`,
    tag: 'hackerearth-stats',
    label: 'Hackerearth Stats',
  },
  {
    id: 'spoj-stats',
    content: `[![KnlnKS's SPOJ stats](https://spojtoolkit.vercel.app/api/madushandhanushka)](https://www.spoj.com/users/madushandhanushka)`,
    tag: 'spoj-stats',
    label: 'SPOJ Stats',
  },
]

export const SUPPORTED_BLOCKS_GITHUB_BADGES: BlockSelectItemType[] = [
]

export const SUPPORTED_BLOCKS_SOCIALS: BlockSelectItemType[] = [
  {
    id: 'socials-1',
    content: `<a href="https://www.linkedin.com/in/dhanushkamadushan/" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-%230077B5.svg?&style=flat-square&logo=linkedin&logoColor=white" alt="LinkedIn"></a>
    <a href="https://www.instagram.com/dhanushka_m/" target="_blank"><img src="https://img.shields.io/badge/Instagram-%23E4405F.svg?&style=flat-square&logo=instagram&logoColor=white" alt="Instagram"></a>
    <a href="https://www.facebook.com/dhanushka.madushan.37" target="_blank"><img src="https://img.shields.io/badge/Facebook-%231877F2.svg?&style=flat-square&logo=facebook&logoColor=white" alt="Facebook"></a>
    <a href="https://open.spotify.com/playlist/37i9dQZF1DWYfNJLV7OBMA" target="_blank"><img src="https://img.shields.io/badge/Spotify-%231ED760.svg?&style=flat-square&logo=spotify&logoColor=white" alt="Spotify"></a>
    <a href="https://dev.to/dhanushkadev" target="_blank"><img src="https://img.shields.io/badge/DEV-%230A0A0A.svg?&style=flat-square&logo=DEV.to&logoColor=white" alt="DEV.to"></a>`,
    tag: 'socials-1',
    label: 'Socials 1',
  }
]

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

export const popupBaseStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "90%",
  height: "80%",
  bgcolor: 'background.paper',
//   border: '2px solid #000',
  borderRadius: "8px",
//   boxShadow: 24,
  p: 0,
  overflow: "hidden",
};

