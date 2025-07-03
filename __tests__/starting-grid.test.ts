import { getStartingGrid } from "../src/server";

test("get race schedule", async () => {
    expect(await getStartingGrid(2024)).toMatchSnapshot();
});
