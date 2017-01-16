function drawSimpleBar() {
    /*创建画布*/
    var width = 300;    // 画布宽
    var height = 300;   // 画布高
    var svg = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    /*绘制矩形*/
    var dataSet = [250, 210, 170, 130, 90];  //数据（表示矩形的宽度）
    var rectHeight = 25;     //每个矩形所占的像素高度(包括空白)
    svg.selectAll("rect")
        .data(dataSet)
        .enter()
        .append("rect")
        .attr("x", 20)
        .attr("y", function (d, i) {
            return i * rectHeight;
        })
        .attr("width", function (d) {
            return d;
        })
        .attr("height", rectHeight - 5);
//            .attr("fill","#ff0000");

    svg.selectAll("rect").style("fill", "red");
}
function drawScaleDemo() {

    var width = 300;	//画布的宽度
    var height = 300;	//画布的高度

    var svg = d3.select("body")				//选择文档中的body元素
        .append("svg")				//添加一个svg元素
        .attr("width", width)		//设定宽度
        .attr("height", height);	//设定高度

    var dataSet = [2.5, 2.1, 1.7, 1.3, 0.9];

    var linear = d3.scale.linear()
        .domain([0, d3.max(dataSet)])
        .range([0, 250]);
    var rectHeight = 25;	//每个矩形所占的像素高度(包括空白)

    svg.selectAll("rect")
        .data(dataSet)
        .enter()
        .append("rect")
        .attr("x", 20)
        .attr("y", function (d, i) {
            return i * rectHeight;
        })
        .attr("width", function (d) {
            return linear(d);
        })
        .attr("height", rectHeight - 2)
        .attr("fill", "steelblue");

}
function drawAxisDemo() {
    var width = 300;	//画布的宽度
    var height = 300;	//画布的高度

    var svg = d3.select("body")				//选择文档中的body元素
        .append("svg")				//添加一个svg元素
        .attr("width", width)		//设定宽度
        .attr("height", height);	//设定高度

    var dataSet = [2.5, 2.1, 1.7, 1.3, 0.9];

    var linear = d3.scale.linear()
        .domain([0, d3.max(dataSet)])
        .range([0, 250]);
    var axis = d3.svg.axis()
        .scale(linear)      // 指定比例尺
        .orient("bottom")   // 指定刻度的方向
        .ticks(7);          // 指定刻度的数量
    var rectHeight = 25;	//每个矩形所占的像素高度(包括空白)

    svg.selectAll("rect")
        .data(dataSet)
        .enter()
        .append("rect")
        .attr("x", 20)
        .attr("y", function (d, i) {
            return i * rectHeight;
        })
        .attr("width", function (d) {
            return linear(d);
        })
        .attr("height", rectHeight - 2)
        .attr("fill", "steelblue");
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(20,130)")
        .call(axis);


}
function drawEntireBar() {
    // 画布大小
    var width = 400;
    var height = 400;
    // body 里添加一个svg画布
    var svg = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // 画布周边空白
    var padding = {left: 30, right: 30, top: 20, bottom: 20};

    //定义一个数组
    var dataSet = [10, 20, 30, 40, 33, 24, 12, 5];
    // 定义序数比例尺
    var xScale = d3.scale.ordinal()
        .domain(d3.range(dataSet.length))
        .rangeRoundBands([0, width - padding.left - padding.right]);
    // 定义线性比例尺
    var yScale = d3.scale.linear()
        .domain([0, d3.max(dataSet)])
        .range([height - padding.top - padding.bottom, 0]);
    // 定义坐标轴
    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");
    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left");

    // 矩形之间的空白
    var rectPadding = 4;

    // 添加矩形元素
    var rects = svg.selectAll(".MyRect")
        .data(dataSet)
        .enter()
        .append("rect")
        .attr("class", "MyRect")
        .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
        .attr("x", function (d, i) {
            return xScale(i) + rectPadding / 2;
        })
        .attr("y", function (d) {
            return yScale(d);
        })
        .attr("rx","8")
        .attr("ry","8")
        .attr("width", xScale.rangeBand() - rectPadding)
        .attr("height", function (d) {
            return height - padding.top - padding.bottom - yScale(d);
        });

    //添加文字元素
    var texts = svg.selectAll(".MyText")
        .data(dataSet)
        .enter()
        .append("text")
        .attr("class", "MyText")
        .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
        .attr("x", function (d, i) {
            return xScale(i) + rectPadding / 2;
        })
        .attr("y", function (d) {
            return yScale(d);
        })
        .attr("dx", function () {
            return (xScale.rangeBand() - rectPadding) / 2;
        })
        .attr("dy", function (d) {
            return 40;
        })
        .text(function (d) {
            return d;
        });

    //添加x轴
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + padding.left + "," + (height - padding.bottom) + ")")
        .call(xAxis);

    //添加y轴
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
        .call(yAxis);
}
