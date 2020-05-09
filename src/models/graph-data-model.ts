export class Point {
  y: number;
  label: string;
  color: string;
  constructor(y,label,color?)
  {
    this.y = y;
    this.label = label;
    this.color = color;
  }
}

export class GraphData {
  type: string;
  showInLegend: boolean;
  legendMarkerColor: string;
  legendText: string;
  dataPoints: Point[];
  startAngle: number;
  indexLabelFontSize: number;
  indexLabel: string;
  toolTipContent: string;
  name: string;
  markerType: string;
  xValueFormatString: string;
  axisYType: string;
  constructor(type,showInLegend,legendMarkerColor,legendText,dataPoints,startAngle,indexLabelFontSize,indexLabel,toolTipContent,name?,markerType?,xValueFormatString?,axisYType?)
  {
    this.type = type;
    this.showInLegend = showInLegend;
    this.legendMarkerColor = legendMarkerColor;
    this.legendText = legendText;
    this.dataPoints = dataPoints;
    this.startAngle = startAngle;
    this.indexLabelFontSize = indexLabelFontSize;
    this.indexLabel = indexLabel;
    this.toolTipContent = toolTipContent;
    this.name = name;
    this.markerType = markerType;
    this.xValueFormatString = xValueFormatString;
    this.axisYType = axisYType;
  }
}

export class AxialPoint{
  y: number;
  label: string;
  constructor(y,label)
  {
    this.label = label;
    this.y = y;
  }
}

export class LineGraph {
  type: string;
  showInLegend: boolean;
  name: string;
  dataPoints: AxialPoint[];
  color: string
  constructor(type,showInLegend,name,dataPoints,color)
  {
    this.type = type;
    this.dataPoints = dataPoints;
    this.name = name;
    this.showInLegend = showInLegend;
    this.color = color;
  }
}
