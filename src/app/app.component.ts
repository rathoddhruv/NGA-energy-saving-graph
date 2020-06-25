import {
  ValueAxis,
  CircleBullet,
  XYCursor,
  XYChart,
  LineSeries,
  DateAxis
} from "@amcharts/amcharts4/charts";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";
import { color, create, useTheme } from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {
  Component,
  OnInit,
  NgZone,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  ViewChild,
  HostListener,
  ViewEncapsulation,
  ElementRef
} from "@angular/core";
import { MouseCursorStyle } from "@amcharts/amcharts4/core";
import { FormBuilder, FormGroup, FormArray, FormControl } from "@angular/forms";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private zone: NgZone,
    private formBuilder: FormBuilder
  ) {}

  chart: am4charts.XYChart = new am4charts.XYChart();
  @ViewChild("chartDiv1", { static: true }) chartDiv1: ElementRef;

  ngOnInit() {
    let chart = am4core.create("chartdiv_1", am4charts.XYChart);
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    let consumptionAxis = chart.yAxes.push(new am4charts.ValueAxis());
    let demandAxis = chart.yAxes.push(new am4charts.ValueAxis());
    let weatherAxis = chart.yAxes.push(new am4charts.ValueAxis());
    let consumptionSeries = chart.series.push(new am4charts.ColumnSeries());

    let demandSeries = chart.series.push(new am4charts.LineSeries());
    let weatherSeries = chart.series.push(new am4charts.LineSeries());
    this.zone.runOutsideAngular(() => {});
  }

  generateChartData() {
    var chartData = [];
    var firstDate = new Date();
    firstDate.setDate(firstDate.getDate() - 100);
    firstDate.setHours(0, 0, 0, 0);

    var visits = 1600;
    var hits = 2900;
    var views = 8700;

    let step = 0;
    for (var i = 0; i < 400; i++) {
      // we create date objects here. In your data, you can have date strings
      // and then set format of your dates using chart.dataDateFormat property,
      // however when possible, use date objects, as this will speed up chart rendering.
      var newDate = new Date(firstDate);
      newDate.setMinutes(newDate.getMinutes() + i);

      if (step >= 60) {
        step = 0;
      } else {
        step = step + 5;
      }

      visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
      hits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
      views += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);

      chartData.push({
        date: newDate,
        value1: visits,
        value2: visits,
        value3: visits
      });
    }
    return chartData;
  }
}
