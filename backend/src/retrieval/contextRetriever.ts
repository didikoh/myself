import {
  portfolioDataUpdatedAt,
  portfolioKnowledge,
  type KnowledgeCategory,
  type KnowledgeChunk,
} from "../data/portfolioKnowledge.js";

export interface ChatMessageLike {
  role: string;
  content: string;
}

export interface RetrievalOptions {
  maxChunks?: number;
  maxCharacters?: number;
}

export interface RetrievalResult {
  chunks: KnowledgeChunk[];
  context: string;
  totalCharacters: number;
}

const DEFAULT_MAX_CHUNKS = 5;
const DEFAULT_MAX_CHARACTERS = 7_000;

const shortUsefulTerms = new Set([
  "ai",
  "ar",
  "c#",
  "c++",
  "ci",
  "css",
  "html",
  "llm",
  "php",
  "qa",
  "sql",
  "ui",
  "ux",
  "vr",
  "xr",
]);

const stopWords = new Set([
  "a",
  "about",
  "all",
  "also",
  "am",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "been",
  "but",
  "by",
  "build",
  "built",
  "can",
  "could",
  "create",
  "created",
  "did",
  "do",
  "does",
  "for",
  "from",
  "had",
  "has",
  "have",
  "he",
  "her",
  "him",
  "his",
  "how",
  "i",
  "in",
  "is",
  "it",
  "me",
  "more",
  "of",
  "on",
  "or",
  "please",
  "she",
  "so",
  "tell",
  "that",
  "the",
  "their",
  "them",
  "there",
  "they",
  "this",
  "to",
  "use",
  "used",
  "using",
  "was",
  "were",
  "what",
  "when",
  "where",
  "which",
  "who",
  "why",
  "will",
  "with",
  "would",
  "you",
  "your",
]);

const genericIntentTerms = new Set([
  "academic",
  "background",
  "bio",
  "candidate",
  "career",
  "company",
  "contact",
  "degree",
  "developer",
  "education",
  "employment",
  "experience",
  "expertise",
  "hobby",
  "hobbies",
  "interest",
  "interests",
  "job",
  "know",
  "portfolio",
  "project",
  "projects",
  "qualification",
  "qualified",
  "role",
  "senior",
  "skill",
  "skills",
  "stack",
  "suitable",
  "tech",
  "technologies",
  "technology",
  "work",
]);

const aliases: Record<string, string[]> = {
  "asp.net": ["aspnet"],
  "babylon.js": ["babylon", "babylonjs"],
  "c#": ["csharp"],
  "c++": ["cpp"],
  "current": ["currently"],
  "express.js": ["express", "expressjs"],
  "next.js": ["nextjs"],
  "node.js": ["node", "nodejs"],
  "react": ["reactjs"],
  "typescript": ["ts"],
  "unreal": ["ue", "ue4", "ue5"],
};

const selfIntroductionPattern =
  /\b(who are you|about you|yourself|introduce yourself)\b/;

const categoryIntentPatterns: Array<{
  category: KnowledgeCategory;
  patterns: RegExp[];
}> = [
  {
    category: "profile",
    patterns: [
      /\bwho is\b/,
      selfIntroductionPattern,
      /\babout (him|koh|wei zhen)\b/,
      /\b(background|bio|contact|email|github|linkedin|social|location|based)\b/,
    ],
  },
  {
    category: "education",
    patterns: [
      /\b(education|degree|university|college|study|studied|cgpa|certificate|academic)\b/,
    ],
  },
  {
    category: "roles",
    patterns: [
      /\b(professional focus|speciali[sz]ation|type of developer|developer role)\b/,
    ],
  },
  {
    category: "skills",
    patterns: [
      /\b(skill|skills|tech|technology|technologies|stack|framework|language|know|expertise)\w*\b/,
    ],
  },
  {
    category: "experience",
    patterns: [
      /\b(experience|career|employment|employer|company|job|worked|work history|current role|current position|responsibilit)\w*\b/,
      /\b(suitable|qualified|qualification|senior|hire|candidate)\b/,
    ],
  },
  {
    category: "projects",
    patterns: [
      /\b(project|projects|portfolio project|demo|website|showcase|case study)\b/,
      /\b(what|things) (has|did) (he )?(build|make|create)\b/,
    ],
  },
  {
    category: "interests",
    patterns: [/\b(interest|interests|hobby|hobbies|fun fact|likes|passion)\w*\b/],
  },
];

function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9+#.]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(value: string): Set<string> {
  const terms = normalize(value)
    .split(" ")
    .filter(Boolean)
    .filter(
      (term) =>
        !stopWords.has(term) &&
        (term.length >= 3 || shortUsefulTerms.has(term)),
    );

  const expanded = new Set(terms);

  for (const term of terms) {
    if (term.length > 4 && term.endsWith("s") && !term.endsWith("ss")) {
      expanded.add(term.slice(0, -1));
    }
  }

  const canonicalized = new Set<string>();
  for (const term of expanded) {
    let canonicalTerm = term;

    for (const [canonical, alternatives] of Object.entries(aliases)) {
      if (term === canonical || alternatives.includes(term)) {
        canonicalTerm = canonical;
        break;
      }
    }

    canonicalized.add(canonicalTerm);
  }

  return canonicalized;
}

function getIntentCategories(value: string): Set<KnowledgeCategory> {
  const normalized = normalize(value);
  const categories = new Set<KnowledgeCategory>();

  for (const intent of categoryIntentPatterns) {
    if (intent.patterns.some((pattern) => pattern.test(normalized))) {
      categories.add(intent.category);
    }
  }

  return categories;
}

function scoreChunk(chunk: KnowledgeChunk, query: string): number {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) {
    return 0;
  }

  const queryTerms = tokenize(normalizedQuery);
  if (selfIntroductionPattern.test(normalizedQuery)) {
    queryTerms.add("yourself");
  }
  const normalizedTitle = normalize(chunk.title);
  const titleTerms = tokenize(normalizedTitle);
  const contentTerms = tokenize(chunk.content);
  const normalizedKeywords = chunk.keywords.map(normalize);
  const intentCategories = getIntentCategories(normalizedQuery);
  const hasSpecificTerms = [...queryTerms].some(
    (term) => !genericIntentTerms.has(term),
  );
  const scoringTerms = hasSpecificTerms
    ? [...queryTerms].filter((term) => !genericIntentTerms.has(term))
    : [...queryTerms];
  let score = 0;

  if (!hasSpecificTerms && intentCategories.has(chunk.category)) {
    score += 12;
  }

  if (
    queryTerms.size >= 2 &&
    normalizedTitle.length >= 4 &&
    normalizedQuery.includes(normalizedTitle)
  ) {
    score += 18;
  }

  for (const term of scoringTerms) {
    if (titleTerms.has(term)) {
      score += 7;
    }

    if (
      normalizedKeywords.some(
        (keyword) => keyword === term || tokenize(keyword).has(term),
      )
    ) {
      score += 6;
    }

    if (contentTerms.has(term)) {
      score += 2.5;
    }
  }

  if (
    score > 0 &&
    hasSpecificTerms &&
    intentCategories.has(chunk.category)
  ) {
    score += 12;
  }

  if (score > 0) {
    score += (chunk.priority ?? 0) / 10;
  }

  return score;
}

function recentConversation(messages: ChatMessageLike[]): string {
  return messages
    .slice(-4, -1)
    .map((message) => message.content.slice(0, 1_500))
    .join("\n");
}

function formatContext(chunks: KnowledgeChunk[]): string {
  const header = [
    "RETRIEVED PORTFOLIO DATA",
    `Portfolio data last updated: ${portfolioDataUpdatedAt}`,
  ].join("\n");

  if (chunks.length === 0) {
    return `${header}\nRESPONSE GUIDANCE\nRespond naturally and helpfully. For general questions, answer normally. If answering would require an unsupported claim about Koh Wei Zhen, do not invent facts; briefly pivot to a related portfolio topic or suggest a useful follow-up question. Do not use a generic missing-information apology.`;
  }

  const entries = chunks.map(
    (chunk) => `\n[${chunk.title}]\n${chunk.content}`,
  );

  return `${header}\n${entries.join("\n")}`;
}

export function retrieveRelevantContext(
  messages: ChatMessageLike[],
  options: RetrievalOptions = {},
): RetrievalResult {
  const currentMessage = messages[messages.length - 1]?.content ?? "";
  const previousMessages = recentConversation(messages);
  const maxChunks = Math.max(1, options.maxChunks ?? DEFAULT_MAX_CHUNKS);
  const maxCharacters = Math.max(
    500,
    options.maxCharacters ?? DEFAULT_MAX_CHARACTERS,
  );

  const ranked = portfolioKnowledge
    .map((chunk) => ({
      chunk,
      score:
        scoreChunk(chunk, currentMessage) * 3 +
        scoreChunk(chunk, previousMessages),
    }))
    .filter(({ score }) => score >= 9)
    .sort(
      (left, right) =>
        right.score - left.score ||
        (right.chunk.priority ?? 0) - (left.chunk.priority ?? 0),
    );

  const selected: KnowledgeChunk[] = [];
  let selectedCharacters = 0;
  const bestScore = ranked[0]?.score ?? 0;

  const addChunk = (chunk: KnowledgeChunk): boolean => {
    if (
      selected.length >= maxChunks ||
      selected.some((selectedChunk) => selectedChunk.id === chunk.id)
    ) {
      return false;
    }

    const chunkCharacters = chunk.title.length + chunk.content.length;
    if (
      selected.length > 0 &&
      selectedCharacters + chunkCharacters > maxCharacters
    ) {
      return false;
    }

    selected.push(chunk);
    selectedCharacters += chunkCharacters;
    return true;
  };

  for (const { chunk, score } of ranked) {
    if (score < bestScore * 0.5) {
      break;
    }

    if (selected.length >= maxChunks) {
      break;
    }

    addChunk(chunk);
  }

  const currentTerms = tokenize(currentMessage);
  const isSpecificSkillQuestion =
    getIntentCategories(currentMessage).has("skills") &&
    [...currentTerms].some((term) => !genericIntentTerms.has(term));

  if (isSpecificSkillQuestion) {
    const relatedExperience = ranked.find(
      ({ chunk }) => chunk.category === "experience",
    );

    if (relatedExperience) {
      addChunk(relatedExperience.chunk);
    }
  }

  const context = formatContext(selected);

  return {
    chunks: selected,
    context,
    totalCharacters: context.length,
  };
}
