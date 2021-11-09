function getEle(arry)
{
    return arry.innerText;
}

var classAll = document.getElementsByClassName("line-name flex-expand");//获取所有列表项（包括未显示部分，下同）
var numAll = document.getElementsByClassName("number");//获取所有序号
var statAll = document.getElementsByClassName("flex-row line-value flex-align-center flex-mobile-reverse-list");//获取所有状态
var len = numAll.length;//该页面class的总数
let classAllt = Array.from(classAll);
let numAllt = Array.from(numAll);
let statAllt = Array.from(statAll);
var classText = classAllt.map(getEle);
var numText = numAllt.map(getEle);
var law = numText.lastIndexOf("1.");//需要被丢弃的部分长度
var comN = numText.slice(0 , law);
var lar = comN.lastIndexOf("1.");//获得左侧的列表长度
console.time('time_cost');//开始计时
const exportTitle = ["Top trending categories","Heat","No.","Top growing queries","Heat"];//表头
var outPut = "data:text/csv;charset=utf-8," + exportTitle + "\n";

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve , delay))
const repeatedGreetings = async () => {
for (var i = 0; i < lar; i++)
	{
		classAll[i].click();
		await sleep(1000);//点击后等待元素更新
		var classNow = document.getElementsByClassName("line-name flex-expand");
		var numNow = document.getElementsByClassName("number");
		var statNow = document.getElementsByClassName("flex-row line-value flex-align-center flex-mobile-reverse-list");
		let classNowt = Array.from(classNow);
		let numNowt = Array.from(numNow);
		let statNowt = Array.from(statNow);
		var classText1 = classNowt.map(getEle);
		var numText1 = numNowt.map(getEle);
		var statText1 = statNowt.map(getEle);
		var drop = numText1.lastIndexOf("1.");
		var numReal = numText1.slice(lar , drop);
		var d1 = classText1.slice(0 , lar);
		var d2 = numText1.slice(lar , drop);
		var d3 = classText1.slice(lar , drop);
		var d4 = statText1.slice(0 , lar);
		var d5 = statText1.slice(lar , drop);
		
		for (var c = 0; c < d2.length; c++)//数组转为csv格式
		{	
			if (c == 0)
			{
				outPut += [d1[i] + "," + d4[i] + "," + d2[c] + "," + d3[c] + "," + d5[c] + "," + "\n"];		
			}
			else 
			{
				outPut += [ "," + "," + d2[c] + "," + d3[c] + "," + d5[c] + "," + "\n"];
			}
		}
		console.log("导出中..."+(i+1)+"/"+(lar));
	}
		var myDate = new Date();
		var mytime = myDate.toLocaleTimeString();
		var timeOut = myDate.toLocaleString( );//获取日期与时刻
		timeOut = timeOut.replace(/'/g , "");
		timeOut = timeOut.replace(/\//g , "-");
		timeOut = timeOut.replace(/:/g , "'");//格式化时间

		var encodedUri = encodeURI(outPut);
		//window.open(encodedUri);
		var link = document.createElement("a");
		link.setAttribute("href" , encodedUri);
		link.setAttribute("download" , timeOut+".csv");
		document.body.appendChild(link);
		link.click();//导出文件
		console.log("导出完成");
		console.timeEnd('time_cost');//统计耗时
}
repeatedGreetings();