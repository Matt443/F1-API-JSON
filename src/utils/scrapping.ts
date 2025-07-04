import axios from "axios";
import { dynamicLinks } from "../endpoints/endpoints";
import * as cheerio from "cheerio";
import { fullQualiResult, isFullRaceResult, isFullSprintResult, qualiTimes } from "../types/types";
import { assignPropertyIfDefined } from "./common";

/**
 *
 * @param {number} year 1950-now
 * @param {string} raceName
 * @returns {Promise<string>}
 */
export async function getResultURL(year: number = new Date().getFullYear(), raceName: string): Promise<string> {
    try {
        const response = await axios(`${dynamicLinks.rootLink}/${year}/${dynamicLinks.results}`);

        const $ = cheerio.load(response.data);
        const allResults = $(".f1-table tbody td > p > a")
            .map((i, el) => $(el).attr("href"))
            .get();
        const URL = allResults.find((el) => el.includes(raceName.replace(" ", "-").toLowerCase()));

        if (!URL) throw "No data found";
        return URL;
    } catch (error: unknown) {
        throw new Error(error as string);
    }
}

/**
 *
 * @param {string} url
 * @param {(driver: string[]) => object}callback
 * @returns {Promise<Array<object>}
 */
export async function getF1Table(url: string, callback: (driver: string[]) => object): Promise<Array<object>> {
    try {
        const results = await axios(url);
        const resultTable: Array<object> = [];
        const $ = cheerio.load(results.data);
        $(".f1-table > tbody > tr").each(function () {
            const driver = $(this)
                .find("td p")
                .map((_i, el) => $(el).text())
                .get();

            if (driver.length < 2) throw Error("Data from table can't be loaded");

            resultTable.push(callback(driver));
        });
        return resultTable;
    } catch (error: unknown) {
        throw new Error(error as string);
    }
}

/**
 *
 * @param {string} driver - values from table
 * @returns {fullQualiResult}
 */
export function assignQualiValues(driver: string[]): fullQualiResult {
    const driverDetails: fullQualiResult = {
        position: driver[0],
        number: parseInt(driver[1]),
        name: driver[2].slice(0, driver[2].length - 3).replace(/\u00a0/g, " "),
        code: driver[2].slice(driver[2].length - 3),
        team: driver[3],
        times: assignPropertyIfDefined([driver[4], driver.length > 6 ? driver[5] : false, driver.length > 7 ? driver[6] : false], ["q1", "q2", "q3"]) as qualiTimes,
        laps: parseInt(driver[driver.length - 1]),
    };

    return driverDetails;
}

/**
 *
 * @param {string[]} driver
 * @returns {isFullSprintResult | isFullRaceResult}
 */
export function assignRaceValues(driver: string[]): isFullSprintResult | isFullRaceResult {
    return {
        name: driver[2].slice(0, driver[2].length - 3).replace(/\u00a0/g, " "),
        code: driver[2].slice(driver[2].length - 3),
        team: driver[3],
        laps: Number(driver[4]),
        time: driver[5],
        points: Number(driver[6]),
        number: Number(driver[1]),
    };
}
