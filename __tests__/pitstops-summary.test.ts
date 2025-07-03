import { getFullPitstopsSummary } from "../src/server";

test("fastest laps", async () => {
    expect(await getFullPitstopsSummary(2024)).toMatchSnapshot();
});
