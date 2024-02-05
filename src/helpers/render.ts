import { Block, RefType } from "../core/Block";

export const render = <R extends RefType, B extends Block<{}, R>>(query: string, block: B) => {
  const root = document.querySelector(query);
  const blockContent = block.getContent();
  if (root && blockContent) {
    root.appendChild(blockContent);
  }
  return root;
};
