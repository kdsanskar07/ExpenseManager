import { Chart, ChartTooltip, ChartArea, ChartLegend, ChartValueAxis, ChartValueAxisItem, ChartSeries, ChartSeriesItem, ChartSeriesLabels, ChartCategoryAxis, ChartCategoryAxisItem } from "@progress/kendo-react-charts";
import styles from './Chart.module.css'

const Charts = (props) => {

  const transactionStatusPerCategory = [
    {
      status: "Food",
      value: props.data.categorically.food || 0,
      color: '#8AC539'
    },
    {
      status: "Home",
      value: props.data.categorically.home || 0,
      color: '#FF6D56'
    },
    {
      status: "Shopping",
      value: props.data.categorically.shopping || 0,
      color: '#FA9233'
    },
    {
      status: "Fuel",
      value: props.data.categorically.fuel || 0,
      color: '#FFBE0A'
    },
    {
      status: "Others",
      value: props.data.categorically.others || 0,
      color: '#57B7DD'
    }
  ];
  const transactionStatusPerWeek = [
    {
      status: "Week 1",
      value: props.data.weekly.week1 || 0,
      color: '#8AC539'
    },
    {
      status: "Week 2",
      value: props.data.weekly.week2 || 0,
      color: '#FF6D56'
    },
    {
      status: "Week 3",
      value: props.data.weekly.week3 || 0,
      color: '#FA9233'
    },
    {
      status: "Week 4",
      value: props.data.weekly.week4 || 0,
      color: '#FFBE0A'
    },
  ];

  const labelContent = (e) => e.category;

  const renderTooltip = context => {
    const { category, value } = context.point || context;
    return (
      <div>
        {category}: {value}%
      </div>
    );
  };

  return (
    <div className={styles.MonthlyChart}>
      <Chart >
        <ChartArea background="" height={250} width={props.width} margin={props.margin} />
        <ChartLegend visible={false} />
        <ChartTooltip render={renderTooltip} />
        <ChartSeries>
          <ChartSeriesItem type={props.type} data={props.for === "week" ? transactionStatusPerWeek : transactionStatusPerCategory} categoryField="status" field="value">
            <ChartSeriesLabels color="" background="none" content={props.for === "category" ? labelContent : null} />
          </ChartSeriesItem>
        </ChartSeries>
        <ChartCategoryAxis>
          <ChartCategoryAxisItem labels={{ color: "white", }} />
        </ChartCategoryAxis>
        <ChartValueAxis>
          <ChartValueAxisItem labels={{ color: "white", }} />
        </ChartValueAxis>
      </Chart>
    </div>
  );
};

export default Charts;