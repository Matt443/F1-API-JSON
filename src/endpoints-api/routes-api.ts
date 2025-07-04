import { Router } from "express";

import {
    driverLineUp,
    teamLineUp,
    driverStandings,
    constructorStandings,
    worldChampions,
    raceResults,
    raceSchedule,
    fullRaceResults,
    fullQualiResults,
    fullFastestLaps,
    fullPracticeResults,
    fullPitstopsSummary,
    fullSprintShootout,
} from "./endpoints-api";

const router = Router();

router.get("/getDriverLineup", driverLineUp);

router.get("/getTeamLineup", teamLineUp);

router.get("/getDriverStandings/:year", driverStandings);
router.get("/getDriverStandings", driverStandings);

router.get("/getConstructorStandings/:year", constructorStandings);
router.get("/getConstructorStandings", constructorStandings);

router.get("/getWorldChampions", worldChampions);

router.get("/getRaceResults/:year", raceResults);
router.get("/getRaceResults/", raceResults);

router.get("/getRaceSchedule/:year", raceSchedule);
router.get("/getRaceSchedule", raceSchedule);
router.get("/getFullRaceResults/:year", fullRaceResults);
router.get("/getFullQualiResults/:year", fullQualiResults);
router.get("/getFullFastestLaps/:year", fullFastestLaps);
router.get("/getFullPracticeResults/:year", fullPracticeResults);
router.get("/getFullPitstopsSummary/:year", fullPitstopsSummary);
router.get("/getFullSprintShootout/:year", fullSprintShootout);

export default router;
