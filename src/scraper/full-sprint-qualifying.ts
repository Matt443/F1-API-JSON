import { staticLinks } from "../endpoints/endpoints";

import { fullQualiResult } from "../types/types";
import { assignQualiValues, getF1Table, getResultURL } from "../utils/scrapping";

/**
 *
 * @param {year} year - 1950-now
 * @param {string} [raceName="Australia"]
 * @returns {Promise<fullQualiResult[]>}
 */

export const getFullSprintShootout = async (year: number = new Date().getFullYear(), raceName: string = "Brazil"): Promise<fullQualiResult[]> => {
    try {
        const resultsURL = await getResultURL(year, raceName);
        const sprintQualiURL = `${staticLinks.fullResults}/${year}/${resultsURL.slice(23, resultsURL.length - 11)}/sprint-qualifying`;

        return getF1Table(sprintQualiURL, assignQualiValues) as unknown as fullQualiResult[];
    } catch (error: unknown) {
        throw new Error(error as string);
    }
};
