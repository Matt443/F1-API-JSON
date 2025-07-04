import { staticLinks } from "../endpoints/endpoints";

import { isFullRaceResult } from "../types/types";
import { assignRaceValues, getF1Table, getResultURL } from "../utils/scrapping";

/**
 *
 * @param {year} year - 1950-now
 * @param {string} [raceName="Australia"]
 * @returns {Promise<isFullRaceResult[]>}
 */

export const getFullRaceResults = async (year: number = new Date().getFullYear(), raceName: string = "Australia"): Promise<isFullRaceResult[]> => {
    try {
        const resultsURL = await getResultURL(year, raceName);
        const raceResultsURL = `${staticLinks.fullResults}/${year}/${resultsURL.slice(23, resultsURL.length)}`;

        return getF1Table(raceResultsURL, assignRaceValues) as unknown as isFullRaceResult[];
    } catch (error: unknown) {
        throw new Error(error as string);
    }
};
