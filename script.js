// 设置基准日期（2024-12-13是第一天上班）
const baseDate = new Date('2024-12-13');
const baseState = 'work'; // 基准日期的状态是上班

function getShiftStatus(date) {
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.floor((date - baseDate) / oneDay);
    const cycleDay = ((diffDays % 6) + 6) % 6; // 确保结果为正数
    
    return cycleDay < 3 ? 'work' : 'rest';
}

function createCalendar(year, month) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDay = firstDay.getDay();
    const totalDays = lastDay.getDate();
    
    const calendarDiv = document.getElementById('calendar');
    calendarDiv.innerHTML = '';
    
    // 添加上个月的天数
    const prevMonthLastDay = new Date(year, month, 0);
    const prevMonthDays = prevMonthLastDay.getDate();
    for (let i = startingDay - 1; i >= 0; i--) {
        const dayDiv = document.createElement('div');
        const date = new Date(year, month - 1, prevMonthDays - i);
        dayDiv.className = `calendar-day other-month ${getShiftStatus(date)}`;
        dayDiv.textContent = prevMonthDays - i;
        calendarDiv.appendChild(dayDiv);
    }
    
    // 添加当前月的天数
    const today = new Date();
    for (let i = 1; i <= totalDays; i++) {
        const dayDiv = document.createElement('div');
        const date = new Date(year, month, i);
        const isToday = today.getDate() === i && 
                       today.getMonth() === month && 
                       today.getFullYear() === year;
        
        dayDiv.className = `calendar-day ${getShiftStatus(date)}`;
        if (isToday) dayDiv.className += ' today';
        dayDiv.textContent = i;
        calendarDiv.appendChild(dayDiv);
    }
    
    // 添加下个月的天数
    const remainingDays = 42 - (startingDay + totalDays);
    for (let i = 1; i <= remainingDays; i++) {
        const dayDiv = document.createElement('div');
        const date = new Date(year, month + 1, i);
        dayDiv.className = `calendar-day other-month ${getShiftStatus(date)}`;
        dayDiv.textContent = i;
        calendarDiv.appendChild(dayDiv);
    }
    
    // 更新月份标题
    const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月',
                       '七月', '八月', '九月', '十月', '十一月', '十二月'];
    document.getElementById('currentMonth').textContent = 
        `${year}年 ${monthNames[month]}`;
}

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

createCalendar(currentYear, currentMonth);

document.getElementById('prevMonth').addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    createCalendar(currentYear, currentMonth);
});

document.getElementById('nextMonth').addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    createCalendar(currentYear, currentMonth);
});
