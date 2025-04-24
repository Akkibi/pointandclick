import { scenes } from "../../data/scenes";
import { Character } from "../../types/character";
import { Conversation, Dialog, Options, SceneType } from "../../types/scene";

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
): Character[] => {
  const conversation: Conversation | null = getConversation(
    scene,
    conversationName,
  );
  if (!conversation) return [];
  return conversation.characters;
};

export interface FormatedLine {
  name: string;
  line: string[];
}
export const getLines = (
  scene: string,
  conversationName: string,
  dialogName: string,
): FormatedLine[] | [] => {
  const currentCharacters: Character[] | null = getConversationCharacters(
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
