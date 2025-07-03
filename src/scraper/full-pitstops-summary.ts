import axios from "axios";
import * as cheerio from "cheerio";
import { staticLinks } from "../endpoints/endpoints";

import { isPitstopsSummary } from "../types/types";
import { getF1Table, getResultURL } from "../utils/scrapping";

/**
 *
 * @param {year} year - 1950-now
 * @param {string} [raceName="Australia"]
 * @returns {Promise<isPitstopsSummary[]>}
 */

export const getFullPitstopsSummary = async (year: number = new Date().getFullYear(), raceName: string = "Australia"): Promise<isPitstopsSummary[]> => {
    try {
        const resultsURL = await getResultURL(year, raceName);
        const pitstopsSummaryURL = `${staticLinks.fullResults}/${year}/${resultsURL.slice(23, resultsURL.length - 12)}/pit-stop-summary`;

        const results = await axios(pitstopsSummaryURL);
        const $ = cheerio.load(results.data);
        const raceDate = $(".f1rd-page > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) p:nth-child(1)").text().slice(5);

        function assignTableValues(driver: string[]): isPitstopsSummary {
            const driverObj: isPitstopsSummary = {
                stops: driver[0],
                name: driver[2].slice(0, driver[2].length - 3).replace(/\u00a0/g, " "),
                code: driver[2].slice(driver[2].length - 3),
                team: driver[3],
                lap: Number(driver[4]),
                time: driver[6],
                timeOfDay: new Date(`${raceDate} ${driver[5]} GMT-0`),
                number: Number(driver[1]),
                total: driver[7],
            };
            return driverObj;
        }

        return getF1Table(pitstopsSummaryURL, assignTableValues) as unknown as isPitstopsSummary[];
    } catch (error: unknown) {
        throw new Error(error as string);
    }
};
