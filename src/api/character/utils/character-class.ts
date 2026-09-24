export const CHARACTER_CLASSES = [
  "Fighter",
  "Ranger",
  "Wizard",
  "Rogue",
  "Cleric",
  "Druid",
  "Monk",
  "Barbarian",
  "Bard",
  "Paladin",
  "Sorcerer",
  "Warlock",
  "Artificer",
] as const;

export type CharacterClass = (typeof CHARACTER_CLASSES)[number];

export function isCharacterClass(value: unknown): value is CharacterClass {
  return (
    typeof value === "string" &&
    CHARACTER_CLASSES.some((characterClass) => characterClass === value)
  );
}