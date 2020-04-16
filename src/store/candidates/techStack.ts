export type TechStackValue =
  | "java"
  | "javascript"
  | "c#"
  | "php"
  | "python"
  | "c++"
  | "typescript"
  | "swift"
  | "ruby"
  | "kotlin"
  | "scala"
  | "go"
  | "business-analyst"
  | "data-science"
  | "design-ux"
  | "gamedev-unity-as3"
  | "product-manager"
  | "project-manager"
  | "qa-manual"
  | "qa-automation"
  | "sql-dba"
  | "sysadmin-devops"
  | "marketing"
  | "recruiting-hr"
  | "sales"
  | "support"
  | "other"
  | "ios"
  | "android"
  | "management";

interface TechStack {
  value: TechStackValue;
  label: string;
}

export const techStackOptions: TechStack[] = [
  {
    label: "Java",
    value: "java",
  },
  {
    label: "JavaScript",
    value: "javascript",
  },
  {
    label: "C#",
    value: "c#",
  },
  {
    label: "PHP",
    value: "php",
  },
  {
    label: "Python",
    value: "python",
  },
  {
    label: "C++",
    value: "c++",
  },
  {
    label: "TypeScript",
    value: "typescript",
  },
  {
    label: "Swift",
    value: "swift",
  },
  {
    label: "Ruby",
    value: "ruby",
  },
  {
    label: "Kotlin",
    value: "kotlin",
  },
  {
    label: "Scala",
    value: "scala",
  },
  {
    label: "Go",
    value: "go",
  },
  {
    label: "Business Analyst",
    value: "business-analyst",
  },
  {
    label: "Data Science",
    value: "data-science",
  },
  {
    label: "Design / UX",
    value: "design-ux",
  },
  {
    label: "GameDev / Unity / AS3",
    value: "gamedev-unity-as3",
  },
  {
    label: "Product Manager",
    value: "product-manager",
  },
  {
    label: "Project Manager",
    value: "project-manager",
  },
  {
    label: "QA Manual",
    value: "qa-manual",
  },
  {
    label: "QA Automation",
    value: "qa-automation",
  },
  {
    label: "SQL (DBA)",
    value: "sql-dba",
  },
  {
    label: "SysAdmin / DevOps",
    value: "sysadmin-devops",
  },
  {
    label: "Marketing",
    value: "marketing",
  },
  {
    label: "Recruiting / HR",
    value: "recruiting-hr",
  },
  {
    label: "Sales",
    value: "sales",
  },
  {
    label: "Support",
    value: "support",
  },
  {
    label: "Other",
    value: "other",
  },
  {
    label: "iOS",
    value: "ios",
  },
  {
    label: "Android",
    value: "android",
  },
  {
    label: "Management",
    value: "management",
  },
];
