import { staticLinks } from "../endpoints/endpoints";

import { isPracticeResult } from "../types/types";
import { getF1Table, getResultURL } from "../utils/scrapping";

/**
 *
 * @param {year} year - 1950-now
 * @param {string} [raceName="Australia"]
 * @returns {Promise<isPracticeResult[]>}
 */

export const getPracticeResults = async (year: number = new Date().getFullYear(), raceName: string = "Australia", sessionNumber: number = 1): Promise<isPracticeResult[]> => {
    try {
        const resultsURL = await getResultURL(year, raceName);
        const raceResultsURL = `${staticLinks.fullResults}/${year}/${resultsURL.slice(23, resultsURL.length - 12)}/practice/${sessionNumber}`;
        console.log(raceResultsURL);
        function assignTableValues(driver: string[]): isPracticeResult {
            const driverObj: isPracticeResult = {
                position: driver[0],
                name: driver[2].slice(0, driver[2].length - 3),
                code: driver[2].slice(driver[2].length - 3),
                team: driver[3],
                laps: Number(driver[5]),
                time: driver[4],
                number: Number(driver[1]),
            };
            if (driver.length < 6) delete driverObj.laps;
            return driverObj;
        }

        return getF1Table(raceResultsURL, assignTableValues) as unknown as isPracticeResult[];
    } catch (error: unknown) {
        throw new Error(error as string);
    }
};
