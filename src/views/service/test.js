$(document).ready(function() {
  $('#pid').blur(function() {
    var id = $.trim($('#pid').val())
    $('#id_img').val('N')
    $('#pid_check').show()

    if (id.length >= 1) {
      var reg = /^[A-Za-z0-9]+$/
      if (!reg.test(id)) {
        $('#pid_check').html('5~14자의 영문, 숫자 조합만 사용가능합니다.')
        $('#pid_check').removeClass('good')
        return
      }
      $.ajax({
        type: 'POST',
        url: 'id_check.asp', //이페이지에서 중복체크를 한다
        data: 'user_id=' + id, //test.asp에 id 값을 보낸다
        cache: false,
        async: false,
        success: function(data) {
          if (data == 'true') {
            //사용가능
            $('#pid_check').html('사용 가능한 아이디입니다.')
            $('#pid_check').addClass('good')
            $('#id_img').val('Y')
          } else {
            if (data == 'min') {
              //사용가능
              $('#pid_check').html('아이디는 5~14자리로 입력해 주세요.')
              $('#pid_check').removeClass('good')
              return
            } else {
              $('#pid_check').html('이미 사용중이거나 탈퇴한 아이디로 사용하실 수 없습니다.')
              $('#pid_check').removeClass('good')
              return
            }
          }
        },
        error: function(jqXHR, textStatus, errorThrown) {
          alert('시스템오류')
        },
      })
    }

    if (id == '') {
      $('#pid_check').hide()
    }
  })

  $('#passwd1').blur(function() {
    var userid = $.trim($('#pid').val())
    var passwd1 = $.trim($('#passwd1').val())
    var passwd2 = $.trim($('#passwd2').val())
    $('#passwd1_check').show()

    if (passwd1.length >= 1) {
      checkPassWord(userid, passwd1, passwd2)
    }

    if (passwd1 == '') {
      $('#passwd1_check').hide()
    }
  })

  $('#passwd2').blur(function() {
    var passwd1 = $.trim($('#passwd1').val())
    var passwd2 = $.trim($('#passwd2').val())
    $('#passwd2_check').show()

    $('#pwd_img').val('N')

    if (passwd2.length >= 1) {
      if (passwd1 != passwd2) {
        $('#passwd2_check').html('입력하신 비밀번호와 비밀번호확인이 일치하지 않습니다.')
        $('#passwd2_check').removeClass('good')
        return
      }
      $('#passwd2_check').html('')
      $('#pwd_img').val('Y')
    }

    if (passwd2 == '') {
      $('#passwd2_check').hide()
    }
  })

  $('.jGuide').blur(function() {
    var thisValue = $.trim($(this).val())
    var thisID = $.trim($(this).attr('ID'))

    if (thisID == 'email2') {
      thisID = 'email1'
    }

    if (thisValue == '') {
      $('#' + thisID + '_check').hide()
    }
  })

  $('#injng_send').click(function() {
    $('#tt').removeClass('good')
    if (bInjng) {
      var msg = '인증번호를 전송하였습니다.\n인증번호를 새로 받으시겠습니까?'
      if (confirm(msg)) {
        clearInterval(interval)
        bInjng = false
      } else {
        return
      }
    }

    $('#sms_img').val('N')

    var handphone = $('#hp').val()
    if (!(handphone.length == 10 || handphone.length == 11)) {
      alert('올바른 휴대폰 번호를 입력해 주세요.')
      $('#hp').focus()
      return
    }

    var strHpHead = '010,011,016,017,018,019'
    if (strHpHead.indexOf(handphone.substring(0, 3)) < 0) {
      alert('올바른 휴대폰 번호를 입력해 주세요.')
      $('#hp').focus()
      return
    }

    $.ajax({
      type: 'POST',
      url: 'phone_cert_sms.asp', //이페이지에서 중복체크를 한다
      data: 'handphone=' + handphone, //test.asp에 id 값을 보낸다
      cache: false,
      async: false,
      success: function(data) {
        //				<% If Request.ServerVariables("REMOTE_HOST") = "211.36.51.88" Then %>
        //alert(data);
        $('#injngCheck').show()
        doingtimer('')
        $('#injng_num').attr('readonly', false)
        bInjng = true //인증번호 입력 제한 시간 시작
        $('#injng_num').focus()
        //				<% else %>
        //					 if( data =="true") //사용가능
        //					 {
        //						alert("인증번호가 전송되었습니다");
        //						$("#injngCheck").show();
        //						doingtimer("");
        //						bInjng = true;		//인증번호 입력 제한 시간 시작
        //						$("#injng_num").focus();
        //					 }else
        //					 {
        //						alert("전송 실패");
        //					 }
        //				<% End If %>
      },
    })
  })

  $('#injng_chk').click(function() {
    if (bInjng) {
      var hp_injng = $('#hp').val()
      var injng_num = $('#injng_num').val()

      if (injng_num.length == '6') {
        if (hp_injng == '') {
          alert('휴대폰 번호를 입력해 주세요.')
          $('#hp').focus()
          return
        }
        $.ajax({
          type: 'POST',
          url: 'phone_cert_ing.asp',
          data: 'handphone=' + hp_injng + '&hp_chk=' + injng_num + '&ID_TYPE=P',
          cache: false,
          async: false,
          success: function(data) {
            if (data == 'true') {
              //사용가능
              $('#sms_img').val('Y')
              //alert("인증되었습니다.");
              $('#hp').attr('readonly', true)
              $('#injng_num').attr('readonly', true)
              clearInterval(interval)
              bInjng = false
              $('#tt')
                .html('인증 완료되었습니다.')
                .addClass('good')
            } else if (data == 'dub') {
              alert('이미 가입된 휴대폰 번호입니다.')
              location.href = '/member/member_new/already_member.asp'
              $('#w_form').attr('action', '/member/member_new/already_member.asp')
              $('#w_form').submit()
              return
            } else if (data == 'hp_not') {
              alert('인증번호를 다시 받아주세요.')
              return
            } else {
              alert('인증이 실패하였습니다. 인증번호를 확인해 주세요.')
              return
            }
          },
        })
        true
      } else {
        alert('인증이 실패하였습니다. 인증번호를 확인해 주세요.')
        return
      }
    } else {
      alert(
        '휴대폰 입력 후 [인증] 버튼을 클릭하시면 인증번호가 전송됩니다.\n인증번호 입력 제한시간이 초과되었으면, 다시 [인증] 버튼을 클릭해 주세요.',
      )
      return
    }
  })

  $('#birthday').blur(function() {
    var birthday = $.trim($('#birthday').val())
    $('#birthday_check').show()

    if (birthday.length > 0) {
      if (birthday.length < 8) {
        $('#birthday_check').html('정확한 생년월일을 입력해 주세요.')
        $('#birthday_check').removeClass('good')
        $('#birthday').val('')
        return
      } else {
        var date_pattern = /^(19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[0-1])$/
        if (!date_pattern.test($('#birthday').val())) {
          $('#birthday_check').html('잘못된 생년월일 표기입니다.')
          $('#birthday_check').removeClass('good')
          $('#birthday').val('')
          return
        } else {
          $('#birthday_check').hide()
        }
      }
    }

    if (birthday == '') {
      $('#birthday_check').hide()
    }
  })

  $('#allChk2').click(function() {
    if ($('#allChk2').is(':checked')) {
      $('.jAgreeItem').prop('checked', true)
    } else {
      $('.jAgreeItem').prop('checked', false)
    }
  })
})

var bInjng = false
function doingtimer(mm) {
  //초를나타내는 변수
  var sec = 180

  var $timer = $('#tt')
  interval = setInterval(function() {
    sec = sec - 1
    $timer.html(setSecondStr(sec))
    if (sec == 0) {
      clearInterval(interval)
      alert('인증번호 입력 제한시간이 초과 되었습니다.\n\n입력이 초기화 됩니다.')
      $('#injng_num').val('')
      bInjng = false
    }
  }, 1000)
}

function setSecondStr(value) {
  var strSecond = value + ''
  var seconds = new Number(strSecond)
  var days = seconds / 86400 // 86400으로 나눈 몫이 일수
  var hours = parseInt(seconds / 3600, 10) // 3600으로 나눈 몫이 시간
  seconds = parseInt(seconds % 3600, 10) // 3600으로 나눈 나머지 초
  var minutes = parseInt(seconds / 60, 10) // 60으로 나눈 몫이 분
  seconds = parseInt(seconds % 60, 10) // 60으로 나눈 나머지가 초

  if (minutes.toString().length == 1) {
    minutes = '0' + minutes
  }

  if (seconds.toString().length == 1) {
    seconds = '0' + seconds
  }
  return minutes + ':' + seconds
}

//텍스트 입력 길이 체크
function fc_chk_byte(obj_name, max_length) {
  var ls_str = obj_name.value // 이벤트가 일어난 컨트롤의 value 값
  var li_str_len = ls_str.length // 전체길이
  var li_max = max_length // 제한할 글자수 크기
  var i = 0 // for문에 사용
  var li_byte = 0 // 한글일경우는 2 그밗에는 1을 더함
  var li_len = 0 // substring하기 위해서 사용
  var ls_one_char = '' // 한글자씩 검사한다
  var ls_str2 = '' // 글자수를 초과하면 제한할수 글자전까지만 보여준다.

  for (i = 0; i < li_str_len; i++) {
    // 한글자추출
    ls_one_char = ls_str.charAt(i)

    // 한글이면 2를 더한다.
    if (escape(ls_one_char).length > 4) {
      li_byte = li_byte + 2
    } else {
      // 그외의 경우는 1을 더한다.
      li_byte++
    }

    // 전체 크기가 li_max를 넘지않으면
    if (li_byte <= li_max) {
      li_len = i + 1
    }
  }

  // 전체길이를 초과하면
  if (li_byte > li_max) {
    alert(li_max + 'byte를 초과 입력할수 없습니다.')
    ls_str2 = ls_str.substr(0, li_len)
    obj_name.value = ls_str2
    $(obj_name)
      .next()
      .children()
      .text(cal_length(ls_str2))
  }
  $(obj_name)
    .next()
    .children()
    .text(cal_length(ls_str))
}

//텍스트 입력 길이 체크
function cal_length(val) {
  var temp_estr = escape(val)
  var s_index = 0
  var e_index = 0
  var temp_str = ''
  var cnt = 0

  // 문자열 중에서 유니코드를 찾아 제거하면서 갯수를 센다.
  while ((e_index = temp_estr.indexOf('%u', s_index)) >= 0) {
    // 제거할 문자열이 존재한다면
    temp_str += temp_estr.substring(s_index, e_index)
    s_index = e_index + 6
    cnt++
  }

  temp_str += temp_estr.substring(s_index)
  temp_str = unescape(temp_str) // 원래 문자열로 바꾼다.

  // 유니코드는 2바이트 씩 계산하고 나머지는 1바이트씩 계산한다.
  return cnt * 2 + temp_str.length + ''
}

//숫자만 추출
function getNumber(val) {
  var s, c
  var ret = ''

  if (val.length == 0) return ''

  s = val.toUpperCase()
  for (var n = 0; n < s.length; n++) {
    c = s.charAt(n)

    if (c >= '0' && c <= '9') ret += c
  }
  return ret
}

function checkPassWord(ObjUserID, ObjUserPassWord, objUserPassWordRe) {
  $('#pwd_img').val('N')

  if (ObjUserPassWord.length < 8) {
    $('#passwd1_check').html('비밀번호는 8~12자리로 입력해 주세요.')
    $('#passwd1_check').removeClass('good')
    return
  }
  if (
    !ObjUserPassWord.match(
      /([a-zA-Z0-9].*[!,@,#,$,%,^,*,?,_,~])|([!,@,#,$,%,^,*,?,_,~].*[a-zA-Z0-9])/,
    )
  ) {
    $('#passwd1_check').html('비밀번호는 문자, 숫자, 특수문자(!@#$%^*의 조합으로 입력해 주세요.')
    $('#passwd1_check').removeClass('good')
    return
  }
  if (ObjUserPassWord.indexOf(ObjUserID) > -1) {
    $('#passwd1_check').html('비밀번호에 아이디를 사용할 수 없습니다.')
    $('#passwd1_check').removeClass('good')
    return
  }
  $('#passwd1_check').html('사용가능한 비밀번호입니다.')
  $('#passwd1_check').addClass('good')
}

function mail_select() {
  var selval = $('#mail_list').val()
  if (selval == '') {
    $('#email2').val('')
    $('#email2').focus()
  } else {
    $('#email2').val(selval)
    email_checkok()
  }
}

function email_check() {
  var email1 = $('#email1').val()
  var email2 = $('#email2').val()
  var email = email1 + '@' + email2

  var regEmail = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
  if (!regEmail.test(email)) {
    alert('이메일 주소가 유효하지 않습니다.')
    return
  }
  $('#email_img').val('Y')
}

var strOptHK = ''
var strOptHW = ''
function getHunjangData() {
  var datastring = ''
  var targeturl = '/api/code.asp'
  $.ajax({
    type: 'POST',
    async: true, //순서가 중요할 때는 동기식으로 바꿔준다.
    url: targeturl,
    data: datastring,
    dataType: 'json',
    success: function(data) {
      var cookie_value = getCookie('EVENT_COOKIE_USER')
      var nDataLength
      if (data.HK) {
        //학원유형
        nDataLength = data.HK.length
        if (nDataLength > 0) {
          var arrHKJSON = []
          for (var i = 0; i < nDataLength; i++) {
            arrHKJSON[i] = [data.HK[i].td_code, data.HK[i].td_name]
          }

          strOptHK = '<option value="">선택</option>'
          for (var i = 0; i < arrHKJSON.length; i++) {
            strOptHK += '<option value="' + arrHKJSON[i][0] + '"'
            strOptHK += '>' + arrHKJSON[i][1] + '</option>'
          }
          $('#kind0').html(strOptHK)
          if (cookie_value == '1') {
            $('#kind0').val('99')
          }
        }
      }
      if (data.HT) {
        // 교육대상 코드
        nDataLength = data.HT.length
        if (nDataLength > 0) {
          var strOpt = '<option value="">선택</option>'
          for (var i = 0; i < nDataLength; i++) {
            arrHKJSON[i] = [data.HT[i].td_code, data.HT[i].td_name]

            strOpt += '<option value="' + data.HT[i].td_code + '"'
            strOpt += '>' + data.HT[i].td_name + '</option>'
          }
          $('#Target').html(strOpt)
          if (cookie_value == '1') {
            $('#Target').val('08')
          }
        }
      }
      if (data.HW) {
        //과목코드
        nDataLength = data.HW.length
        if (nDataLength > 0) {
          strOptHW = '<option value="">선택</option>'
          for (var i = 0; i < nDataLength; i++) {
            arrHKJSON[i] = [data.HW[i].td_code, data.HW[i].td_name]
            strOptHW += '<option value="' + data.HW[i].td_code + '"'
            strOptHW += '>' + data.HW[i].td_name + '</option>'
          }
          $('#WantPart0').html(strOptHW)
          if (cookie_value == '1') {
            $('#WantPart0').val('99')
          }
        }
      }
    },
    error: function(xhr, status, error) {
      alert('학원정보를 가져올 수 없습니다.')
    },
  })
}

var hk_length = 1 //학원유형 갯수
var hk_num = 2
//학원유형 추가
function add_hk() {
  if (hk_length > 2) {
    alert('학원 유형은 최대 3개까지 선택 가능합니다.')
    return
  }
  hk_length++
  hk_num++
  var stradd = ''
  stradd = stradd + '<div class="block-wrap" id="add_CT' + hk_num + '">'
  stradd =
    stradd +
    '	<select class="selectbox Jhk jMustData" style="width:160px;" name="kind" id="kind' +
    hk_num +
    '">'
  stradd = stradd + '		<option value="">선택</option>'
  stradd = stradd + '	</select>'
  stradd =
    stradd + '	<a href="javascript:del_button(1,' + hk_num + ');" class="abtn btn-remove">삭제</a>'
  stradd = stradd + '</div>'

  $('#div_hk').append(stradd)
  $('#kind' + hk_num).html(strOptHK)
}

var hw_length = 1 //과목갯수
var hw_num = 2
//과목 추가
function add_hw() {
  if (hw_length > 2) {
    alert('과목은 최대 3개까지 선택 가능합니다.')
    return
  }
  hw_length++
  hw_num++
  var stradd = ''
  stradd = stradd + '<div class="block-wrap" id="add_WP' + hw_num + '">'
  stradd =
    stradd +
    '	<select class="selectbox Jhw jMustData" style="width:160px;" name="WantPart" id="WantPart' +
    hw_num +
    '">'
  stradd = stradd + '		<option value="">선택</option>'
  stradd = stradd + '	</select>'
  stradd =
    stradd + '	<a href="javascript:del_button(2,' + hw_num + ');" class="abtn btn-remove">삭제</a>'
  stradd = stradd + '</div>'

  $('#div_hw').append(stradd)
  $('#WantPart' + hw_num).html(strOptHW)
}

function del_button(KIND, NUM) {
  if (KIND == '1') {
    $('#add_CT' + NUM).remove()
    hk_length--
  }
  if (KIND == '2') {
    $('#add_WP' + NUM).remove()
    hw_length--
  }
}

var bJoinPro = false
function JoinPro() {
  if (bJoinPro) {
    alert('회원가입 처리중입니다. 잠시 기다려주세요.')
    return
  }

  var chkOK = true

  $('.jMustData').each(function() {
    var strData = $.trim($(this).val())
    if (strData == '') {
      chkOK = false
      alert('필수 항목을 입력해 주세요.')
      $(this).focus()
      return false
    }
  })

  if (chkOK == false) {
    return
  }

  if ($('#id_img').val() == 'N') {
    chkOK = false
    alert('아이디를 확인해 주세요.')
    $('#pid').focus()
    return
  }

  if ($('#pwd_img').val() == 'N') {
    chkOK = false
    alert('비밀번호를 확인해 주세요.')
    $('#passwd1').focus()
    return
  }

  if ($('#sms_img').val() == 'N') {
    chkOK = false
    alert('휴대폰 인증을 확인해 주세요.')
    $('#hp').focus()
    return
  }

  var gender = $('input[name="gender"]:checked').val()
  if (gender == undefined) {
    alert('성별을 선택해 주세요.')
    return
  }
  var joinPathUse = $('#joinSrcSelectJs').length
  if (joinPathUse > 0) {
    var chk_join_path = $('#joinSrcSelectJs input:radio[name="joinSrc"]:checked').val()
    if (chk_join_path == undefined) {
      alert('가입경로를 선택해 주세요.')
      return
    }
    var join_etc_memo = $.trim($('#joinEtcMemo').val())
    if (chk_join_path == '999' && join_etc_memo == '') {
      alert('기타 내용을 입력해 주세요.')
      $('#joinEtcMemo').focus()
      return
    }
  }
  var chk_Agree = $('input[name="chk_Agree"]:checked').val()
  if (chk_Agree == undefined) {
    alert('회원약관 동의를 해주세요.')
    return
  }

  var chk_private = $('input[name="chk_private"]:checked').val()
  if (chk_private == undefined) {
    alert('개인 정보 수집 및 이용 동의를 해주세요.')
    return
  }

  var chk_private2 = $('input[name="chk_private2"]:checked').val()
  if (chk_private2 == undefined) {
    alert('개인 정보 취급 위탁 동의를 해주세요.')
    return
  }

  var kind = ''
  $('.Jhk').each(function() {
    kind = kind + $('option:selected', this).attr('value') + ','
  })

  var WantPart = ''
  $('.Jhw').each(function() {
    WantPart = WantPart + $('option:selected', this).attr('value') + ','
  })

  var foreigner = '0'
  if ($('#foreigner').is(':checked')) {
    foreigner = '1'
  }

  var chk_adEmail = 'N'
  if ($('#chk_adEmail').is(':checked')) {
    chk_adEmail = 'Y'
  }

  var chk_adSms = 'N'
  if ($('#chk_adSms').is(':checked')) {
    chk_adSms = 'Y'
  }

  var pInfoSaveType = $('input[name="pInfoSaveType"]:checked').val()

  if (chkOK) {
    var params = ''
    params = params + 'id_img=' + $.trim($('#id_img').val())
    params = params + '&sms_img=' + $.trim($('#sms_img').val())
    params = params + '&pwd_img=' + $.trim($('#pwd_img').val())
    params = params + '&pid=' + $.trim($('#pid').val())
    params = params + '&passwd1=' + $.trim($('#passwd1').val())
    params = params + '&hp=' + $.trim($('#hp').val())
    params = params + '&name=' + escape($.trim($('#name').val()))
    params = params + '&foreigner=' + foreigner
    params = params + '&birthday=' + $.trim($('#birthday').val())
    params = params + '&email1=' + $.trim($('#email1').val())
    params = params + '&email2=' + $.trim($('#email2').val())
    params = params + '&gender=' + gender
    params = params + '&addr_si=' + escape($.trim($('#addr_si').val()))
    params = params + '&addr_gu=' + escape($.trim($('#addr_gu').val()))
    params = params + '&addr_dong=' + escape($.trim($('#addr_dong').val()))
    params = params + '&kind=' + kind
    params = params + '&WantPart=' + WantPart
    params = params + '&Target=' + $.trim($('#Target').val())
    params = params + '&chk_adEmail=' + chk_adEmail
    params = params + '&chk_adSms=' + chk_adSms
    params = params + '&pInfoSaveType=' + pInfoSaveType
    if (joinPathUse > 0) {
      params = params + '&join_path_code=' + chk_join_path
      params = params + '&join_etc_memo=' + escape(join_etc_memo)
    }

    bJoinPro = true
    $.ajax({
      type: 'POST',
      url: 'p_join_pro.asp', //이페이지에서 중복체크를 한다
      data: params, //test.asp에 id 값을 보낸다
      cache: false,
      async: false,
      success: function(result) {
        if (result == 'true') {
          //사용가능
          //이벤트에서 넘어온 경우 이력서 팝업을 뛰우지 않게 처리
          var cookie_value = getCookie('EVENT_COOKIE_URL')
          if (cookie_value != '') {
            eventLogin(cookie_value)
          } else {
            //alert("정상적으로 가입 완료하였습니다.");
            $('#LayerPop').trigger('click')
            //$("#LayerPop").get(0).click();
          }
        } else if (result == 'dub') {
          //사용가능
          alert('이미 가입된 사용자입니다.')
        } else {
          alert('가입 오류')
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        alert('시스템오류')
        alert(result)
      },
    })
  }
}
function getCookie(cname) {
  var name = cname + '='
  var decodedCookie = decodeURIComponent(unescape(document.cookie))
  var ca = decodedCookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

//190222 퀴즈이벤트로 추가된 함수(쿠키로 체크)
//이벤트 -> 가입 -> 로그인 -> 이벤트 페이지 이동
function eventLogin(moveURL) {
  var params = 'pid=' + $.trim($('#pid').val()) + '&passwd1=' + $.trim($('#passwd1').val())
  $.ajax({
    type: 'POST',
    url: 'p_join_login.asp', //이페이지에서 중복체크를 한다
    data: params, //test.asp에 id 값을 보낸다
    cache: false,
    async: false,
    success: function(result) {
      if (result == 'true') {
        //사용가능
        location.replace(moveURL)
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      location.href = '/login/login.asp?rtn_page=%2Fp_service%2Frs%2Fresume_write%2Easp'
    },
  })
}

function WriteResume() {
  var params = 'pid=' + $.trim($('#pid').val()) + '&passwd1=' + $.trim($('#passwd1').val())

  $.ajax({
    type: 'POST',
    url: 'p_join_login.asp', //이페이지에서 중복체크를 한다
    data: params, //test.asp에 id 값을 보낸다
    cache: false,
    async: false,
    success: function(result) {
      if (result == 'true') {
        //사용가능
        location.href = '/p_service/rs/resume_write.asp'
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      location.href = '/login/login.asp?rtn_page=%2Fp_service%2Frs%2Fresume_write%2Easp'
    },
  })
}
