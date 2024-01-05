export const getUnavailableDates = () => {};

export const checkDisponibility = () => {};

//Check si dos periodos de tiempo se suporponen
export const checkOverlappingPeriods = (
    startDate1,
    endDate1,
    startDate2,
    endDate2
) => {
    if (startDate1 < endDate2 && startDate2 < endDate1) {
        return true;
    } else {
        return false;
    }
};

export const addDays = (date, days) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

export const getDates = (startDate, stopDate) => {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(new Date(currentDate));
        currentDate = addDays(currentDate, 1);
    }
    return dateArray;
};

export const getAllDisabledDates = (booking) => {
    let disabledDates = [];

    for (let i = 0; i < booking.length; i++) {
        disabledDates.push(
            ...getDates(
                new Date(booking[i].checkin),
                new Date(booking[i].checkout)
            )
        );
    }
    return disabledDates;
};

export const diffDays = (startDate, endDate) => {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round(Math.abs((startDate - endDate) / oneDay));
};
