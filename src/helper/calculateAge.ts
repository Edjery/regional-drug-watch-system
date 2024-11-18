import dayjs from "dayjs";

// Define the function to calculate age based on the birthdate
const calculateAge = (birthdate: string): number => {
    // Parse the input birthdate into a Day.js object
    const birthDay = dayjs(birthdate);

    // Get the current date
    const currentDate = dayjs();

    // Calculate the age by getting the difference in years
    let age = currentDate.diff(birthDay, 'year');

    // Check if the birthday has passed this year
    const birthdayThisYear = birthDay.year(currentDate.year());
    if (birthdayThisYear.isAfter(currentDate)) {
        // If the birthday hasn't occurred yet this year, subtract 1 from the age
        age -= 1;
    }

    return age;
}

export default calculateAge