import Message from "../domain/Message";
import Match from "../domain/Match";
import { makeAutoObservable } from "mobx";

export default class MessageStore {
  messages: Message[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get allMessages() {
    return this.messages.slice().reverse();
  }

  add = (message: string) => {
    this.messages.push(new Message(message));
  };

  addMatch = (match: Match) => {
    const message =
      "Match-" +
      (match.suite + 1) +
      " " +
      match.color +
      (match.isCombo ? " COMBO" : "");
    this.messages.push(new Message(message));
  };
}
