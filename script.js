var tag = 0
      var totalsl = 7
      var arr = ["primary","secondary","success","danger","warning","info","dark"]
      var arr2=["早餐","午餐","晚餐","交通","食物","文具","其他"]
      var data;
      var sum = 0
      var ta
      var wr
      var re
      var sid=[]
      
      if ('serviceWorker' in navigator) {
          navigator.serviceWorker.register('/sw.js')
          .then(reg => console.log('SW registered!', reg))
          .catch(err => console.log('Error!', err));
      }
      
      $( document ).ready(function() {
        console.log( "ready!" );
        var win =  new URL(window.location.href).searchParams;
        var cou = 0
        for (let pair of win.entries()) {
          if( pair[0] == "wr"){
            wr = pair[1]
          }else if(pair[0] == "re"){
            re = pair[1]
          }else{
            var ver = "s0"
            while(pair[0] == ver){
              
              sid.push(pair[1])
              cou++
              ver = "s" + cou
            }
          }
        }
        $("#resrc").val(re)
        $("#wrsrc").val(wr)
        $("#datasrc").val(sid[0])
        if(wr == ""|| re == "" || sid.length == 0){
          sw("datamiss","loading")
        }else{
          init()
        }
        
      });

      function go(){
        window.location.replace($('#urlgenerate').val())
      }
      
      function init3(a){
        var str = ""
        if(a == "早餐"){
          str = '<span class="badge badge-primary">' + a + '</span>'
        }else if(a == "午餐"){
          str = '<span class="badge badge-secondary">' + a + '</span>'
        }else if(a == "晚餐"){
          str = '<span class="badge badge-success">' + a + '</span>'
        }else if(a == "交通"){
          str = '<span class="badge badge-danger">' + a + '</span>'
        }else if(a == "食物"){
          str = '<span class="badge badge-warning">' + a + '</span>'
        }else if(a == "文具"){
          str = '<span class="badge badge-info">' + a + '</span>'
        }else if(a == "其他"){
          str = '<span class="badge badge-dark">' + a + '</span>'
        }else if(a == "收入"){
          str = '<svg width="1.8em" height="1.8em" viewBox="0 0 16 16" class="bi bi-box-arrow-in-down-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M14.5 13a1.5 1.5 0 0 1-1.5 1.5H3A1.5 1.5 0 0 1 1.5 13V8a.5.5 0 0 1 1 0v5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H9a.5.5 0 0 1 0-1h4A1.5 1.5 0 0 1 14.5 3v10z"/><path fill-rule="evenodd" d="M4.5 10a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5V5a.5.5 0 0 0-1 0v4.5H5a.5.5 0 0 0-.5.5z"/><path fill-rule="evenodd" d="M10.354 10.354a.5.5 0 0 0 0-.708l-8-8a.5.5 0 1 0-.708.708l8 8a.5.5 0 0 0 .708 0z"/></svg>'
        }else if(a == "支出"){
          str = '<svg width="1.8em" height="1.8em" viewBox="0 0 16 16" class="bi bi-box-arrow-up-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M14.5 13a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 13V9a.5.5 0 0 1 1 0v4a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V5a.5.5 0 0 0-.5-.5H9a.5.5 0 0 1 0-1h4A1.5 1.5 0 0 1 14.5 5v8zm-7-11a.5.5 0 0 0-.5-.5H2a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 1 0V2.5H7a.5.5 0 0 0 .5-.5z"/><path fill-rule="evenodd" d="M1.646 1.646a.5.5 0 0 0 0 .708l8 8a.5.5 0 0 0 .708-.708l-8-8a.5.5 0 0 0-.708 0z"/></svg>'
        }
        return str
      }
      
      function init2(a){
        $("#detailarea").html("")
        var count = 0
        if(a == "按日期新到舊"){
          $("#dropdownMenu2").html('<svg width="1em" height="1em" viewbox="0 0 16 16" class="bi bi-funnel" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z"/></svg>&nbsp;' + a)
          for(var i = 0;i<data.length;i++){
            var j = data.length-1-i
            var ti = data[j][0].split("T");
            var ty = init3(data[j][4])
            if(data[j][1] == "支出"){
              count++
              //ty = '<svg width="1.8em" height="1.8em" viewBox="0 0 16 16" class="bi bi-box-arrow-up-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M14.5 13a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 13V9a.5.5 0 0 1 1 0v4a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V5a.5.5 0 0 0-.5-.5H9a.5.5 0 0 1 0-1h4A1.5 1.5 0 0 1 14.5 5v8zm-7-11a.5.5 0 0 0-.5-.5H2a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 1 0V2.5H7a.5.5 0 0 0 .5-.5z"/><path fill-rule="evenodd" d="M1.646 1.646a.5.5 0 0 0 0 .708l8 8a.5.5 0 0 0 .708-.708l-8-8a.5.5 0 0 0-.708 0z"/></svg>'
              $("#detailarea").append('<tr class="table-warning"><td>' + ti[0] + '</td><td>' + ty + '</td><td>' + data[j][2] + '</td><td>' + data[j][3] + '</td></tr>')
            }else{
              count++
              //ty = '<svg width="1.8em" height="1.8em" viewBox="0 0 16 16" class="bi bi-box-arrow-in-down-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M14.5 13a1.5 1.5 0 0 1-1.5 1.5H3A1.5 1.5 0 0 1 1.5 13V8a.5.5 0 0 1 1 0v5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H9a.5.5 0 0 1 0-1h4A1.5 1.5 0 0 1 14.5 3v10z"/><path fill-rule="evenodd" d="M4.5 10a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5V5a.5.5 0 0 0-1 0v4.5H5a.5.5 0 0 0-.5.5z"/><path fill-rule="evenodd" d="M10.354 10.354a.5.5 0 0 0 0-.708l-8-8a.5.5 0 1 0-.708.708l8 8a.5.5 0 0 0 .708 0z"/></svg>'
              $("#detailarea").append('<tr class="table-success"><td>' + ti[0] + '</td><td>' + ty + '</td><td>' + data[j][2] + '</td><td>' + data[j][3] + '</td></tr>')
            }
          }
        }else if(a == "按日期舊到新"){
          $("#dropdownMenu2").html('<svg width="1em" height="1em" viewbox="0 0 16 16" class="bi bi-funnel" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z"/></svg>&nbsp;' + a)
          for(var j = 0;j<data.length;j++){
            var ti = data[j][0].split("T");
            var ty = init3(data[j][4])
            if(data[j][1] == "支出"){
              count++
              //ty = '<svg width="1.8em" height="1.8em" viewBox="0 0 16 16" class="bi bi-box-arrow-up-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M14.5 13a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 13V9a.5.5 0 0 1 1 0v4a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V5a.5.5 0 0 0-.5-.5H9a.5.5 0 0 1 0-1h4A1.5 1.5 0 0 1 14.5 5v8zm-7-11a.5.5 0 0 0-.5-.5H2a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 1 0V2.5H7a.5.5 0 0 0 .5-.5z"/><path fill-rule="evenodd" d="M1.646 1.646a.5.5 0 0 0 0 .708l8 8a.5.5 0 0 0 .708-.708l-8-8a.5.5 0 0 0-.708 0z"/></svg>'
              $("#detailarea").append('<tr class="table-warning"><td>' + ti[0] + '</td><td>' + ty + '</td><td>' + data[j][2] + '</td><td>' + data[j][3] + '</td></tr>')
            }else{
              count++
              //ty = '<svg width="1.8em" height="1.8em" viewBox="0 0 16 16" class="bi bi-box-arrow-in-down-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M14.5 13a1.5 1.5 0 0 1-1.5 1.5H3A1.5 1.5 0 0 1 1.5 13V8a.5.5 0 0 1 1 0v5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H9a.5.5 0 0 1 0-1h4A1.5 1.5 0 0 1 14.5 3v10z"/><path fill-rule="evenodd" d="M4.5 10a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5V5a.5.5 0 0 0-1 0v4.5H5a.5.5 0 0 0-.5.5z"/><path fill-rule="evenodd" d="M10.354 10.354a.5.5 0 0 0 0-.708l-8-8a.5.5 0 1 0-.708.708l8 8a.5.5 0 0 0 .708 0z"/></svg>'
              $("#detailarea").append('<tr class="table-success"><td>' + ti[0] + '</td><td>' + ty + '</td><td>' + data[j][2] + '</td><td>' + data[j][3] + '</td></tr>')
            }
          }
        }else if(a == "收入" || a == "早餐" || a == "午餐" || a == "晚餐" || a == "交通" || a == "食物" || a == "文具" || a == "其他"){
          init3(a)
          $("#dropdownMenu2").html('<svg width="1em" height="1em" viewbox="0 0 16 16" class="bi bi-funnel" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z"/></svg>&nbsp;' + a)
          for(var i = 0;i<data.length;i++){
            var j = data.length-1-i
            var ti = data[j][0].split("T");
            var ty = init3(data[j][4])
            if(data[j][4] == a && a != "收入" ){
              count++
              //ty = '<svg width="1.8em" height="1.8em" viewBox="0 0 16 16" class="bi bi-box-arrow-up-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M14.5 13a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 13V9a.5.5 0 0 1 1 0v4a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V5a.5.5 0 0 0-.5-.5H9a.5.5 0 0 1 0-1h4A1.5 1.5 0 0 1 14.5 5v8zm-7-11a.5.5 0 0 0-.5-.5H2a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 1 0V2.5H7a.5.5 0 0 0 .5-.5z"/><path fill-rule="evenodd" d="M1.646 1.646a.5.5 0 0 0 0 .708l8 8a.5.5 0 0 0 .708-.708l-8-8a.5.5 0 0 0-.708 0z"/></svg>'
              $("#detailarea").append('<tr class="table-warning"><td>' + ti[0] + '</td><td>' + ty + '</td><td>' + data[j][2] + '</td><td>' + data[j][3] + '</td></tr>')
            }else if(data[j][4] == a && a == "收入"){
              count++
              //ty = '<svg width="1.8em" height="1.8em" viewBox="0 0 16 16" class="bi bi-box-arrow-in-down-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M14.5 13a1.5 1.5 0 0 1-1.5 1.5H3A1.5 1.5 0 0 1 1.5 13V8a.5.5 0 0 1 1 0v5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H9a.5.5 0 0 1 0-1h4A1.5 1.5 0 0 1 14.5 3v10z"/><path fill-rule="evenodd" d="M4.5 10a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5V5a.5.5 0 0 0-1 0v4.5H5a.5.5 0 0 0-.5.5z"/><path fill-rule="evenodd" d="M10.354 10.354a.5.5 0 0 0 0-.708l-8-8a.5.5 0 1 0-.708.708l8 8a.5.5 0 0 0 .708 0z"/></svg>'
              $("#detailarea").append('<tr class="table-success"><td>' + ti[0] + '</td><td>' + ty + '</td><td>' + data[j][2] + '</td><td>' + data[j][3] + '</td></tr>')
            }
          }
        }else if(a == "支出"){
          $("#dropdownMenu2").html('<svg width="1em" height="1em" viewbox="0 0 16 16" class="bi bi-funnel" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z"/></svg>&nbsp;' + a)
          for(var i = 0;i<data.length;i++){
            var j = data.length-1-i
            var ti = data[j][0].split("T");
            var ty = init3(data[j][4])
            if(data[j][1] == a){
              count++
              //ty = '<svg width="1.8em" height="1.8em" viewBox="0 0 16 16" class="bi bi-box-arrow-up-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M14.5 13a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 13V9a.5.5 0 0 1 1 0v4a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V5a.5.5 0 0 0-.5-.5H9a.5.5 0 0 1 0-1h4A1.5 1.5 0 0 1 14.5 5v8zm-7-11a.5.5 0 0 0-.5-.5H2a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 1 0V2.5H7a.5.5 0 0 0 .5-.5z"/><path fill-rule="evenodd" d="M1.646 1.646a.5.5 0 0 0 0 .708l8 8a.5.5 0 0 0 .708-.708l-8-8a.5.5 0 0 0-.708 0z"/></svg>'
              $("#detailarea").append('<tr class="table-warning"><td>' + ti[0] + '</td><td>' + ty + '</td><td>' + data[j][2] + '</td><td>' + data[j][3] + '</td></tr>')
            }
          }
        }else{
          $("#detailarea").append('<tr><td colspan="5" style="text-align: center;">列表無內容</td></tr>')
        }
        if(count == 0){
          $("#detailarea").append('<tr><td colspan="5" style="text-align: center;">列表無內容</td></tr>')
        }
        sw('table','menu')
      }
      
      function init(){
        var parameter={
            uid:sid[0]
          }
        $.ajax({ 
            type: "get", 
            url: re, 
            data: parameter, 
            dataType: "JSON", 
            success: function (res) {
              sum = 0
              console.log(res)
              if(res[0][0] == "no data"){
                sw("initmenu","loading")
              }else{
                data = res
                var lo
                if(res.length >3){
                  lo = 3
                }else{
                  lo = res.length
                }
                for(var i = 0;i<res.length;i++){
                  if(i<3){
                    var j = res.length-1-i
                    var ti = res[j][0].split("T");
                    var strr = init3(res[j][4])
                    if(res[j][1] == "支出"){
                      $("#listarea").append('<tr class="table-warning"><td>' + ti[0] + '</td><td>' + strr + '</td><td>' + res[j][2] + '</td><td>' + res[j][3] + '</td></tr>')
                    }else{
                      $("#listarea").append('<tr class="table-success"><td>' + ti[0] + '</td><td>' + strr + '</td><td>' + res[j][2] + '</td><td>' + res[j][3] + '</td></tr>')
                    }
                  }
                  sum = sum + res[i][3]
                }
                $("#remain").html('<h3><span class="badge badge-light">$' + sum + '</span></h3>')
                sw("menu","loading")
              }
              
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
              sw("oops","loading")
              $("#errordisplay").html("<h4>錯誤位置:讀取階段<br>錯誤內容:" + XMLHttpRequest.responseText + "</h4>")
               //alert(XMLHttpRequest.responseText)
            }
          });
          //14xeLQsPjrD14YWaMBf4iMVnSYUH81jZpLOm-Drme_HQ
      }
      
      function writed(a){
        if($("#time").val() == "" || $("#item").val() == "" || $("#count").val() == ""){
          alert("nope")
        }else{
            sw("loading","submitp")
          var parameter={
            time:$("#time").val(),
            type:$("#type").val(),
            item:$("#item").val(),
            count:$("#count").val(),
            tag:ta
          }
          if(a == "支出"){
            parameter.count = 0 - Number(parameter.count)
          }
          if(a == "收入"){
            parameter.tag = "收入"
          }
          if(ta == "" && a == "支出"){
            parameter.tag = "其他"
          }
          $.ajax({ 
            type: "get", 
            url: wr, 
            data: parameter, 
            dataType: "JSON", 
            success: function (response) {
              console.log(response);
              $("#listarea").html("")
              init()
            } ,
            error: function(XMLHttpRequest, textStatus, errorThrown) {
              sw("oops","loading")
              $("#errordisplay").html("<h4>錯誤位置:寫入階段<br>錯誤內容:" + XMLHttpRequest.responseText + "</h4>")
               //alert(XMLHttpRequest.responseText)
            }
          });
        }
      }
      
      function sub(a,b){
        ta = ""
        
        if(a == "支出"){
          $("#tagarea").attr("style","overflow: auto;white-space: nowrap;")
        }else if(a == "收入"){
          $("#tagarea").attr("style","overflow: auto;white-space: nowrap; display:none")
        }
        if(b == "0"){
          $("#subheader").html(a + '<button type="button" class="btn btn-secondary float-right" onclick="sw(\'menu\',\'submitp\')"><svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-house-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 3.293l6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/><path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/></svg></button>')
          sw("submitp","menu")
        }else{
          $("#subheader").html(a + '<button type="button" class="btn btn-secondary float-right" onclick="sw(\'initmenu\',\'submitp\')"><svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-house-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 3.293l6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/><path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/></svg></button>')
          sw("submitp","initmenu")
        }
        $("#type").val(a)
      }
      
      function sw(a,b){
        $('#' + a).tab("show")
        $('#' + b).attr("class","tab-pane fade")
        
      }
      
      function selecttag(a,id,b){
        console.log(id)
        for(var i = 0;i<totalsl;i++){
          var str = "sle" + i
          if(str == id){
            $("#sle"+i).attr("class","btn btn-" + a)
          }else{
            $("#sle"+i).attr("class","btn btn-outline-" + arr[i])
          }
        }
        ta = b
      }

function crurl(){
  if($("#wrsrc").val() == "" ||  $("#resrc") == "" || $("#datasrc") == ""){
    alert("資料不完整")
  }else{
    let githubURL = new URL(window.location.href);
    var searchParams = new URLSearchParams("?wr=" + $("#wrsrc").val() + "&re=" + $("#resrc").val() + "&s0=" + $("#datasrc").val());
    githubURL.search = searchParams;
    //alert(githubURL.href) // "https://github.com/search?q=react&type=Code"
    $("#urlgenerate").val(githubURL.href)
    $('#myModal').modal('toggle')
  }
}
      
