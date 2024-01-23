import { string } from "zod"

export interface BlockType {
  id: string,
  tag: string,
  htmlContent: string[], 
}


export interface UserType {
  id: string,
  email: string,
  emailVerified: boolean | null,
  name: string,
  image: string,
}

export interface MembersType {
  email: string,
  access: string,
}


export interface MarkdownInterface {
  
  id: string,
  title: string,
  content: string,
  currentLine: number,
  lastEdited: number | undefined,
  admin: string,
  members: MembersType[],
  visibility: string,

}

export type TemplateType =  {
  id: string,
  name: string,
  content: string,
  description: string,
  creator: UserType,
type: 'free' | 'pro',
categories: string[],
includes?: string[]
  views: number,
  image: string,
}


export  type ContributorType = {
  name: string;
  link?: string;
  role?: string;
}

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
}

export type MainNavItem = NavItem


export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      items: NavLink[]
    }
)

export type DashboardConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export type NavItemConfig = {
  name: string
  subItems: {
      name: string
      link: string
      description: string
  }[]
  link?: undefined
} | {
  name: string
  link: string
  subItems?: undefined
}


export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    github: string
  }
}


export type SubscriptionPlan = {
    name: string
    description: string
    flutterwavePriceId: string
    features: string[]
  }
  
export type UserSubscriptionPlan = SubscriptionPlan &
Pick<User, "flutterwaveCustomerId" | "flutterwaveSubscriptionId"> & {
    flutterwaveCurrentPeriodEnd: number
    isPro: boolean
}

