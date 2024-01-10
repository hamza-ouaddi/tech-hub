import { SidebarLink } from "@/types";
import {
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
    icon: <Home size={24} />,
    route: "/",
    label: "Home",
  },
  {
    icon: <Users size={22} />,
    route: "/community",
    label: "Community",
  },
  {
    icon: <LayoutGrid size={22} />,
    route: "/collection",
    label: "Collections",
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

export const topQuestions = [
  "What is the significance of Moore's Law in the context of technology?",
  "Can you explain the difference between HTTP and HTTPS protocols?",
  "What is the purpose of a firewall in network security?",
  "How does cloud computing enhance business operations?",
  "Explain the concept of 'Big Data' and its relevance in today's tech landscape.",
  "What is the role of a version control system like Git in software development?",
  "How does artificial intelligence impact various industries?",
  "What are the key differences between IPv4 and IPv6?",
  "Can you elaborate on the importance of responsive web design?",
  "What is the difference between machine learning and deep learning?",
  "How does blockchain technology ensure the security of transactions?",
  "Explain the role of a Content Delivery Network (CDN) in website performance.",
  "What is the significance of the Internet of Things (IoT) in everyday life?",
  "How do web browsers render and display web pages?",
  "Describe the concept of virtualization in the context of computing.",
];
