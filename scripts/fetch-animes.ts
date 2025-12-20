import * as fs from "fs";
import * as path from "path";
import YAML from "yaml";
import type { Anime } from "../src/types";

interface BgmSubject {
  id: number;
  name: string;
  name_cn: string;
  date: string;
  images: {
    large: string;
    medium: string;
    common: string;
    small: string;
    grid: string;
  };
}

interface BgmCollection {
  updated_at: string;
  comment: string | null;
  tags: string[];
  subject: BgmSubject;
  subject_id: number;
  rate: number;
}

interface BgmResponse {
  data: BgmCollection[];
  total: number;
  limit: number;
  offset: number;
}

async function loadConfig(): Promise<{ username: string }> {
  const configPath = path.resolve(import.meta.dirname, "../config.yaml");
  const configContent = fs.readFileSync(configPath, "utf-8");
  return YAML.parse(configContent);
}

async function fetchCollections(
  username: string,
  offset: number = 0,
  limit: number = 30
): Promise<BgmResponse> {
  const url = `https://api.bgm.tv/v0/users/${username}/collections?subject_type=2&type=2&limit=${limit}&offset=${offset}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

function transformToAnime(collection: BgmCollection): Anime {
  const subject = collection.subject;
  const year = subject.date ? parseInt(subject.date.split("-")[0], 10) : 0;

  return {
    id: String(subject.id),
    title: subject.name || subject.name_cn,
    year,
    watchedDate: collection.updated_at.split("T")[0],
    rating: collection.rate,
    posterUrl: subject.images.large || subject.images.medium,
    myReview: collection.comment || "",
    tags: collection.tags || [],
  };
}

async function fetchAllCollections(username: string): Promise<Anime[]> {
  const allAnimes: Anime[] = [];
  let offset = 0;
  const limit = 30;

  console.log(`Fetching anime collections for user: ${username}...`);

  while (true) {
    console.log(`Fetching items ${offset + 1} - ${offset + limit}...`);
    const response = await fetchCollections(username, offset, limit);

    const animes = response.data.map(transformToAnime);
    allAnimes.push(...animes);

    console.log(`Progress: ${allAnimes.length} / ${response.total} items fetched`);

    if (offset + limit >= response.total) {
      break;
    }

    offset += limit;
  }

  return allAnimes;
}

async function main() {
  try {
    const config = await loadConfig();
    console.log(`Loaded username from config.yaml: ${config.username}`);

    const animes = await fetchAllCollections(config.username);

    const outputPath = path.resolve(import.meta.dirname, "../src/animes.json");
    fs.writeFileSync(outputPath, JSON.stringify(animes, null, 2), "utf-8");

    console.log(`\n✅ Successfully fetched ${animes.length} anime entries, saved to src/animes.json`);
  } catch (error) {
    console.error("❌ Failed to fetch data:", error);
    process.exit(1);
  }
}

main();
