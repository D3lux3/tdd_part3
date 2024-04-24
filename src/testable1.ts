const millisPerDay = 24 * 60 * 60 * 1000;

export function daysUntilChristmas() {
    const today = getTodayDate();
    const christmasDay = getNextChristmasDay(today);
    const diffMillis = christmasDay.getTime() - today.getTime();
    return Math.floor(diffMillis / millisPerDay);
}

const getTodayDate = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

const getNextChristmasDay = (today: Date) => {
    const christmasDay = new Date(today.getFullYear(), 12 - 1, 25);
    if (today.getTime() > christmasDay.getTime()) {
        christmasDay.setFullYear(new Date().getFullYear() + 1);
    }
    return christmasDay;
}