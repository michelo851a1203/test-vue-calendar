import { computed, ref, Ref } from 'vue';

export interface CalendarRowType {
  id: string;
  content: CalendarContentType[];
}

export interface CalendarContentType {
  id: string;
  calendarDate: string;
  eventTitle: string;
  holiday: string;
}

export interface CalendarOptionsType {
  holidayList?: CalendarHolidayType[];
  eventList?: CalendarEventType[];
}

export interface CalendarEventType {
  dateTitle: string;
  eventName: string;
}

export interface CalendarHolidayType {
  dateTitle: string;
  HolidayName: string;
}

export function useCalendar(
  inputDate?: Date,
  options?: CalendarOptionsType
) {
  const currentDate = ref(inputDate ?? new Date());
  const currentHolidayList: Ref<CalendarHolidayType[]> = ref(options?.holidayList ?? []);
  const currentEventList: Ref<CalendarEventType[]> = ref(options?.eventList ?? []);

  const weekName = [
    '週日', 
    '週一', 
    '週二', 
    '週三', 
    '週四', 
    '週五', 
    '週六', 
  ];

  const generatedRandomId = () => {
    return Math.random().toString(16).slice(2);
  }

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

  const setNewHolidayList = (holidayList: CalendarHolidayType[]) => {
    currentHolidayList.value = holidayList;
  }

  const setNewEventList = (eventList: CalendarEventType[]) => {
    currentEventList.value = eventList;
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
    const calendarArray: CalendarRowType[] = [];
    let tempArray: CalendarContentType[] = [];
    let targetDate = getFirstCalendarDate.value;
    const endDate = addDate(1, getLastCalendarDate.value);

    while(
      targetDate.getMonth() !== endDate.getMonth() || 
      targetDate.getDate() !== endDate.getDate()
    ) {

      const calendarDate = `${targetDate.getMonth() + 1}/${targetDate.getDate()}`;
      const entry: CalendarContentType = {
        id: generatedRandomId(),
        calendarDate,
        eventTitle: '',
        holiday: '',
      }

      const holidayObject = currentHolidayList.value.find(
        holidayItem => holidayItem.dateTitle === calendarDate
      );
      if (holidayObject) { entry.holiday = holidayObject.HolidayName; }

      const eventObject = currentEventList.value.find(
        eventItem => eventItem.dateTitle === calendarDate
      );
      if (eventObject) { entry.eventTitle = eventObject.eventName; }

      tempArray.push(entry);
      addDate(1,targetDate);
      if (tempArray.length !== 7) continue;
      calendarArray.push({
        id: generatedRandomId(),
        content: tempArray,
      });
      tempArray = [];
    }
    return calendarArray;
  })

  return {
    currentDate,
    currentHolidayList,
    currentEventList,
    weekName,
    generatedRandomId,
    addDate,
    addMonth,
    getFirstDayDateOfCurrent,
    getLastDayDateOfCurrent,
    setNewHolidayList,
    setNewEventList,
    getFirstCalendarDate,
    getLastCalendarDate,
    getCurrentCalendarArray,
  }
}
