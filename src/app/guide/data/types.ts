export interface InlineText {
  type: "text";
  content: string;
}

export interface InlineStrong {
  type: "strong";
  content: string;
}

export interface InlineEm {
  type: "em";
  content: string;
}

export interface InlineCode {
  type: "code";
  content: string;
}

export interface InlineLink {
  type: "link";
  href: string;
  label: string;
}

export interface InlineCrossLink {
  type: "crossLink";
  code: string;
  label?: string;
}

export type InlineSegment =
  | InlineText
  | InlineStrong
  | InlineEm
  | InlineCode
  | InlineLink
  | InlineCrossLink;

export interface GuideHeading {
  type: "heading";
  level: number;
  text: string;
}

export interface GuideParagraph {
  type: "paragraph";
  content: InlineSegment[];
}

export interface GuideList {
  type: "list";
  ordered: boolean;
  items: InlineSegment[][];
}

export interface GuideCode {
  type: "code";
  language?: string;
  code: string;
}

export interface GuideTable {
  type: "table";
  header: string[];
  rows: string[][];
}

export interface GuideBlockquote {
  type: "blockquote";
  content: InlineSegment[];
}

export interface GuideDivider {
  type: "divider";
}

export interface GuideEssence {
  type: "essence";
  content: GuideBlock[];
}

export interface GuideMyth {
  type: "myth";
  items: { statement: string; truth: string }[];
}

export interface GuideAction {
  type: "action";
  items: InlineSegment[][];
}

export interface GuideReadMore {
  type: "readMore";
  links: { code: string; label: string }[];
}

export type GuideBlock =
  | GuideHeading
  | GuideParagraph
  | GuideList
  | GuideCode
  | GuideTable
  | GuideBlockquote
  | GuideDivider
  | GuideEssence
  | GuideMyth
  | GuideAction
  | GuideReadMore;

export interface GuideDoc {
  code: string;
  section: string;
  sectionCode: string;
  readingTime: string;
  title: string;
  shortTitle: string;
  essence: string;
  blocks: GuideBlock[];
}

export interface GuideSubsection {
  code: string;
  title: string;
  docs: GuideDoc[];
}

export interface GuideSection {
  code: string;
  title: string;
  docs: GuideDoc[];
  subsections: GuideSubsection[];
}

export interface GuideData {
  docs: GuideDoc[];
  sections: GuideSection[];
  byCode: Record<string, GuideDoc>;
}
