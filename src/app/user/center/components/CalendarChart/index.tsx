import "bytemd/dist/index.css";
import "highlight.js/styles/vs.css";
import "./index.css";
import React, {useEffect, useState} from "react";
import ReactECharts from "echarts-for-react";
import dayjs from "dayjs";
import {getUserSigninRecordUsingGet} from "@/api/userController";
import {message} from "antd";



/**
 * Markdown 刷题日历图
 * @param props
 * @constructor
 */
const CalendarChart = () => {
  const [dataList, setDataList] = useState<number[]>([]);
  //计算图表所需的数据
  const year= new Date().getFullYear();
  const fetchDateList = async () =>{
    try{
      const res = await getUserSigninRecordUsingGet({
        year,
      });
      setDataList(res.data || []);
    }catch (e:any){
      message.error("获取刷题签到记录失败" + e.message)
    }
  }
  //保证只会调用一次
  useEffect(() =>{
    fetchDateList();
  },[]);
  const optionsData = dataList.map((dayOfYear,index) => {
    const dateStr = dayjs(`${year}-01-01`)
      .add(dayOfYear - 1, "day")
      .format("YYYY-MM-DD");
    console.log(dateStr)
    return [dateStr, 1];
  });
  // 图表配置
  const options = {
    visualMap: {
      show: false,
      min: 0,
      max: 1,
      inRange: {
        // 颜色从灰色到浅绿色
        color: ["#efefef", "lightgreen"],
      },
    },
    calendar: {
      range: year,
      left: 20,
      // 单元格自动宽度，高度为 16 像素
      cellSize: ["auto", 16],
      yearLabel: {
        position: "top",
        formatter: `${year} 年刷题记录`,
      },
    },
    series: {
      type: "heatmap",
      coordinateSystem: "calendar",
      data: optionsData,
    },
  };
  return <ReactECharts option={options} className="calendarChart"></ReactECharts>
};

export default CalendarChart;
