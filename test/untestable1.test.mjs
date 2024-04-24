import { describe, test, vi } from "vitest";
import { expect } from "chai";
import { daysUntilChristmas } from "../src/testable1.ts";
import { afterEach, beforeEach } from "node:test";

describe("Untestable 1: days until Christmas day", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  })

  test("364 days when it's day after christmas day", () => {
    const dayAfterXmas = new Date(2024, 11, 26);
    vi.setSystemTime(dayAfterXmas);
    expect(daysUntilChristmas()).to.equal(364)
  });
});
