// utils/dateHelpers.ts
export const getCalendarDays = (month: Date): (Date | null)[] => {
    const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
    const lastDay = new Date(month.getFullYear(), month.getMonth() + 1, 0);

    const days: (Date | null)[] = [];

    // Add empty slots for days before first day of month
    for (let i = 0; i < firstDay.getDay(); i++) {
        days.push(null);
    }

    // Add all days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
        days.push(new Date(month.getFullYear(), month.getMonth(), i));
    }

    return days;
};

export const getPreviousMonth = (date: Date): Date => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() - 1);
    return newDate;
};

export const getNextMonth = (date: Date): Date => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() + 1);
    return newDate;
};