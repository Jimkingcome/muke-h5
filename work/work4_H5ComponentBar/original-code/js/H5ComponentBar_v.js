/* 垂直柱图组件对象 */

var H5ComponentBar_v =function ( name, cfg ) {

  //  任务二：(1) 完成 component 的初始化定义（补全 var component = ???）
    var component = new H5ComponentBar(name, cfg);
  //  任务二：(2) 完成 width 每个柱图中项目的宽度计算。（补全 var width = ???）
     var width = (100/cfg.data.length) >> 0; // >> 表示 1、所有非数值转换成0， 2、所有大于等于 0 等数取整数部分
     component.find('.line').width( width + '%');
   
  $.each( component.find('.rate') ,function(index,item){
      var w = $(item).css('width');
      //  任务二：(3) 把进度区的宽度重设为高度，并且取消原来的宽度
       // console.log (this);
      $(item).height(w).width('');
  });

  $.each( component.find('.per'),function(){
      //  任务二：(4) 重新调整 DOM 结构，把百分比数值(.per)添加到 进度区 (.rate)中，和色块元素(.bg)同级。提示，获得 进度区 元素：$(this).prev()
      $(this).appendTo($(this).prev()) ;
      //console.log($(this));
  })

  return component;
}