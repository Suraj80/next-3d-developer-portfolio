export type Project = {
    title: string;
    description: string;
    /** Hero / large-screen image */
    image: string;
    /** Optional smaller crop for mobile & tablet; `image` used from `lg` breakpoint up */
    imageMobile?: string;
    tech: string[];
    live?: string;
    github?: string;
    featured?: boolean;
};

export type ExperienceItem = {
    role: string;
    company: string;
    logo: string;
    /** Calendar month 1–12 */
    startMonth: number;
    startYear: number;
    endYear?: number;
    /** When `endYear` is set, use end month 1–12. Omit for current role. */
    endMonth?: number;
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
