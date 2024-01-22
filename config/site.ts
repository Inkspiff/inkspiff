import { SiteConfig, NavItemConfig } from "@/types"

export const siteConfig: SiteConfig = {
  name: "Inkspill",
  description:
    "An open source application built using the new router, server components and everything new in Next.js 13.",
  url: "https://inkspiff.com",
  ogImage: "https://inkspill.com/og.jpg",
  links: {
    twitter: "https://twitter.com/inkspill",
    github: "https://github.com/preciousnwaoha/inkspill",
  },
}



export const navConfig:NavItemConfig[] = [
  {
      name: "product",
      subItems: [
          {
              name: "inkspiff AI",
              link: "/product/ai",
              description: "Integrated AI generator", 
          },
          {
              name: "template gallery",
              link: "/templates",
              description: "Rich markdown templates", 
          },
      ]
  },
  {
      name: "resources",
      subItems: [
          {
              name: "blog",
              link: "/blog",
              description: "Coming soon", 
          },
          {
              name: "community",
              link: "/community",
              description: "Join our growing community", 
          },
          {
              name: "about us",
              link: "/about",
              description: "Who's behind inkspiff", 
          },
          {
              name: "contact us",
              link: "/contact",
              description: "Reach us for anything", 
          },
      ]
  },
  {
      name: "pricing",
      link: "/product/pricing",
  }
]
