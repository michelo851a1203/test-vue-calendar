import { computed, ref } from 'vue';

export function useCalendar(inputDate?: Date) {
  const currentDate = ref(inputDate ?? new Date());

  const weekName = [
    '週日', 
    '週一', 
    '週二', 
    '週三', 
    '週四', 
    '週五', 
    '週六', 
  ];

  const addDate = (
    addNumber: number, 
    inputDate: Date = currentDate.value,
  ): Date => {
    inputDate.setDate(inputDate.getDate() + addNumber);
    return inputDate;
  }

  const addMonth = (
    addNumber: number, 
    inputDate: Date = currentDate.value,
  ): Date => {
    inputDate.setMonth(inputDate.getMonth() + addNumber);
    return inputDate;
  }

  const getFirstDayDateOfCurrent = (): Date => {
    const current = currentDate.value;
    return new Date(current.getFullYear(), current.getMonth(), 1);
  }

  const getLastDayDateOfCurrent = (): Date => {
    const current = currentDate.value;
    const nextMonthCurrent = addMonth(1, current);
    nextMonthCurrent.setDate(1);
    return addDate(-1, nextMonthCurrent);
  }

  const getFirstCalendarDate = computed(() => {
    const firstDayDate = getFirstDayDateOfCurrent();
    const firstDayOfWeek = firstDayDate.getDay();
    return addDate(-1 * firstDayOfWeek, firstDayDate);
  })

  const getLastCalendarDate = computed(() => {
    const lastDayDate = getLastDayDateOfCurrent();
    const lastDayOfWeekRemaining = 6 - lastDayDate.getDay();
    return addDate(lastDayOfWeekRemaining, lastDayDate);
  })

  const getCurrentCalendarArray = computed(() => {
    const calendarArray: string[][] = [];
    let tempArray: string[] = [];
    let targetDate = getFirstCalendarDate.value;
    const endDate = addDate(1, getLastCalendarDate.value);

    while(targetDate.getMonth() !== endDate.getMonth() || targetDate.getDate() !== endDate.getDate()) {
      tempArray.push(`${targetDate.getMonth() + 1}/${targetDate.getDate()}`);
      addDate(1,targetDate);
      if (tempArray.length !== 7) continue;
      calendarArray.push(tempArray);
      tempArray = [];
    }
    return calendarArray;
  })

  return {
    currentDate,
    weekName,
    addDate,
    addMonth,
    getFirstDayDateOfCurrent,
    getLastDayDateOfCurrent,
    getFirstCalendarDate,
    getLastCalendarDate,
    getCurrentCalendarArray,
  }
}
