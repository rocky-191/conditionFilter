window.onload=function(){
	//ip查找输入
	$(".js-ipSearchInput").focus(function(){
			($(this).val()==='输入IP快速查找')?$(this).val(''):null;
		})
   		.blur(function(){
      		var $this = $(this);
       		($this.val() === '')? $this.val('输入IP快速查找') : null;
 	});
	//更多ip
	$(".js-configMore").on("click",function(){
		var self=this;
		if($(self).hasClass("config_more")){
			$(self).text("收起");
			$(self).removeClass("config_more").addClass("config_sq");
			$(".js-ipContent").addClass("ipContent1");
		}else{
			$(self).text("更多");
			$(self).removeClass("config_sq").addClass("config_more");
			$(".js-ipContent").removeClass("ipContent1");
		}
	});
	//多选
	$(".js-configMoreSelect").on("click",function(){
		$(".js-ipAddress").hide();
		$(".js-moreIpTr").show();
	});
	$(".js-ipCancle").on("click",function(){
		$(".js-ipSearchInput").val("输入IP快速查找");
		$(".js-moreIpTr").hide();
		$(".js-ipAddress").show();
	});
	//ip地址选定后确定
	$(".js-ipConfirm").on("click",function(){
		var selectIp=$(".js-ipTj").nextAll("a"),
			showSelectTj=$(".js-hasSelectTj");
		var selectIpTjHtml="";
		/**
		 * ip分块
		 * **/
//		for(var i=0,len=selectIp.length;i<len;i++){
//			selectIpTjHtml+='<div class="selectTjDiv">';
//			selectIpTjHtml+='<span class="color_9 js-selectTjName">源文件IP地址：</span>';
//			selectIpTjHtml+='<span class="color_3 js-selectTjContent">'+$(selectIp[i]).text()+'</span>';
//			selectIpTjHtml+='<a class="closeIcon js-selectTjClose" onclick="closeSelf(this)"></a></div>';
//		}
		/**
		 * ip 整合一块
		 * **/
		selectIpTjHtml+='<div class="selectTjDiv">';
		selectIpTjHtml+='<span class="color_9 js-selectTjName">源文件IP地址：</span>';
		for(var i=0,len=selectIp.length;i<len;i++){
			selectIpTjHtml+='<span class="color_3 js-selectTjContent">'+$(selectIp[i]).text()+'</span>&nbsp;&nbsp;';
		}
		selectIpTjHtml+='<a class="closeIcon js-selectTjClose js-spIndex" onclick="closeSelf(this)"></a></div>';//js-spIndex作为特殊标记，标记此块div又此生成
		showSelectTj.show();
		$(".js-moreIpTr").hide();
		showSelectTj.find("tr td:last-child").append(selectIpTjHtml);
	});
	//ip地址选择搜索
	$(".js-ipUl li").on("click",function(){
		$(".js-ipConfirm").show();
		var self=this;
		var ipHtml="";
		var ip_selectTj=$(".js-ipSearchInput").parent();
		if($(self).find("span.checkbox1").hasClass("noselect")){
			$(self).find("span.checkbox1").removeClass("noselect").addClass("select");
			var ipText=$(self).find("a").text();
			$(self).find("a").prop("name",ipText);
			ipHtml+=$(self).html();
		}else{
			var ipText1=$(self).find("a").text();
			$(self).find("span.checkbox1").removeClass("select").addClass("noselect");
			var ipA=ip_selectTj.find("a[name='"+ipText1+"']");
			ipA.prev().remove();
			ipA.remove();
		}
		ip_selectTj.find("label.js-ipTj").show();
		ip_selectTj.append(ipHtml);
		//判断是否已有选择的ip
		if(ip_selectTj.find("label.js-ipTj").next().length==0){
			ip_selectTj.find("label.js-ipTj").hide();
			$(".js-ipConfirm").hide();
		}
	});
	//展示已选条件
	$(".js-tj a.tjBj").on("click",function(){
		var selectTjHtml="",self=this;
		var qy1=$(".js-hasSelectTj"),
			p=$(self).parent().parent().parent();
		var tjBjName=p.find("label.tjBj_name").text(),
		    tjBjValue=$(self).text();
		selectTjHtml+='<div class="selectTjDiv">';
		selectTjHtml+='<span class="color_9 js-selectTjName" name="'+tjBjName+'">'+tjBjName+'：</span>';
		selectTjHtml+='<span class="color_3 js-selectTjContent">'+tjBjValue+'</span>';
		selectTjHtml+='<a class="closeIcon js-selectTjClose" onclick="closeSelf(this)"></a></div>';
		qy1.show();
		p.hide();
		qy1.find("tr td:last-child").append(selectTjHtml);
	});
}

//删除已选条件
function closeSelf(obj){
	var tjBjName1=$(".js-tj").find("label.tjBj_name"),
		tjIndex,
		tjBjName2=$(obj).parent().find("span.js-selectTjName").attr("name");
	if($(obj).hasClass("js-spIndex")){
		$(".js-tj tr").eq("0").show();
	}else{
		for(var i=0,len=tjBjName1.length;i<len;i++){
			if($(tjBjName1[i]).text()==tjBjName2){
				tjIndex=i;
				break;
			}
		}
		if(tjIndex>0){
			tjIndex+=1;
		}
		$(".js-tj tr").eq(tjIndex).show();
	}
	if($(obj).parent().siblings().length==0){
		$(".js-hasSelectTj").hide();
	}
	$(obj).parent().remove();
}
