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
    // 设置基准日期：2024-12-16（第一个休息日）
    const baseDate = new Date(2024, 11, 16);
    
    // 计算与基准日期的天数差
    const diffDays = Math.floor((date - baseDate) / (1000 * 60 * 60 * 24));
    
    // 关键修改：为了处理负数天数，我们需要调整计算方式
    const cycleDay = ((diffDays % 6) + 6) % 6;
    
    // 由于基准日是休息的第一天，所以：
    // 0,1,2是休息日
    // 3,4,5是工作日
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
          className={`p-2 border rounded-lg ${
            isToday ? 'bg-blue-100 border-blue-500' : ''
          } ${
            shiftStatus === '上班' ? 'bg-pink-50' : 'bg-green-50'
          } hover:shadow-md transition-shadow duration-200`}
        >
          <div className="text-center font-medium">{day}</div>
          <div className={`text-xs text-center mt-1 ${
            shiftStatus === '上班' ? 'text-pink-600' : 'text-green-600'
          }`}>
            {shiftStatus}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => changeMonth(-1)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            &#8249;
          </button>
          <div className="text-xl font-semibold text-gray-800">
            {currentDate.getFullYear()}年{currentDate.getMonth() + 1}月
          </div>
          <button
            onClick={() => changeMonth(1)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            &#8250;
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-7 gap-2 mb-2">
          {['日', '一', '二', '三', '四', '五', '六'].map(day => (
            <div key={day} className="text-center font-medium text-gray-600">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {renderCalendar()}
        </div>
        <div className="mt-4 flex justify-center space-x-4 text-sm">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded bg-pink-50 border border-pink-200 mr-2"></div>
            <span className="text-gray-600">上班日</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded bg-green-50 border border-green-200 mr-2"></div>
            <span className="text-gray-600">休息日</span>
          </div>
        </div>
      </div>
    </div>
  );
};
