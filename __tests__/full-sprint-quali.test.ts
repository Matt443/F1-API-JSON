import { getFullSprintShootout } from "../src/server";

test("get race results", async () => {
    expect(await getFullSprintShootout(2024)).toMatchSnapshot();
});
