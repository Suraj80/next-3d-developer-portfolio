export type Project = {
    title: string;
    description: string;
    image: string;
    tech: string[];
    live?: string;
    github?: string;
    featured?: boolean;
};

export type ExperienceItem = {
    role: string;
    company: string;
    logo: string;
    startYear: number;
    endYear?: number;
    description: string[];
};

export type ContributionType = "Bug Fix" | "Feature" | "Docs" | "Refactor";

export type Contribution = {
    repo: string;
    description: string;
    type: ContributionType;
    tech: string[];
    pr?: string;
    link: string;
};

export type Tech = {
    name: string;
    category: string;
    level: string;
    icon: React.ReactNode;
};
