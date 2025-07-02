import { getPracticeResults } from "../src/server";

test("fastest laps", async () => {
    expect(await getPracticeResults(2024)).toMatchSnapshot();
});
