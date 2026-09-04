import { getPersonTitle, people } from "@/lib/people";

function toAnswerProfile(person: (typeof people)[keyof typeof people]) {
  return {
    name: person.name,
    avatarUrl: person.avatarUrl,
    title: getPersonTitle(person),
  };
}

export const SlikeyProfile = toAnswerProfile(people.slikey);
export const ZeroErrorsProfile = toAnswerProfile(people.zeroerrors);
export const DevSlashNullProfile = toAnswerProfile(people.devslashnull);
