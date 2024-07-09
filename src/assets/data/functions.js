export function getLast12Months() {
    let dates = [];
    let currentDate = new Date();
    for (let i = 0; i < 12; i++) {
        let prevMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
        let prevMonth = prevMonthDate.toLocaleString('default', { month: 'short' });
        let prevYear = prevMonthDate.getFullYear().toString().slice(-2);
        let formattedDate = `${prevMonth}_${prevYear}`;
        dates.push(formattedDate);
    }
    return dates;
}

export function mapMonthName(monthYear) {
    // console.log(monthYear);
    const [month, year] = monthYear.split('_');
    const monthIndex = new Date(`${month} 1, ${year}`).getMonth();
    const file = new Date(2000, monthIndex).toLocaleString('default', { month: 'short' });
    // console.log(file);
    return file;
}

const currentDate = () => new Date();

export const calculateDaysLeft = (endingDate) => {
    // Split the date string into day, month, and year components
    const [year, month, day] = endingDate.split("-");
    // Months are 0-indexed in JavaScript Date objects, so subtract 1 from the month
    const end = new Date(year, month - 1, day);
    // Set both dates to midnight to compare accurately
    const today = currentDate();
    today.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    // Calculate the difference in milliseconds
    const timeDifference = end - today;
    // Convert milliseconds to days
    const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return daysLeft;
};

export function formatTimestamp() {
    let timestamp = Date.now();
    let date = new Date(timestamp);
    // Get day, month, and year from the Date object
    let day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let year = date.getFullYear(); // Get full year
    // Format the date as dd/mm/yyyy
    let formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
}

export function lastMonthName() {
    let timestamp = Date.now();
    let date = new Date(timestamp);
    date.setMonth(date.getMonth() - 1);
    date.setDate(24);
    if (date.getMonth() === 11) {
        date.setFullYear(date.getFullYear() - 1);
    }
    let monthAbbreviation = date.toLocaleString('default', { month: 'short' });
    let formattedDate = `${monthAbbreviation}_${date.getFullYear().toString().slice(-2)}`;
    return formattedDate;
}

export const sliceMonthWeekValue = 57;

// export function getTimeStamp (){
//     const now = new Date();
//     const day = String(now.getDate()).padStart(2, '0');
//     const month = String(now.getMonth() + 1).padStart(2, '0');
//     const year = now.getFullYear();
//     const hours = String(now.getHours()).padStart(2, '0');
//     const minutes = String(now.getMinutes()).padStart(2, '0');
//     const seconds = String(now.getSeconds()).padStart(2, '0');
//     const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
//     let time = `${day}/${month}/${year}-${hours}:${minutes}:${seconds}:${milliseconds}`;
//     return time;
// }

export const getTimeStamp = () => {
    return new Date().getTime();
};

export const cleanOptionName = (option) => {
    if (typeof option !== 'string') {
      option = String(option);
    }
    return option.replace(/GNFT/g, 'NFT');
  };