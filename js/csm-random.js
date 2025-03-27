$(function () {
  var run = 0, // 运行状态标记
    heading = $("h1"),
    timer; // 定时器变量

  // 开始/停止按钮点击事件
  $("#start").click(function () {
    // 处理食物列表数据
    var list = $("#list")
      .val()
      .replace(/ +/g, " ") // 合并多个空格
      .replace(/^ | $/g, "") // 去除首尾空格
      .split(" "); // 转为数组
    
    if (!run) { // 开始随机选择
      heading.html(heading.html().replace("吃这个！", "吃什么？"));
      $(this).val("停止");
      
      // 设置定时器随机选择食物
      timer = setInterval(function () {
        var r = Math.ceil(Math.random() * list.length),
          food = list[r - 1];
        $("#what").html(food);
        
        // 创建随机漂浮文字效果
        var rTop = Math.ceil(Math.random() * $(document).height()),
          rLeft = Math.ceil(Math.random() * ($(document).width() - 50)),
          rSize = Math.ceil(Math.random() * (37 - 14) + 14);
          
        $("<span class='temp'></span>")
          .html(food)
          .hide()
          .css({
            top: rTop,
            left: rLeft,
            color: "rgba(0,0,0,." + Math.random() + ")",
            fontSize: rSize + "px",
          })
          .appendTo("body")
          .fadeIn("slow", function () {
            $(this).fadeOut("slow", function () {
              $(this).remove();
            });
          });
      }, 50); // 50毫秒更新一次
      run = 1;
    } else { // 停止随机选择
      heading.html(heading.html().replace("吃什么？", "吃这个！"));
      $(this).val("不行，换一个");
      clearInterval(timer);
      run = 0;
    }
  });

  // 回车键触发开始/停止
  document.onkeydown = function enter(e) {
    var e = e || event;
    if (e.keyCode == 13) $("#start").trigger("click");
  };

  // 限制点击次数功能
  $i = 0;
  $("#start").click(function () {
    $i++;
    if ($i >= 6) { // 点击超过6次显示警告
      $("#start").hide();
      $("#stop").show();
    }
  });
  
  // 停止按钮点击事件
  $("#stop").click(function () {
    alert("这么作？今天别吃了！");
    $(this).hide();
  });
});