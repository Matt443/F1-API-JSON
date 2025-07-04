import { staticLinks } from "../endpoints/endpoints";

import { assignQualiValues, getF1Table, getResultURL } from "../utils/scrapping";
import { assignPropertyIfDefined } from "../utils/common";
import { fullQualiResult, isFullQualiResult, qualiPartResult } from "../types/types";

/**
 *
 * @param {year} year - 1950-now
 * @param {string} [raceName="Australia"]
 * @returns {Promise<isFullQualiResult[]>}
 */

export async function getFullQualiResults(year: number = new Date().getFullYear(), raceName: string = "Australia"): Promise<isFullQualiResult[]> {
    try {
        const resultsURL = await getResultURL(year, raceName);

        let qualiResultsURL: string = `${staticLinks.fullResults}/${year}/${resultsURL.slice(23, resultsURL.length - 11)}qualifying`;
        //Before 1996 there was two quali sessions
        if (year < 1996) qualiResultsURL += "/0";

        const qualiSummary = (await getF1Table(qualiResultsURL, assignQualiValues)) as unknown as fullQualiResult[];
        let summarizedQuali: isFullQualiResult[] = [];

        if (year < 1996) {
            //Getting both sessions results
            const quali1ResultsURL: string = `${staticLinks.fullResults}/${year}/${resultsURL.slice(23, resultsURL.length - 11)}qualifying/1`;
            const quali2ResultsURL: string = `${staticLinks.fullResults}/${year}/${resultsURL.slice(23, resultsURL.length - 11)}qualifying/2`;

            function assignOnlyTimeAndNumber(driver: string[]): qualiPartResult {
                return {
                    position: driver[0],
                    time: driver[4],
                    number: parseInt(driver[1]),
                };
            }

            const quali1 = (await getF1Table(quali1ResultsURL, assignOnlyTimeAndNumber)) as unknown as qualiPartResult[];
            const quali2 = (await getF1Table(quali2ResultsURL, assignOnlyTimeAndNumber)) as unknown as qualiPartResult[];

            //Assigning times to driver
            summarizedQuali = qualiSummary.map((qualiSummaryDriver: fullQualiResult): isFullQualiResult => {
                const quali2Times = quali2.find((driver: qualiPartResult) => driver.number === qualiSummaryDriver.number)?.time;
                const quali1Times = quali1.find((driver: qualiPartResult) => driver.number === qualiSummaryDriver.number)?.time;

                const summarizedTimes = assignPropertyIfDefined([quali1Times, quali2Times, qualiSummaryDriver.times.q1], ["quali1", "quali2", "qualiSummary"]);

                return {
                    ...qualiSummaryDriver,
                    times: summarizedTimes,
                };
            });
            return summarizedQuali;
        }
        return getF1Table(qualiResultsURL, assignQualiValues) as unknown as isFullQualiResult[];
    } catch (error: unknown) {
        throw new Error(error as string);
    }
}
