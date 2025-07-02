import { getPitstopsSummary } from "../src/server";

test("fastest laps", async () => {
    expect(await getPitstopsSummary(2024)).toMatchSnapshot();
});
