import { describe, test } from "vitest";
import { expect } from "chai";
import { diceHandValue } from "../src/testable2.ts";

describe("Untestable 2: a dice game", () => {
  test("returns 101 if dices are the same", () => {
    const fakeDiceRoll = () => 1;

    expect(diceHandValue(fakeDiceRoll)).equal(101)
  });
});
