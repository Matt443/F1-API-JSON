import { staticLinks } from "../endpoints/endpoints";

import { isFullSprintResult } from "../types/types";
import { assignRaceValues, getF1Table, getResultURL } from "../utils/scrapping";

/**
 *
 * @param {year} year - 1950-now
 * @param {string} [raceName="Australia"]
 * @returns {Promise<isFullSprintResult[]>}
 */

export const getFullSprintResults = async (year: number = new Date().getFullYear(), raceName: string = "Brazil"): Promise<isFullSprintResult[]> => {
    try {
        const resultsURL = await getResultURL(year, raceName);
        const sprintQualiURL = `${staticLinks.fullResults}/${year}/${resultsURL.slice(23, resultsURL.length - 12)}/sprint-results`;

        return getF1Table(sprintQualiURL, assignRaceValues) as unknown as isFullSprintResult[];
    } catch (error: unknown) {
        throw new Error(error as string);
    }
};
