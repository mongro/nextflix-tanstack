import type { MovieWithMediaType } from "./movies";

interface Cast {
  character: string;
  credit_id: string;
  vote_count: number;
  id: number;
  backdrop_path: string;
  poster_path: string;
  original_language: string;
  vote_average: number;
  genre_ids: Array<number>;
  popularity: number;
  overview: string;
}

interface Crew {
  id: number;
  department: string;
  original_language: string;
  credit_id: string;
  overview: string;
  vote_count: number;
  poster_path: string;
  backdrop_path: string;
  popularity: number;
  genre_ids: Array<number>;
  job: string;
  vote_average: number;
}

export interface PersonMovieCast extends Cast {
  release_date: string;
  video: boolean;
  adult: boolean;
  title: string;
  original_title: string;
}

export interface PersonMovieCrew extends Crew {
  original_title: string;
  video: boolean;
  title: string;
  adult: boolean;
  release_date: string;
}

export interface PersonTvShowCrew extends Crew {
  episode_count: number;
  origin_country: Array<string>;
  original_name: string;
  name: string;
  first_air_date: string;
}

export interface PersonTvShowCast extends Cast {
  original_name: string;
  name: string;
  episode_count: number;
  first_air_date: string;
  origin_country: Array<string>;
}

export interface PersonMovieCredit {
  cast: Array<PersonMovieCast>;
  crew: Array<PersonMovieCrew>;
  id: number;
}

export interface PersonTvShowCredit {
  cast: Array<PersonTvShowCast>;
  crew: Array<PersonTvShowCrew>;
  id: number;
}

export interface PersonCombinedCredits {
  cast: Array<PersonMovieCast & PersonTvShowCast>;
  crew: Array<PersonMovieCrew & PersonTvShowCrew>;
  id: number;
}

export type KnownFor = MovieWithMediaType | MovieWithMediaType;

export interface Person {
  id: number;
  name: string;
  known_for: Array<KnownFor>;
  profile_path: string;
  adult: boolean;
  known_for_department: string;
  gender: number;
  popularity: number;
}

export interface PersonWithMediaType extends Person {
  media_type: "person";
}

export interface PersonDetails {
  birthday: string;
  known_for_department: string;
  deathday: string;
  id: number;
  name: string;
  also_known_as: Array<string>;
  gender: number;
  biography: string;
  popularity: number;
  place_of_birth: string;
  profile_path: string;
  adult: boolean;
  imdb_id: string;
  homepage: string;
}
