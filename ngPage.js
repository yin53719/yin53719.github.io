// 分页基础
angular.module('pagination', []).directive('pagination', function() {
  return {

    controller: function ($scope,$http,serialize,$timeout,sortable,searchMaxWidth,$rootScope){
        $scope.page=1;//初始页数 设置为1;
        $scope.tableshowok=1;
        var pagelength=10;
        $rootScope.Page=function(target,type){
            var that=angular.element(target);
            if(type == "first"){       
                $scope.page=1;
            }else if(type=="last"){
            	$scope.page=$scope.totalPage;
            }else if(type=="prev"){
            	if(($scope.page-1)==0) return;
                $scope.page--;
            }else if(type=="next"){
            	 if($scope.page==$scope.totalPage) return;
                 $scope.page++;
                
            }else if(type == "gogo" || ($(target.target).attr("data-type") == "enter" && target.keyCode == 13)){/*到指定页数执行的请求*/
                $scope.pageNum=angular.element(".page_angular dl dd span.gogo input.number").val();
                if($scope.pageNum>$scope.totalPage || $scope.pageNum<1 ) return;
                $scope.page = $scope.pageNum;
            }else if(type == "search"){
                $scope.page=1;
           }
           //执行公共请求方法
          
            $scope.httpPage();
 
           

        }
        /*定义公共发送请求方法****换页*/
        $scope.httpPage=function(){
        	var rowsPage=100;
        	if($scope.rowsPage){
        		rowsPage=$scope.rowsPage;
        	}
        	
            var url=$scope.Page_url+'pageNum/'+$scope.page+'/pageSize/'+rowsPage;
            var postdata=serialize('.form');
            $http.post(url,postdata).success(function(data,success){
                if(success=="200"){ 
                	$scope.tablist=data.list;
                	for(var i=0;i<$scope.tablist.length;i++){
                		$scope.tablist[i]['checked']=false;
                		$scope.tablist[i]['newlist']=[];
                	};
                	
                	$rootScope.tablist=sortable('.sortable',$scope.tablist);
                	
                	$timeout(function(){
            		  autoWidth();
            		  $scope.tableshowok=2;
            		},5);
                	$('.sortable').sortable({
                		placeholder:'placeholder',
                		start:function(event,ui){
                			var html=ui.helper.context.innerHTML;
                			ui.placeholder.html(html);
                		},
                		stop:function(event,ui){			
                			$scope.tablist=sortable('.sortable',$scope.tablist);
                			$scope.$apply();
                			$timeout(function(){
                      		  autoWidth();
                      		},5);
                		}
                	});
                    $scope.totalNumber=data.total;
                    $scope.totalPage=Math.ceil($scope.totalNumber/rowsPage);
                }else{
                    console.log("没有找到数据");
                }
            });
        }
        $scope.httpPage();  

        
    }
  }
});



//分页弹窗
angular.module('paginationD', []).directive('paginationD', function() {
  return {
    restrict : 'EA',
    replace : true,
    transclude : true,
    templateUrl : project_name+'common/paginationdia.html',
    controller: function ($scope,$http,serialize,$timeout){
        $scope.diapage=1;//初始页数 设置为1;
        
        var pagelength=$scope.showPage;
        $scope.diaPage=function(target,t,p){
            var tm=1;
            if(t == "first"){/*首页*/
                $scope.diapage=1;
            }else if(t=="last"){/*末页*/  
                $scope.diapage=$scope.diatotalPage;
            }else if(t=="prev"){/*点击上一页数执行的请求*/  
                if(($scope.diapage-1)==0) return;
                $scope.diapage--;
            }else if(t=="next"){/*点击下一页数执行的请求*/
                if($scope.diapage==$scope.diatotalPage) return;
                $scope.diapage++;
                 
             }else if(t == "gogo" || ($(target.target).attr("data-type") == "enter" && target.keyCode == 13)){/*到指定页数执行的请求*/
                $scope.diapageNum=angular.element(".page_angular dl dd span.gogo input.number").val();
                if($scope.diapageNum>$scope.diatotalPage || $scope.diapageNum<1 ) return;
                $scope.diapage = $scope.diapageNum;
            }else if(t == "search"){
                $scope.diapage=1;
            }
           //执行公共请求方法
           $timeout(function(){
             $scope.diahttpPage();
           },tm);
           

        }
        /*定义公共发送请求方法****换页*/
        $scope.diahttpPage=function(){
        	var rowsPage=100;
        	if($scope.rowsPage){
        		rowsPage=$scope.rowsPage;
        	}
            var url=$scope.Page_url+'pageNum/'+$scope.diapage+'/pageSize/'+rowsPage;
            var postdata=serialize('.form-d');            
            $http.post(url,postdata).success(function(data,success){
                if(success=="200"){ 
                	$scope.diatablist=data.list;
                	for(var i=0;i<$scope.diatablist.length;i++){
                		$scope.diatablist[i]['checked']=false;
                		
                	}
                    $scope.diatotalNumber=data.total;
                    $scope.diatotalPage=Math.ceil($scope.diatotalNumber/rowsPage);
                    //$scope.diapageChange();  
                }else{
                    console.log("没有找到数据");
                }
            });
        }

        $scope.diahttpPage();

        
    }
  }
});
//分页弹窗
angular.module('paginationCRO', []).directive('paginationCro', function() {
  return {
    restrict : 'EA',
    replace : true,
    transclude : true,
    templateUrl : project_name+'common/pagination.html',
    controller: function ($scope,$http,serialize,$timeout){
        $scope.page=1;//初始页数 设置为1;
        var pagelength=$scope.showPage;
        $scope.Page=function(target,t,p){
            var tm=1;
            if(t == "first"){/*首页*/
                $scope.page=1;
            }else if(t=="last"){/*末页*/  
                $scope.page=$scope.totalPage;
            }else if(t=="prev"){/*点击上一页数执行的请求*/  
                if(($scope.page-1)==0) return;
                $scope.page--;
            }else if(t=="next"){/*点击下一页数执行的请求*/
                if($scope.page==$scope.totalPage) return;
                $scope.page++;
                 
             }else if(t == "gogo" || ($(target.target).attr("data-type") == "enter" && target.keyCode == 13)){/*到指定页数执行的请求*/
                $scope.pageNum=angular.element(".page_angular dl dd span.gogo input.number").val();
                if($scope.pageNum>$scope.totalPage || $scope.pageNum<1 ) return;
                $scope.page = $scope.pageNum;
            }else if(t == "search"){
                $scope.page=1;
            }
           //执行公共请求方法
           $timeout(function(){
             $scope.httpPage();
           },tm);
           

        }
        /*定义公共发送请求方法****换页*/
        $scope.httpPage=function(){
        	var rowsPage=100;
        	if($scope.rowsPage){
        		rowsPage=$scope.rowsPage;
        	}
            var url=$scope.Page_url+'pageNum/'+$scope.page+'/pageSize/'+rowsPage;
            var postdata=$scope.cropost_data;  
            $http.post(url,postdata).success(function(data,success){
                if(success=="200"){ 
                	$scope.tablist=data.list;
                	for(var i=0;i<$scope.tablist.length;i++){
                		$scope.tablist[i]['checked']=false;              		
                	}
                    $scope.totalNumber=data.total;
                    $scope.totalPage=Math.ceil($scope.totalNumber/rowsPage);
                    
                }else{
                    console.log("没有找到数据");
                }
            });
        }


        $scope.httpPage();

        
    }
  }
});
/*输入框长度验证*/
angular.module('input.maxlength',[]).directive('maxlength',function(){
    return function(scope, element, attrs){
        var max=attrs.maxlength;
        $(element).keyup(function(event) {
           var val=element.val().length;
           if(val>=max){
             return ;
           }          
           var span=element.next('span.maxTips');
           span.html(val+'/'+max); 
        });
        $(element).keydown(function(event) {
           var val=element.val().length;                  
           var span=element.next('span.maxTips');
           span.html(val+'/'+max); 
        });
    };
})
/*设置指定时间*/
angular.module('ui.setspectime', []).factory('setspectime',function () {

    var time=function(t){
        var now=new Date();       
        var tm=now.getTime()+t*24*60*60*1000;
        var lm=new Date(tm);
        var y=lm.getFullYear();
        var m=lm.getMonth()+1;
        var d=lm.getDate();
        return y + '-' + m + '-' +d;   
    }   
    return time;
});     


/*日期指令*/
angular.module('ui.time',[]).directive('uiTime',function(){
    return{
        require: '?ngModel',
        scope: {
            ngModel: '='
        },
        link: function(scope, element, attrs, ngModel) {
            element.on("click",function(){
                WdatePicker({
                    dateFmt:'yyyy-MM-dd',
                    dchanged:function(){
                        scope.$apply(function(){
                            scope.ngModel = $dp.cal.newdate["y"]+"-"+$dp.cal.newdate["M"]+"-"+$dp.cal.newdate["d"];
                        })
                    }
                })
            });
        }
    };
});

/*日期格式化指令 日期戳转为 2016-12-01*/
angular.module('ui.dateFormater',[]).directive('formatDate',function(){
    return function(scope, element, attrs){
        if(attrs.formatDate){
          var html=null;
          var newdata=attrs.formatDate*1;
          var date=new Date(newdata);
          console.log(attrs.formatDate);
          html=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
          element.html(html);
        };
    };
});

/*基于angularjs 导航树 默认*/
angular.module('navTree', []).directive('navTree', function () {
    return {
        restrict : 'EA',
        replace : true,
        transclude : true,
        templateUrl : project_name+'common/navtree.html',
        controller: function ($scope,$cookieStore) {
            /* 一级导航切换 开关*/
            $scope.tree_one_swich=function(t,i,id,html,isLeaf,menuPath,low){
                var status=$scope.treeNodes[i].isExpand;
                for(var a=0;a<$scope.treeNodes.length;a++){
                    $scope.treeNodes[a].isExpand=false;
                    if($scope.treeNodes[a].isLeaf) continue;
                    for(var b=0;b<$scope.treeNodes[a].children.length;b++){
                        $scope.treeNodes[a].children[b].isExpand=false;
                        if($scope.treeNodes[a].children[b].isLeaf) continue;
                        for(var c=0;c<$scope.treeNodes[a].children[b].children.length;c++){
                            $scope.treeNodes[a].children[b].children[c].isExpand=false;
                            if($scope.treeNodes[a].children[b].children[c].isLeaf) continue;
                            for(var d=0;d<$scope.treeNodes[a].children[b].children[c].children.length;d++){
                                $scope.treeNodes[a].children[b].children[c].children[d].isExpand=false;

                            }
                        }
                    }

                }
         
                $scope.treeNodes[i].isExpand=!status;
                 /*判断是否是叶子节点 是执行下面操作*/ 
                if(isLeaf){
                    var objname={id:id,list:[html],active:true};
                    var obj={menuName:html,id:id,active:true,menuPath:menuPath,low:low,t:t};
                     /*判断个数*/
                    if($scope.main_label.length<10){
                    	 var iscuncz=true;
                         /*判断是否存在 存在返回 false*/
                    	 if($scope.main_label.length>0){
                    		for(var j=0; j<$scope.main_label.length; j++) {
                    			$scope.main_label[j].active=false;
                                $scope.main_name[j].active=false;
                                if($scope.main_label[j].id==id){
                                	$scope.main_label[j].active=true;
  		                            $scope.main_name[j].active=true;
  		                            iscuncz=false;
                                }
                               
                             }
                    	 }
                    	 if(iscuncz){
                    		 $scope.main_label.push(obj);
                             $scope.main_name.push(objname); 
                    	 }
                    	 $cookieStore.put('main_label',$scope.main_label);
    	               	 $cookieStore.put('main_name',$scope.main_name);
                    }else{
                        console.log('标签数量超过规定');
                    }   
                }
            }
            /*一级导航复选框操作事件*/
            $scope.tree_one_check=function(t,i,id){
                var status_a=$scope.treeNodes[i].checked;
                /*当前的取反*/
                $scope.treeNodes[i].checked=!status_a;
                for(var b=0;b<$scope.treeNodes[i].children.length;b++){
                    $scope.treeNodes[i].children[b].checked=!status_a; 
                    if(!$scope.treeNodes[i].children[b].isLeaf) break;
                    for(var c=0;c<$scope.treeNodes[i].children[b].children.length;c++){
                        $scope.treeNodes[i].children[b].children[c].checked=!status_a;
                        if(!$scope.treeNodes[i].children[b].children[c].isLeaf) break;
                        for(var d=0;d<$scope.treeNodes[i].children[b].children[c].children.length;d++){
                            $scope.treeNodes[i].children[b].children[c].children[d].checked=!status_a;
                        }
                    }
                }
            }
            
            /* 点击二级导航开关*/
            $scope.tree_two_swich=function(t,i,id,html,isLeaf,menuPath,low){
                var t=$(t);//去当前元素
                var tt=t.closest('ul');
                var a=tt.attr('attr-index')//找到索引
                var texta=tt.attr('attr-name');
                var status=$scope.treeNodes[a].children[i].isExpand;
                
                for(var b=0;b<$scope.treeNodes[a].children.length;b++){
                    $scope.treeNodes[a].children[b].isExpand=false;
                    if(!$scope.treeNodes[a].children[b].isLeaf) continue;
                    for(var c=0;c<$scope.treeNodes[a].children[b].children.length;c++){
                        $scope.treeNodes[a].children[b].children[c].isExpand=false;
                        if(!$scope.treeNodes[a].children[b].children[c].isLeaf) continue;
                        for(var d=0;d<$scope.treeNodes[a].children[b].children[c].children.length;d++){
                            $scope.treeNodes[a].children[b].children[c].children[d].isExpand=false;

                        }
                    }
                } 
                for(var b=0;b<$scope.treeNodes[a].children.length;b++){
                    $scope.treeNodes[a].children[b].isExpand=false;

                }
                $scope.treeNodes[a].children[i].isExpand=!status;
                /*判断是否是叶子节点 是执行下面操作*/ 
                if(isLeaf){
                    var objname={id:id,list:[texta,html],active:true};
                    var obj={menuName:html,id:id,active:true,menuPath:menuPath,low:low,t:t};
                     /*判断个数*/
                    if($scope.main_label.length<10){
                    	var iscuncz=true;
                    	/*判断是否存在 存在返回 false*/
	                   	 if($scope.main_label.length>0){
	                   		for(var j=0; j<$scope.main_label.length; j++) {
	                   			  $scope.main_label[j].active=false;
	                              $scope.main_name[j].active=false;
	                              if($scope.main_label[j].id==id){
	                            	  $scope.main_label[j]=obj;
			                          $scope.main_name[j]=objname;
			                          iscuncz=false;
	                              }
	                         }
	                   	 }
	                   	 if(iscuncz){
	                   		$scope.main_label.push(obj);
	                        $scope.main_name.push(objname);
	                   	 }
	                   	 $cookieStore.put('main_label',$scope.main_label);
		               	 $cookieStore.put('main_name',$scope.main_name);
                    }else{
                        console.log('标签数量超过规定');
                    }   
                }
            }

            $scope.tree_two_check=function(t,i,id){
                var t=$(t);
                var a=t.closest('ul').attr('attr-index');    
                var status_a=$scope.treeNodes[a].children[i].isCheck;                
                $scope.treeNodes[a].children[i].isCheck=!status_a;
                for(var c=0;c<$scope.treeNodes[a].children[i].children.length;c++){   
                    $scope.treeNodes[a].children[i].children[c].isCheck=!status_a;
                    if(!$scope.treeNodes[a].children[i].children[c].isLeaf) break;
                    for(var d=0;d<$scope.treeNodes[a].children[i].children[c].children.length;d++){
                        $scope.treeNodes[a].children[i].children[c].children[d].isCheck=!status_a;
                    }
                }
                /*操作上级元素  将上级父元素选中*/
                for(var b=0;b<$scope.treeNodes[a].children.length;b++){
                    /*如果当前元素被选中  执行操作将上级父元素选中*/
                    if($scope.treeNodes[a].children[b].isCheck==true){
                            $scope.treeNodes[a].isCheck=true;
                            break ;
                    }else{
                        $scope.treeNodes[a].isCheck=false;
                       
                    } 
                }
             
            }

            $scope.tree_three_swich=function(t,i,id,html,isLeaf,menuPath,low){

                var t=$(t);//去当前元素
                var tf=t.closest('ul');
                var tff=tf.parent().parent();
                var b=tf.attr('attr-index');//找到索引
                var a=tff.attr('attr-index');
                var textb=tf.attr('attr-name');//找到索引
                var texta=tff.attr('attr-name');
                var idb=tf.attr('attr-id');//找到索引
                var ida=tff.attr('attr-id');
     
                var status=$scope.treeNodes[a].children[b].children[i].isExpand;
                for(var c=0;c<$scope.treeNodes[a].children[b].children.length;c++){
                    $scope.treeNodes[a].children[b].children[c].isExpand=false;
                    if(!$scope.treeNodes[a].children[b].children[c].isLeaf) continue;
                    for(var d=0;d<$scope.treeNodes[a].children[b].children[c].children.length;d++){
                        $scope.treeNodes[a].children[b].children[c].children[d].isExpand=false;

                    }
                }
                $scope.treeNodes[a].children[b].children[i].isExpand=!status;
                /*判断是否是叶子节点 是执行下面操作*/ 
                if(isLeaf){
                    var objname={id:id,list:[texta,textb,html],active:true};
                    var obj={menuName:html,id:id,active:true,menuPath:menuPath,low:low,t:t};
                     /*判断个数*/
                    if($scope.main_label.length<10){
                    	 var iscuncz=true;
                    	 /*判断是否存在 存在返回 false*/
	                   	 if($scope.main_label.length>0){
	                   		 for(var j=0; j<$scope.main_label.length; j++) {
	                   			 $scope.main_label[j].active=false;
	                             $scope.main_name[j].active=false;
	                             if($scope.main_label[j].id==id){
	                            	  $scope.main_label[j].active=true;
			                          $scope.main_name[j].active=true;
			                          iscuncz=false;
	                             }  
	                         }
	                   	 }
	                   	 if(iscuncz){
	                   		 $scope.main_label.push(obj);
	                         $scope.main_name.push(objname);
	                   	 }
	                   	 $cookieStore.put('main_label',$scope.main_label);
		               	 $cookieStore.put('main_name',$scope.main_name);
                    }else{
                        console.log('标签数量超过规定');
                    }   
                }

            }
            $scope.tree_three_check=function(t,i,id){
                var t=$(t);
                var tt=t.closest('ul');
                var b=tt.attr('attr-index');
                var ttt=tt.parent().parent();
                var a=ttt.attr('attr-index');
                var status_a=$scope.treeNodes[a].children[b].children[i].isCheck;
                $scope.treeNodes[a].children[b].children[i].isCheck=!status_a;
                /*操作下级元素 */
                for(var d=0;d<$scope.treeNodes[a].children[b].children[i].children.length;d++){
                    $scope.treeNodes[a].children[b].children[i].children[d].isCheck=!status_a;
                }
                /*操作上级元素  将上级父元素选中*/
                for(var c=0;c<$scope.treeNodes[a].children[b].children.length;c++){
                	/*如果当前元素被选中  执行操作将上级父元素选中*/
                    if($scope.treeNodes[a].children[b].children[c].isCheck==true){
                            $scope.treeNodes[a].isCheck=true;
                            $scope.treeNodes[a].children[b].isCheck=true;
                            break ;
                    }else{
                        $scope.treeNodes[a].isCheck=false;
                        $scope.treeNodes[a].children[b].isCheck=false;
                    } 
                }
            }

            /*导航四级标题点击事件*/
            $scope.tree_four_swich=function(t,i,id,name,isLeaf,menuPath,low){
                var t=$(t);/*当前元素*/
                var tt=t.closest('ul');/*当前元素上一级 ul*/
                var ttt=tt.parent().parent();/*当前元素上一级 ul*/
                var tttt=ttt.parent().parent();/*当前元素上一级 ul*/
                var c=tt.attr('attr-index');
                var b=ttt.attr('attr-index');
                var a=tttt.attr('attr-index');
                var texta=tttt.attr('attr-name');
                var textb=ttt.attr('attr-name');
                var textc=tt.attr('attr-name');

                var status=$scope.treeNodes[a].children[b].children[c].children[i].isExpand;

                /*选择当前节点选中*/

                for(var d=0;d<$scope.treeNodes[a].children[b].children[c].children.length;d++){
                    $scope.treeNodes[a].children[b].children[c].children[d].isExpand=false;
                }   
                $scope.treeNodes[a].children[b].children[c].children[i].isExpand=!status;

                /*判断个数*/
                var obj={menuName:html,id:id,active:true,menuPath:menuPath,low:low,t:t};
                var objname={id:id,list:[texta,textb,textc,html],active:true};
                if($scope.main_label.length<10){
                	 var iscuncz=true;
                	 /*判断是否存在 存在返回 false*/
	               	 if($scope.main_label.length>0){
	               		for(var j=0; j<$scope.main_label.length; j++) {
	               			  $scope.main_label[j].active=false;
	                          $scope.main_name[j].active=false;
	                          if($scope.main_label[j].id==id){
	                        	  $scope.main_label[j].active=true;
		                          $scope.main_name[j].active=true;
		                          iscuncz=false;
                              }
	                     }
	               	 }
	               	 if(iscuncz){
	               		$scope.main_label.push(obj);
	                    $scope.main_name.push(objname);
	               	 }
	               	 $cookieStore.put('main_label',$scope.main_label);
	               	 $cookieStore.put('main_name',$scope.main_name);
                }else{
                    console.log('标签数量超过规定');
                }   
            }
            $scope.tree_four_check=function(t,i,id){
                var t=$(t);
                var tt=t.closest('ul');
                var c=tt.attr('attr-index');
                var ttt=tt.parent().parent();
                var b=ttt.attr('attr-index');
                var tttt=ttt.parent().parent();
                var a=tttt.attr('attr-index');
                var status_a=$scope.treeNodes[a].children[b].children[c].children[i].isCheck;
                /*当前元素*/               
                $scope.treeNodes[a].children[b].children[c].children[i].isCheck=!status_a;
                /*操作上级元素 */
                for(var d=0;d<$scope.treeNodes[a].children[b].children[c].children.length;d++){
                    /*当前元素上一级*/
                    if($scope.treeNodes[a].children[b].children[c].children[d].isCheck==true){
                            $scope.treeNodes[a].isCheck=true;
                            $scope.treeNodes[a].children[b].isCheck=true;
                            $scope.treeNodes[a].children[b].children[c].isCheck=true;
                            break ;
                    }else{
                        $scope.treeNodes[a].isCheck=false;
                        $scope.treeNodes[a].children[b].isCheck=false;
                        $scope.treeNodes[a].children[b].children[c].isCheck=false;
                        
                    } 
                }
            }
           
        }
    };
});

/*国际化语言转换*/
angular.module('ui.language',[]).directive('ngLanguage',function(){
    return function(scope, element, attrs){
        if(attrs.ngLanguage=='true'){
          var html=null;
          var langcode=user_language;
          if(langcode=='ZH_cn'){
        	  html=attrs.langZh;
          }else if(langcode=='EN'){
        	  html=attrs.langEn; 
          }
          element.html(html);
        };
    };
});

// <!doctype html>
// <html>
// <head>
// <meta charset="utf-8">
// <script type="text/javascript" src="js/jquery-2.1.1.min.js"></script>
// <script type="text/javascript" src="js/angular.min.js"></script>
// <script type="text/javascript" src="js/ZeroClipboard.js"></script>
// </head>
// <body ng-app="app" ng-controller="appcopy">
//     <div ui-copy="{{ha}}" ui-copyback="callback()">点我复制链接{{ha}}</div>
//     <br>
//     <br>
//     <div ui-copy="{{haa}}" ui-copyback="callback()">点我复制指定div内容，比如{{haa}}</div>

//     <div id="main">
//         <p style="color:red;font-size:20px;">我是被复制的html</p>
//     </div>
//     <p contenteditable style="border:solid 1px #333;height:80px; background:#f4f4f4"></p>
// </body>
// </html>
// var app = angular.module('app', ["ui.copy"]);
// app.controller('appcopy',['$scope', function($scope) {
//     $scope.ha = "http://www.baidu.com";
//     $scope.haa = "#main";
//     $scope.callback = function(){
//         alert("复制成功")
//     }
// }]);

angular.module('ui.copy',[]).directive('uiCopy',[function(){
    return{
        scope:{
            uiCopy:"@",
            uiCopyback:"&"
        },
        link: function(scope, element) {
            ZeroClipboard.config({swfPath:'js/ZeroClipboard.swf',forceHandCursor:true});
            var newclip = new ZeroClipboard(element);
            newclip.on("copy", function(e){
                if(scope.uiCopy.indexOf("#")==0||scope.uiCopy.indexOf(".")==0){
                    newclip.setHtml($(scope.uiCopy).html());
                }else{
                    newclip.setText(scope.uiCopy);
                };
                scope.uiCopyback();
            });
        }
    };
}]);
/*table自动下拉*/
angular.module('ui.dTableAutoHeight',[]).directive('dTableAutoHeight',[function(){
    return{
        link: function(scope, element) {
        	console.log(scope.tableshowok);
        	//$scope.tableshowok;
        	setTimeout(function(){
        		var h1=element.width();
        		var h2=element.find('tr').width();
        		var h3=Math.abs(h1-h2);
        		if(h3>2){
        			element.prev().width(h2);
        		};
        	},100);
        	       	
        },
        controller:function(){
        	
        }
    };
}]);
/*table自动下拉*/
angular.module('ui.tableAutoHeight',[]).directive('tableAutoHeight',[function(){
    return{
    	require: '?ngModel',
        scope: {
            ngModel: '='
        },
    	link: function(scope, element,attrs,ngModel) {
    		var body=angular.element(window).height();
        	var area=angular.element('.search-area').outerHeight();/*搜寻条件区高度*/
        	var m_label=25;/*页签高度*/
        	var m_name=38;/*页签下面导航高度*/
        	var header=70;/*头部高度*/
        	var pageing=24+30;/*分页高度*/
    		
    		element.parent('.search-table-package').addClass('vb');
        	setTimeout(function(){
        		var w1=element.find('.head-left ul').width();
        		var hrw=0;
        		element.find('.head-right ul li').each(function(i,n){
        			var liwidth=$(n).width();
        			hrw=hrw+liwidth;
        		});
        		var w2=element.find('.head-right ul').width();
        		var w3=element.parent('.search-table-package').width();
        		var w4=w1+w2;
        		var height=body-header-25-38-area-40-15;
        		element.height(height-30);
        		
    			element.parent('.search-table-package').height(height);
        		if(w3<w4){
        			element.find('.body-inner').height(height-80);
        			element.addClass('scroll');
        			element.find('.head-right').width(hrw+100);
        			element.find('.body-inner').width(hrw+100);
        		}else{
        			element.find('.body-inner').height(height-63);
        		};
        		element.parent('.search-table-package').removeClass('vb');
        	},400);
        	
        	
        }
    };
}]);

function autoWidth(){
	var stitle=$('.sortable li');
	$('.sortable li').each(function(i,n){
		var lis='.body-right .tablist .tablist-'+i;
		var list=[];
		$(lis).each(function(i,n){
			var width=$(n).width();
		    list.push(width);
		});
		var max_w=Math.max.apply(null,list);
	    var thw=$(this).width();
	    if(thw>max_w){
	    	max_w=thw;
	    };
	    $(this).width(max_w);
		$(lis).each(function(i,n){
			$(n).width(max_w);
		});
		
		

		
	});
	
	
}







