export interface Guest {
  id: string;
  groupId: string;
  firstName: string;
  lastName: string;
  attending: boolean | null;
  hasDietaryRestriction: boolean;
  dietaryDescription: string | null;
}

export interface Group {
  id: string;
  submittedAt: string | null;
  members: Guest[];
}

export interface SearchResponse {
  found: boolean;
  group: Group | null;
}

export interface SubmitMember {
  id: string;
  attending: boolean;
  hasDietaryRestriction: boolean;
  dietaryDescription: string | null;
}

export interface SubmitRequest {
  groupId: string;
  members: SubmitMember[];
}

export interface SubmitResponse {
  success: boolean;
  submittedAt: string;
}

export interface ApiError {
  error: string;
  message?: string;
  fields?: string[];
}
