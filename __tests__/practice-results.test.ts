import { getFullPracticeResults } from "../src/server";

test("fastest laps", async () => {
    expect(await getFullPracticeResults(2024)).toMatchSnapshot();
});
