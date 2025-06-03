import { playerState } from "../../data/player";
import { scenes } from "../../data/scenes";
import { CharacterType } from "../../types/character";
import {
  CharacterPositions,
  Conversation,
  Dialog,
  Options,
  SceneType,
} from "../../types/scene";

export const getScene = (scene: string): SceneType => {
  const currentScene: SceneType | undefined = scenes[scene];
  return currentScene ?? scenes["scene1"];
};

export const getConversation = (
  scene: string,
  conversationName: string,
): Conversation | null => {
  const conversation = getScene(scene).conversations?.find(
    (c) => c.name === conversationName,
  );
  return conversation ?? getScene(scene).conversations?.[0] ?? null;
};

export const setConversationDone = (
  scene: string,
  conversationName: string,
): void => {
  const conversation = getConversation(scene, conversationName);
  if (!conversation) return;
  conversation.done = true;
};

export const getCurrentConversation = (scene: string): Conversation | null => {
  const conversation =
    getScene(scene).conversations?.find(
      (c) =>
        c.done === false &&
        checkDependences(playerState.achievements, c.dependences),
    ) ?? null;

  return conversation;
};

function checkDependences(
  playerAchievements: string[],
  dependences: string[] | undefined,
): boolean {
  if (playerAchievements.length === 0 || dependences === undefined)
    return false;
  return dependences.every((dep) => playerAchievements.includes(dep));
}

export const getDialog = (
  scene: string,
  conversationName: string,
  dialogName: string,
): Dialog | null => {
  const conversation: Conversation | null = getConversation(
    scene,
    conversationName,
  );
  if (!conversation || !conversation.dialog) return null;
  return (
    conversation.dialog[dialogName] ?? conversation.dialog["start"] ?? null
  );
};

export const getConversationCharacters = (
  scene: string,
  conversationName: string,
): CharacterType[] => {
  const conversation: Conversation | null = getConversation(
    scene,
    conversationName,
  );
  if (!conversation || !conversation.characters) return [];
  return conversation.characters;
};

export interface FormatedLine {
  name: string;
  line: string[];
}

// export const getCharacterPosition = (characterName: string) => {
//   if (!playerState.currentConversation) return;
//   const currentCharacters: CharacterType[] | null = getConversationCharacters(
//     playerState.currentScene,
//     playerState.currentConversation,
//   );

//   if (!currentCharacters) return;
//   const character = currentCharacters.find(
//     (c) => c.name === characterName,
//   );
//   if (!character) return;
//   return character.position;
// };

export const getCharactersPosition = (
  scene: string,
  conversationName: string,
): CharacterPositions | null => {
  const conversation: Conversation | null = getConversation(
    scene,
    conversationName,
  );
  if (!conversation) return null;
  return conversation.positions;
};

export const getLines = (
  scene: string,
  conversationName: string,
  dialogName: string,
): FormatedLine[] | [] => {
  const currentCharacters: CharacterType[] | null = getConversationCharacters(
    scene,
    conversationName,
  );
  console.log("dialog", currentCharacters);
  const dialog: Dialog | null = getDialog(scene, conversationName, dialogName);
  if (!dialog || !currentCharacters) return [];
  const lines: FormatedLine[] = [];
  for (const [key, value] of Object.entries(dialog.lines)) {
    lines.push({
      name: currentCharacters[parseInt(key)].name,
      line: value,
    });
  }
  return lines;
};

export const getOptions = (
  scene: string,
  conversationName: string,
  dialogName: string,
): Options[] | [] => {
  const dialog: Dialog | null = getDialog(scene, conversationName, dialogName);
  if (!dialog) return [];
  return dialog.options ?? [];
};

export const getSfx = (scene: string): string | undefined => {
  return getScene(scene).sound;
};
