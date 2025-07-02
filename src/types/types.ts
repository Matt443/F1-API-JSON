export type isConstructorStanding = {
    position: number;
    team: string;
    points: number;
};

export type isDriver = {
    name: string;
    team: string;
    rank: string | undefined;
    nationalityImage: string | undefined;
    driverImage: string | undefined;
};

export type isDriverStanding = {
    position: number;
    driver: string;
    nationality: string;
    team: string;
    points: number;
};

export type isTeam = {
    name: string;
    points: number;
    drivers: string[];
    carLogo: string | undefined;
    carImage: string | undefined;
};

export type isHallOfFame = {
    name: string;
    driver_image: string | undefined;
};

export type isRaceResult = {
    grandPrix: string;
    date: Date;
    winner: string;
    car: string;
    laps: number;
    time: string;
};

export type isRaceSchedule = {
    round: string;
    date: string;
    raceCountry: string;
    eventTitle: string;
};

export type isFastestLap = {
    grandPrix: string;
    driver: string;
    car: string;
    time: string;
};

export type isFullRaceResult = {
    name: string;
    code: string;
    team: string;
    laps: number;
    time: string;
    points: number;
    number: number;
};

export type fullQualiResult = {
    code: string;
    position: string;
    number: number;
    name: string;
    team: string;
    times: qualiTimes;
    laps: number;
};

export type isFullFastestLaps = {
    position: string;
    number: number;
    code: string;
    name: string;
    team: string;
    lap: number;
    timeOfDay?: string;
    time: string;
    avgSpeed?: string;
};

export type qualiTimes = { q1: string; q2?: string; q3?: string };

export type qualiTimesBefore1996 = { quali1?: string; quali2?: string; qualiSummary?: string };

export type qualiPartResult = { time: string; number: number; position: string };

export type isFullQualiResult = Omit<fullQualiResult, "times"> & {
    times: qualiTimes | qualiTimesBefore1996;
};

export type isPracticeResult = {
    code: string;
    position: string;
    number: number;
    name: string;
    team: string;
    time: string;
    laps: number;
};
