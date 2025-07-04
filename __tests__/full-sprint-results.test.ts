import { getFullSprintResults } from "../src/server";

test("get race results", async () => {
    expect(await getFullSprintResults(2024)).toMatchSnapshot();
});
