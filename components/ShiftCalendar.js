const ShiftCalendar = () => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  
  // 获取当月的天数
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // 获取当月第一天是星期几
  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // 计算排班状态
  const getShiftStatus = (date) => {
    const baseDate = new Date(2024, 11, 16);
    const diffDays = Math.floor((date - baseDate) / (1000 * 60 * 60 * 24));
    const cycleDay = ((diffDays % 6) + 6) % 6;
    
    if (cycleDay < 3) {
      return '休息';
    } else {
      return '上班';
    }
  };

  // 切换月份
  const changeMonth = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setCurrentDate(newDate);
  };

  // 生成日历网格
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const days = [];

    // 填充空白日期
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    // 填充实际日期
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isToday = new Date().toDateString() === date.toDateString();
      const shiftStatus = getShiftStatus(date);
      
      days.push(
        <div
          key={day}
          className={`relative p-4 border rounded-xl ${
            isToday ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-300 shadow-sm' : ''
          } ${
            shiftStatus === '上班' 
              ? 'bg-gradient-to-br from-pink-50 to-rose-50 hover:from-pink-100 hover:to-rose-100' 
              : 'bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100'
          } transform hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer`}
        >
          <div className={`text-center font-medium ${isToday ? 'text-blue-700' : 'text-gray-700'}`}>
            {day}
          </div>
          <div className={`text-xs text-center mt-1 font-medium ${
            shiftStatus === '上班' 
              ? 'text-rose-600' 
              : 'text-emerald-600'
          }`}>
            {shiftStatus}
          </div>
          {isToday && (
            <div className="absolute top-0 right-0 w-2 h-2 mt-1 mr-1">
              <span className="absolute inline-flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => changeMonth(-1)}
              className="p-2 rounded-full text-white hover:bg-white/20 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="text-2xl font-bold text-white">
              {currentDate.getFullYear()}年{currentDate.getMonth() + 1}月
            </div>
            <button
              onClick={() => changeMonth(1)}
              className="p-2 rounded-full text-white hover:bg-white/20 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-7 gap-4 mb-4">
            {['日', '一', '二', '三', '四', '五', '六'].map(day => (
              <div key={day} className="text-center font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-4">
            {renderCalendar()}
          </div>
          <div className="mt-6 flex justify-center space-x-6 text-sm">
            <div className="flex items-center bg-gradient-to-r from-pink-50 to-rose-50 px-4 py-2 rounded-full shadow-sm">
              <div className="w-3 h-3 rounded-full bg-rose-400 mr-2"></div>
              <span className="text-gray-700 font-medium">上班日</span>
            </div>
            <div className="flex items-center bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 rounded-full shadow-sm">
              <div className="w-3 h-3 rounded-full bg-emerald-400 mr-2"></div>
              <span className="text-gray-700 font-medium">休息日</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
