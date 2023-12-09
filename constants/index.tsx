import { SidebarLink } from "@/types";
import {
  Building2,
  HelpCircle,
  Home,
  Laptop2,
  LayoutGrid,
  Moon,
  Sun,
  Tag,
  UserRound,
  Users,
} from "lucide-react";

export const themeModes = [
  {
    value: "light",
    label: "Light",
    icon: <Sun size={22} />,
  },
  {
    value: "dark",
    label: "Dark",
    icon: <Moon size={22} />,
  },
  {
    value: "system",
    label: "System",
    icon: <Laptop2 size={22} />,
  },
];

export const sidebarLinks: SidebarLink[] = [
  {
    icon: <Home size={22} />,
    route: "/",
    label: "Home",
  },
  {
    icon: <Users size={22} absoluteStrokeWidth />,
    route: "/community",
    label: "Community",
  },
  {
    icon: <LayoutGrid size={22} />,
    route: "/collection",
    label: "Collections",
  },
  {
    icon: <Building2 size={22} />,
    route: "/jobs",
    label: "Find Jobs",
  },
  {
    icon: <Tag size={22} />,
    route: "/tags",
    label: "Tags",
  },
  {
    icon: <UserRound size={22} />,
    route: "/profile",
    label: "Profile",
  },
  {
    icon: <HelpCircle size={22} />,
    route: "/ask-question",
    label: "Ask a question",
  },
];

export const BADGE_CRITERIA = {
  QUESTION_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  QUESTION_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  TOTAL_VIEWS: {
    BRONZE: 1000,
    SILVER: 10000,
    GOLD: 100000,
  },
};
