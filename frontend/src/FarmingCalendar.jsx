import { useState } from "react";
import "./FarmingCalendar.css";

function FarmingCalendar() {

    const currentYear = new Date().getFullYear();

    const [year, setYear] = useState(currentYear);

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


    // Get number of days in a month
    const getDaysInMonth = (month) => {
        return new Date(year, month + 1, 0).getDate();
    };


    // Get starting day of the month
    const getStartingDay = (month) => {
        return new Date(year, month, 1).getDay();
    };


    const previousYear = () => {
        setYear(year - 1);
    };


    const nextYear = () => {
        setYear(year + 1);
    };


    const goToCurrentYear = () => {
        setYear(currentYear);
    };


    return (

        <div className="farming-calendar">

            {/* HEADER */}

            <div className="calendar-header">

                <div>

                    <h2>
                        📅 Farming Calendar
                    </h2>

                    <p>
                        Plan and manage your farming activities
                    </p>

                </div>

            </div>


            {/* YEAR CONTROLS */}

            <div className="year-controls">

                <button onClick={previousYear}>
                    ← Previous Year
                </button>

                <div className="current-year">
                    {year}
                </div>

                <button onClick={nextYear}>
                    Next Year →
                </button>

            </div>


            <button
                className="today-button"
                onClick={goToCurrentYear}
            >
                📅 Current Year ({currentYear})
            </button>


            {/* YEAR VIEW */}

            <div className="year-calendar">

                {months.map((month, monthIndex) => {

                    const totalDays =
                        getDaysInMonth(monthIndex);

                    const startingDay =
                        getStartingDay(monthIndex);

                    return (

                        <div
                            className="month-card"
                            key={month}
                        >

                            <h3>
                                {month}
                            </h3>


                            {/* WEEK DAYS */}

                            <div className="week-days">

                                {days.map((day) => (

                                    <span key={day}>
                                        {day}
                                    </span>

                                ))}

                            </div>


                            {/* DATES */}

                            <div className="month-days">

                                {/* Empty spaces before day 1 */}

                                {Array.from({
                                    length: startingDay
                                }).map((_, index) => (

                                    <span
                                        className="empty-day"
                                        key={`empty-${index}`}
                                    />

                                ))}


                                {/* Month dates */}

                                {Array.from({
                                    length: totalDays
                                }).map((_, index) => {

                                    const day = index + 1;

                                    const today =
                                        new Date();

                                    const isToday =
                                        year === today.getFullYear() &&
                                        monthIndex === today.getMonth() &&
                                        day === today.getDate();

                                    return (

                                        <span
                                            className={
                                                isToday
                                                    ? "calendar-day today"
                                                    : "calendar-day"
                                            }
                                            key={day}
                                        >
                                            {day}
                                        </span>

                                    );

                                })}

                            </div>

                        </div>

                    );

                })}

            </div>


            {/* FARMING ACTIVITIES */}

            <div className="farming-activities">

                <h2>
                    🌱 Farming Activities
                </h2>

                <p>
                    Farming activities and reminders can
                    be added to specific dates later.
                </p>

                <div className="activity-placeholder">

                    🌾 Sowing &nbsp; | &nbsp;
                    💧 Irrigation &nbsp; | &nbsp;
                    🧪 Fertilizer &nbsp; | &nbsp;
                    🌱 Crop Care &nbsp; | &nbsp;
                    🌾 Harvest

                </div>

            </div>

        </div>
    );
}

export default FarmingCalendar;