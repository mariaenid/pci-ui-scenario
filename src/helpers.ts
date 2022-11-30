export const formatDate = (date: string) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [day, month, year].join("/");
};

export const getDateFilterParams = () => ({
  buttons: ["reset"],
  filterOptions: [
    "lessThan",
    {
      displayKey: "lessThanOrEqual",
      displayName: "Less than or equals",
      useOfHideFilterInput: true,
      predicate: ([filterValue]: [Date], cellValue: string): boolean => {
        const zonedDateAtMidnight: Date = new Date(cellValue);
        return zonedDateAtMidnight.getTime() <= filterValue.getTime();
      },
    },
    "greaterThan",
    {
      displayKey: "greaterThanOrEqual",
      displayName: "Greater than or equals",
      useOfHideFilterInput: true,
      predicate: ([filterValue]: [Date], cellValue: string): boolean => {
        const zonedDateAtMidnight: Date = new Date(cellValue);
        return zonedDateAtMidnight.getTime() >= filterValue.getTime();
      },
    },
    "inRange",
    "equals",
    {
      displayKey: "notEqual",
      displayName: "Does not equal",
      useOfHideFilterInput: true,
      predicate: ([filterValue]: [Date], cellValue: Date) => {
        return filterValue.getDate() !== new Date(cellValue).getDate();
      },
    },
    {
      displayKey: "isBlank",
      displayName: "Is blank",
      useOfHideFilterInput: true,
      predicate: (_: string, cellValue: any): boolean => !cellValue,
    },
    {
      displayKey: "isNotBlank",
      displayName: "Is not blank",
      useOfHideFilterInput: true,
      predicate: (_: string, cellValue: any): boolean => cellValue,
    },
  ],
  comparator: function (filterLocalDateAtMidnight: any, cellValue: any) {
    var dateAsString = cellValue;

    if (dateAsString == null) {
      return 0;
    }

    // In the example application, dates are stored as dd/mm/yyyy
    // We create a Date object for comparison against the filter date
    var dateParts = dateAsString.split("/");
    var day = Number(dateParts[2]);
    var month = Number(dateParts[1]) - 1;
    var year = Number(dateParts[0]);
    var cellDate = new Date(year, month, day);

    // Now that both parameters are Date objects, we can compare
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    } else if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
    return 0;
  },
});
