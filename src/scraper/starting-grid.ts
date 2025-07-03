import { staticLinks } from "../endpoints/endpoints";

import { isStartingGrid } from "../types/types";
import { getF1Table, getResultURL } from "../utils/scrapping";

/**
 *
 * @param {year} year - 1950-now
 * @param {string} [raceName="Australia"]
 * @returns {Promise<isStartingGrid[]>}
 */

export const getStartingGrid = async (year: number = new Date().getFullYear(), raceName: string = "Australia"): Promise<isStartingGrid[]> => {
    try {
        //See https://www.formula1.com/en/results/1982/races/437/south-africa/race-result
        if (year < 1983) throw Error("Before 1983 there is no starting data");

        const resultsURL = await getResultURL(year, raceName);
        const startingGridURL = `${staticLinks.fullResults}/${year}/${resultsURL.slice(23, resultsURL.length - 12)}/starting-grid`;

        function assignTableValues(driver: string[]): isStartingGrid {
            return {
                position: Number(driver[0]),
                number: Number(driver[1]),
                name: driver[2].slice(0, driver[2].length - 3).replace(/\u00a0/g, " "),
                code: driver[2].slice(driver[2].length - 3),
                team: driver[3],
                time: driver[4],
            };
        }

        return getF1Table(startingGridURL, assignTableValues) as unknown as isStartingGrid[];
    } catch (error: unknown) {
        throw new Error(error as string);
    }
};
