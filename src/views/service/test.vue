<template>
  <div>
    <form id="w_form" name="w_form" method="post">
      <input type="hidden" name="id_img" id="id_img" value="N" />
      <input type="hidden" name="sms_img" id="sms_img" value="N" />
      <input type="hidden" name="pwd_img" id="pwd_img" value="N" />
      <div class="newjoin-wrap">
        <div class="njoin-head">
          <h1 class="logo">
            <a href="/index.asp"><img alt="훈장마을" src="/images/logo/logo_Large.png"/></a>
          </h1>
        </div>
        <div class="njoin-contents">
          <div class="titWrap">
            <h3 class="ctit default"><span class="req">본인인증</span></h3>
            <p class="align-right"><em class="point1">*</em> 필수 입력 정보입니다.</p>
          </div>
          <div class="ainput-wrap">
            <ul class="tbl-aform">
              <li>
                <span class="tit">휴대폰</span>
                <div class="distable">
                  <div class="cell">
                    <input
                      class="text jLimitLength jMustData jChkNumber jGuide"
                      id="hp"
                      name="hp"
                      limitlength="11"
                      placeholder="‘-’ 없이 숫자만 입력"
                      style="width:100%;"
                      type="text"
                    />
                  </div>
                  <div class="cell right" style="width:87px;">
                    <span class="btn-white" id="injng_send" style="cursor:pointer;">인증</span>
                  </div>
                </div>
                <p class="input-info" id="hp_check" style="display:none;">
                  휴대폰 번호는 숫자만 가능합니다.
                </p>
              </li>
              <li id="injngCheck" style="display:none;">
                <span class="tit">인증번호</span>
                <div class="distable">
                  <div class="cell">
                    <input
                      type="text"
                      class="text jChkNumber"
                      id="injng_num"
                      style="width:100%;"
                      placeholder="인증번호"
                    />
                    <p class="input-info" id="ttinfo"><span id="tt">03:00</span></p>
                  </div>
                  <div class="cell right" style="width:87px;">
                    <span class="btn-white" id="injng_chk" style="cursor:pointer;">확인</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="titWrap">
            <h3 class="ctit"><span class="req">정보입력</span></h3>
          </div>
          <div class="ainput-wrap">
            <ul class="tbl-aform">
              <li>
                <span class="tit">아이디</span>
                <div class="distable">
                  <div class="cell">
                    <input
                      type="text"
                      class="text jLimitLength jMustData jGuide"
                      id="pid"
                      name="pid"
                      style="width:100%;"
                      placeholder="5~14자의 영문, 숫자 조합"
                      limitlength="14"
                    />
                  </div>
                </div>
                <p class="input-info" id="pid_check" style="display:none;"></p>
              </li>
              <li>
                <span class="tit">비밀번호</span>
                <div class="distable">
                  <div class="cell">
                    <input
                      class="text jLimitLength jMustData jGuide"
                      id="passwd1"
                      limitlength="12"
                      name="passwd1"
                      placeholder="8~12자의 영문, 숫자, 특수문자 (!@#$%^*)조합"
                      style="width:100%;"
                      type="password"
                      @blur="
                        e => {
                          onValidate(e.target.value, 'password')
                        }
                      "
                    />
                  </div>
                </div>
                <p class="input-info good" id="passwd1_check">
                  {{ validated.password.message }}
                </p>
              </li>
              <li>
                <span class="tit">비밀번호 확인</span>
                <div class="distable">
                  <div class="cell">
                    <input
                      type="password"
                      class="text jMustData jGuide"
                      id="passwd2"
                      name="passwd2"
                      style="width:100%;"
                      placeholder="8~12자의 영문, 숫자, 특수문자 (!@#$%^*)조합"
                      maxlength="12"
                    />
                  </div>
                </div>
                <p class="input-info" id="passwd2_check" style="display:none;"></p>
              </li>
              <li>
                <span class="tit">이름</span>
                <div class="distable">
                  <div class="cell">
                    <input
                      type="text"
                      class="text jLimitLength jMustData jGuide"
                      id="name"
                      name="name"
                      placeholder="성명"
                      style="width:100%;"
                      limitlength="12"
                    />
                  </div>
                  <div class="cell right" style="width:93px;">
                    <input
                      type="checkbox"
                      id="foreigner"
                      name="foreigner"
                      class="dginChk"
                      value="1"
                    />
                    <label for="foreigner" class="label-chk">Foreigner</label>
                  </div>
                </div>
                <p class="input-info" id="name_check" style="display:none;">
                  이름에는 특수문자, 숫자는 사용하실 수 없습니다.
                </p>
              </li>
              <li>
                <span class="tit">생년월일</span>
                <div class="distable">
                  <div class="cell">
                    <input
                      type="text"
                      class="text jChkNumber jMustData jGuide"
                      name="birthday"
                      id="birthday"
                      placeholder="YYYYMMDD"
                      style="width:100%;"
                      maxlength="8"
                    />
                  </div>
                  <div class="cell right" style="width:93px;">
                    <span class="hint-wrap2">
                      <span class="ico">수집근거</span>
                      <div class="hint-cont">
                        취직 최저 연령에 대한 제한<br />(근로기준법 제 64조 1항)
                      </div>
                    </span>
                  </div>
                </div>
                <p class="input-info" id="birthday_check" style="display:none;">
                  생년월일 입력형식을 확인해주세요.
                </p>
              </li>
              <li>
                <span class="tit">성별</span>
                <div class="distable">
                  <div class="cell">
                    <span class="chkWrap">
                      <span
                        v-for="(option, i) in staticOptions.genderOptions"
                        class="checks2"
                        :key="`join_option_gender_${i}`"
                      >
                        <input
                          v-model="inputInfo.gender"
                          name="gender"
                          type="radio"
                          :id="option.type"
                          :value="option.value"
                        />
                        <label class="first" :for="option.type">{{ option.text }}</label>
                      </span>
                      <!-- <span class="checks1">
                        <input type="radio" id="woman" name="gender" value="2" />
                        <label for="woman">여자</label>
                      </span> -->
                    </span>
                  </div>
                </div>
              </li>
              <li>
                <span class="tit">이메일</span>
                <div class="distable">
                  <div class="cell" style="width:120px;">
                    <input
                      v-model="inputInfo.emailId"
                      type="text"
                      class="text jChkAlphabet jMustData jGuide"
                      style="width:100%"
                      id="email1"
                      name="email1"
                      placeholder="이메일"
                    />
                  </div>
                  <div class="cell center" style="width:30px;">
                    <span class="at">@</span>
                  </div>
                  <div class="cell">
                    <input
                      v-model="inputInfo.emailAddressInputted"
                      class="text jChkAlphabet jMustData jGuide"
                      id="email2"
                      name="email2"
                      placeholder="메일주소"
                      style="width:100%;"
                      type="text"
                    />
                  </div>
                  <div class="cell right" style="width:130px;">
                    <select
                      v-model="inputInfo.emailAddressSelected"
                      class="selectbox"
                      id="mail_list"
                      name="mail_list"
                      style="width:120px;"
                      @change="onSelectEmail"
                    >
                      <option
                        v-for="(option, i) in staticOptions.emailOptions"
                        :key="`join_select_email_${i}`"
                        :value="option.value"
                        >{{ option.text }}</option
                      >
                    </select>
                  </div>
                </div>
                <p class="input-info" id="email1_check" style="display:none;">
                  이메일 주소를 다시 확인해주세요.
                </p>
              </li>
              <li>
                <span class="tit">거주지</span>
                <div class="distable">
                  <div class="cell" style="width:150px;">
                    <select
                      v-model="inputInfo.residenceCity"
                      class="selectbox jMustData"
                      style="width:100%;"
                      name="addr_si"
                      id="addr_si"
                      @change="onSelectCity"
                    >
                      <option
                        v-for="(option, i) in staticOptions.cityOptions"
                        :key="`join_residence_option_${i}`"
                        :value="option.value"
                      >
                        {{ option.text }}
                      </option>
                    </select>
                  </div>
                  <div class="cell spc"></div>
                  <div class="cell">
                    <select
                      v-model="inputInfo.residenceDistrict"
                      class="selectbox jMustData"
                      style="width:100%;"
                      name="addr_gu"
                      id="addr_gu"
                    >
                      <option value="">시/군/구</option>
                      <template v-if="isCitySelected">
                        <option
                          v-for="(option, i) in staticOptions.districtOptions[
                            inputInfo.residenceCity
                          ]"
                          :key="`join_select_district_${i}`"
                          :value="option"
                          >{{ option }}</option
                        >
                      </template>
                    </select>
                  </div>
                  <!-- <div class="cell right" style="width:170px;">
								<input type="text" class="text jLimitLength jMustData" style="width:160px;" name="addr_dong" id="addr_dong" placeholder="동/면 입력" limitLength="30"/>
							</div> -->
                </div>
              </li>
              <!-- <li>
						<span class="tit">학원유형</span>
						<div class="distable">
							<div class="block-wrap first" >
								<select class="selectbox Jhk jMustData" style="width:160px;" name="kind" id="kind0">
									<option value="">분류</option>
								</select>
								<a href="javascript:add_hk();" class="abtn btn-add">추가</a>
							</div>
							<div id="div_hk">
							</div>
							<p class="desc-noti">학원추천 및 매칭시스템에 활용 됩니다.</p>
						</div>
					</li> -->
              <li>
                <span class="tit">과목</span>
                <div class="distable">
                  <div
                    v-for="(item, i) in inputInfo.subject"
                    class="block-wrap"
                    :key="`join_subject_${i}`"
                  >
                    <select
                      v-model="inputInfo.subject[i]"
                      class="selectbox Jhw jMustData"
                      style="width:160px;"
                      name="WantPart"
                      id="WantPart0"
                    >
                      <option
                        v-for="(_option, _i) in staticOptions.subjectOptions"
                        :key="`join_select_subject_${_i}`"
                        :value="_option.value"
                        >{{ _option.text }}</option
                      >
                    </select>
                    <a v-if="i === 0" class="" @click="onAddSubject">추가</a>
                    <a v-else class="" @click="onDelSubject(i)">삭제</a>
                  </div>
                </div>
                <div id="div_hw"></div>
              </li>
            </ul>
          </div>
          <!-- [ 가입경로 ]-->
          <div class="titWrap">
            <h3 class="ctit"><span class="req">가입경로</span></h3>
          </div>
          <div class="ainput-wrap">
            <ul class="tbl-aform" id="joinSrcSelectJs">
              <li>
                <span class="tit">온라인</span>
                <div class="distable">
                  <div class="cell">
                    <div class="achk-wrap">
                      <span class="achk"
                        ><input
                          type="radio"
                          class="dginRdio"
                          id="joinSrcOn1"
                          name="joinSrc"
                          value="100"
                        /><label for="joinSrcOn1" class="label-chk">포털검색</label></span
                      ><span class="achk"
                        ><input
                          type="radio"
                          class="dginRdio"
                          id="joinSrcOn2"
                          name="joinSrc"
                          value="101"
                        /><label for="joinSrcOn2" class="label-chk"
                          >커뮤니티(카페, 블로그, SNS 등)</label
                        ></span
                      ><span class="achk"
                        ><input
                          type="radio"
                          class="dginRdio"
                          id="joinSrcOn3"
                          name="joinSrc"
                          value="102"
                        /><label for="joinSrcOn3" class="label-chk">광고</label></span
                      ><span class="achk"
                        ><input
                          type="radio"
                          class="dginRdio"
                          id="joinSrcOn4"
                          name="joinSrc"
                          value="103"
                        /><label for="joinSrcOn4" class="label-chk">이벤트</label></span
                      >
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <span class="tit">오프라인</span>
                <div class="distable">
                  <div class="cell">
                    <div class="achk-wrap">
                      <span class="achk"
                        ><input
                          type="radio"
                          class="dginRdio"
                          id="joinSrcOff1"
                          name="joinSrc"
                          value="104"
                        /><label for="joinSrcOff1" class="label-chk">지인소개</label></span
                      ><span class="achk"
                        ><input
                          type="radio"
                          class="dginRdio"
                          id="joinSrcOff2"
                          name="joinSrc"
                          value="105"
                        /><label for="joinSrcOff2" class="label-chk">지면광고</label></span
                      ><span class="achk"
                        ><input
                          type="radio"
                          class="dginRdio"
                          id="joinSrcOff3"
                          name="joinSrc"
                          value="106"
                        /><label for="joinSrcOff3" class="label-chk">옥외광고</label></span
                      >
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <span class="tit">기타</span>
                <div class="distable">
                  <div class="cell" style="width:70px;">
                    <div class="achk-wrap">
                      <span class="achk">
                        <input
                          type="radio"
                          class="dginRdio"
                          id="joinSrcEtc"
                          name="joinSrc"
                          value="999"
                        />
                        <label for="joinSrcEtc" class="label-chk">기타</label>
                      </span>
                    </div>
                  </div>
                  <div class="cell" id="joinSrcEtcMemo" style="display:none;">
                    <input
                      type="text"
                      class="text ty-line jLimitLength"
                      id="joinEtcMemo"
                      name="joinEtcMemo"
                      style="width:300px;"
                      limitlength="60"
                    />
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- // * 약관 동의 -->
          <div class="titWrap">
            <h3 class="ctit"><span class="req">약관 동의</span></h3>
          </div>
          <div class="ainput-wrap">
            <div class="agree-wrap">
              <div class="allCheck">
                <span class="tit">전체동의</span>
                <div class="right">
                  <input type="checkbox" id="allChk2" class="dginChk" />
                  <label for="allChk2" class="label-hidden label-chk">모두체크</label>
                </div>
              </div>
              <div class="chk-list-wrap">
                <ul class="chk-list joinAgree">
                  <li>
                    <p class="tit">이용약관 동의 <span class="must point1">(필수)</span></p>
                    <div class="right">
                      <a href="#" class="view-terms">상세보기</a>
                      <span class="achk">
                        <input
                          type="checkbox"
                          name="chk_Agree"
                          id="agchk1"
                          class="dginChk jAgreeItem"
                        />
                        <label for="agchk1" class="label-hidden label-chk"
                          >이용약관 동의 체크</label
                        >
                      </span>
                    </div>
                    <div class="terms-cont">
                      <strong class="btit">제1조 (목적)</strong>
                      <p class="txt">
                        본 약관은 에듀베이션(주)(이하 "회사")이 운영하는 웹사이트(이하 "사이트") 및
                        모바일 어플리케이션(이하 "어플리케이션"이라 하며, 사이트와 어플리케이션을
                        총칭하여 "사이트 등"이라 함)을 통해 훈장마을 서비스(이하 "서비스")를
                        제공함에 있어 이를 이용하는 이용자 (이하 회원)의 이용조건 및 제반 절차, 기타
                        필요한 사항을 규정함을 목적으로 합니다.
                      </p>
                      <strong class="btit">제2조 (용어의 정의)</strong>
                      <p class="txt">본 약관에서 사용하는 용어의 정의는 아래와 같습니다.</p>
                      <ol class="list order">
                        <li>
                          1. "사이트"라 함은 회사가 이용자에게 서비스를 제공하기 위하여 제작,
                          운영하는 사이트를 말합니다. 현재 회사가 운영하는 사이트의 접속주소는
                          아래와 같습니다.
                          <ul>
                            <li>-www.hunjang.com</li>
                            <li>-m.hunjang.com</li>
                          </ul>
                        </li>
                        <li>
                          2. "어플리케이션"이라 함은 회사가 이용자에게 서비스를 제공하기 위하여 IOS,
                          안드로이드 등 운영체제와 관계없이 스마트폰 또는 기타 휴대용 단말기에서
                          이용할 수 있도록 제작,운영하는 프로그램을 말합니다. 현재 회사가 운영하는
                          어플리케이션의 이름은 아래와 같습니다.
                        </li>
                      </ol>
                      <p class="txt">-훈장마을</p>
                      <ol class="list order">
                        <li>
                          3. "서비스"라 함은 회사가 운영하는 사이트 등을 통해 개인, 학원이 구직,
                          교육, 매매 등의 목적으로 등록하는 자료를 DB화하여 각각의 목적에 맞게 분류
                          가공, 집계하여 정보를 제공하는 서비스와 사이트 등에서 제공하는 모든 부대
                          서비스를 말합니다. 서비스는 원칙적으로 무료로 제공되나, 일부 서비스는
                          유료로 제공될 수 있습니다.
                        </li>
                        <li>
                          4. "이용자"라 함은 훈장마을 본 약관에 따라 서비스를 받는 회원(개인회원 및
                          학원회원 포함) 및 비회원을 말합니다.
                        </li>
                        <li>
                          5. "회원"이라 함은 회사에 개인정보를 제공하여 회원등록을 한 자로서,
                          서비스의 정보를 지속적으로 제공받으며, 서비스를 계속적으로 이용할 수 있는
                          아래의 사람을 말합니다.
                          <ul>
                            <li>
                              -개인회원: 서비스를 이용하기 위하여 동 약관에 동의하고 회사와
                              이용계약을 체결하여 이용자 ID를 부여받은 개인을 말합니다.
                            </li>
                            <li>
                              -학원회원: 자사의 직접 고용의 목적으로 채용을 원하는 학원이 본
                              서비스를 이용하기 위하여 동 약관에 동의하고 회사와 이용계약을 체결하여
                              이용자 ID를 부여받은 학원을 말합니다.
                            </li>
                          </ul>
                        </li>
                        <li>
                          6. "ID" 또는 "회원 ID"라 함은 회원 식별 및 서비스 이용을 위하여 회원이
                          선정한 문자와 숫자의 조합을 말합니다. 서비스를 이용하려는 이용자가 동일
                          이용자 임을 확인 후, 1개의 ID가 부여되며, 중복 가입은 되지 않습니다.
                        </li>
                        <li>
                          7. "비밀번호"라 함은 회사의 서비스를 이용하려는 사람이 회원 ID를 부여받은
                          자와 동일인임을 확인하고 자신의 비밀 보호를 위해 회원이 설정한 문자와 숫자
                          그리고 특수문자의 조합을 말합니다.
                        </li>
                        <li>
                          8. "적립금"이라 함은 회사의 서비스를 이용할 경우 회사가 정한 적립금 정책에
                          따라 학원회원에게 적립되어 결제수단으로 이용 가능한 적립금입니다.
                        </li>
                      </ol>
                      <strong class="btit">제3조 (약관의 명시와 개정)</strong>
                      <ol class="list order">
                        <li>
                          1. 회사는 이 약관의 내용과 상호, 영업소 소재지, 대표자 성명,
                          사업자등록번호, 연락처 등을 이용자가 알 수 있도록 초기 화면에 게시하거나
                          기타의 방법으로 이용자에게 공지합니다. 약관의 내용은 이용자가 사이트 등의
                          링크를 통한 연결화면을 통하여 볼 수 있도록 할 수 있습니다.
                        </li>
                        <li>
                          2. 회사는 약관의 규제 등에 관한 법률, 전기통신기본법, 전기통신사업법,
                          정보통신망 이용 촉진 및 정보 보호 등에 관한 법률, 개인정보 보호법 등 관련
                          법령을 위배하지 않는 범위에서 본 약관을 개정할 수 있습니다.
                        </li>
                        <li>
                          3. 회사가 약관을 개정할 경우, 적용일자 및 개정사유를 명시하여 현행약관과
                          함께 그 개정약관의 적용일로부터 최소 7일 전(약관의 변경이 회원에게
                          불리하거나 회원의 권리·의무의 중요한 변경의 경우 최소 30일 전)부터 사이트
                          등의 초기화면 공지사항 또는 이메일 등을 통해 사전 공지합니다.
                        </li>
                        <li>
                          4. 회원은 변경된 약관의 적용을 거부할 권리가 있으며, 변경된 약관이 공지된
                          지 15일 이내에 변경 약관 적용에 대한 거부 의사를 표시할 수 있습니다. 만약,
                          회원이 변경 약관 적용에 대한 거부 의사를 표시하지 않고 서비스를 계속
                          이용하는 경우, 회사는 회원이 변경 약관 적용에 동의하는 것으로 간주합니다.
                        </li>
                        <li>
                          5. 회원이 변경 약관 적용에 동의하지 않는 경우 현재 이용중인 유료
                          "서비스"의 이용이 종료될 때까지 기존 약관을 적용하거나 이용계약을 해지할
                          수 있습니다.
                        </li>
                      </ol>
                      <strong class="btit">제4조 (약관 외 준칙)</strong>
                      <ol class="list order">
                        <li>
                          1. 본 약관에서 규정하지 않은 사항은 약관의 규제 등에 관한 법률, 정보통신망
                          이용촉진 및 정보보호 등에 관한 법률, 개인정보 보호법, 전기통신기본법,
                          전기통신사업법 등의 관계법령에 따라 규율됩니다.
                        </li>
                        <li>
                          2. 회원이 회사와 개별 계약을 체결하여 서비스를 이용하는 경우에는 개별
                          계약을 우선합니다.
                        </li>
                      </ol>
                      <strong class="btit">제5조 (서비스 이용 계약의 성립)</strong>
                      <ol class="list order">
                        <li>
                          1. 회사의 서비스 이용계약은 서비스를 이용하고자 하는 자의 본 약관과
                          개인정보취급방침의 내용에 대한 동의 및 이용신청(회원가입 신청)에 대하여
                          회사가 승낙함으로써 성립됩니다.
                        </li>
                        <li>
                          2. 서비스를 이용하고자 하는 자가 회원가입 신청 시 사이트 등의 회원 가입
                          화면 중 “동의함” 버튼을 누르면 본 약관과 개인정보 처리방침을 충분히 읽고
                          동의한 것으로 간주됩니다.
                        </li>
                        <li>
                          3. 제 1항의 승낙은 이용신청자가 회원가입 신청 작성 후 회사가 사이트 등에
                          안내 및 전자메일로 이용신청자에게 통지함으로써 이루어지고, 이러한 승낙의
                          통지가 이용신청자에게 도달하면 이용계약이 성립됩니다.
                        </li>
                      </ol>
                      <strong class="btit">제6조 (서비스 이용신청)</strong>
                      <ol class="list order">
                        <li>
                          1. 훈장마을 회원으로 가입하여 서비스를 이용하고자 하는 자는 본 약관 및
                          회사의 개인정보 처리방침에서 정한 필수 수집항목 등에 기재된 정보를
                          제공하여야 합니다.
                        </li>
                        <li>
                          2. 서비스를 이용하고자 하는 자는 개인회원 가입 신청 시 반드시 휴대폰 번호
                          인증을 거쳐야 하며, 회사에서 요청하는 필수 수집항목(이름, 생년월일, 성별,
                          이메일 주소, 거주지, 과목)을 기록하여 신청합니다.
                        </li>
                        <li>
                          3. 서비스를 이용하고자 하는 자는 학원회원 가입 신청 시 반드시 본인인증
                          방식(휴대폰 인증, 아이핀 인증)을 선택하여 인증을 거쳐야하며,회사에서
                          요청하는 필수 수집항목(담당자명, 담당자 휴대폰 번호, 이메일 주소, 학원명,
                          대표자명, 사업자번호, 학원연락처, 과목, 대상, 학원주소)을 기록하여
                          신청합니다. 다만, 사업자등록번호가 없는 학원이나 기업은 개원예정으로
                          등록하고 5개월 이내에 사업자번호를 입력하여야 합니다.
                        </li>
                        <li>
                          4. 회사는 회원에게 원활한 서비스를 제공하기 위해 회원가입, 본인확인,
                          가입의사 및 서비스 이용의사 확인, 부정이용방지, 서비스 제공, 이력서 등록과
                          입사지원 등 취업활동, 민원처리, 경품지급 등을 위하여 최소한의 정보를
                          수집할 수 있으며, 그 외 사항은 추가 수집요청 할 수 있습니다.
                        </li>
                      </ol>
                      <strong class="btit">제7조 (이용신청의 승낙과 제한)</strong>
                      <ol class="list order">
                        <li>
                          1. 회사는 전조의 규정에 의한 개인회원 이용신청자에 대하여 업무수행상 또는
                          기술상 지장이 없는 경우에는 원칙적으로 접수순서에 따라 서비스 이용을
                          승낙합니다.
                        </li>
                        <li>
                          2. 회사는 아래사항 중 어느 사유에 해당하는 경우, 이용신청자의 개인회원
                          서비스 이용신청을 승낙하지 않습니다. 개인회원 가입 후 해당 사실이 밝혀진
                          경우, 회사는 해당 개인회원 ID를 삭제하거나 개인회원을 강제탈퇴 조치하며,
                          필요할 경우 관계법령에 따른 형사처벌이나 행정제재를 위한 법률절차를 진행할
                          수 있습니다.
                          <ul>
                            <li>① 실명이 아니거나 타인의 명의를 이용하여 신청한 경우</li>
                            <li>
                              ② 이용계약 신청서의 내용을 허위로 기재하거나 회사가 제시하는 내용을
                              기재하지 않은 경우
                            </li>
                            <li>
                              ③ 이용자의 귀책사유로 인하여 승인이 불가능하거나 기타 규정한 제반
                              사항을 위반하여 신청하는 경우
                            </li>
                          </ul>
                        </li>
                        <li>
                          3. 회사는 아래사항에 해당하는 경우에는 개인회원 서비스 이용 신청에 대하여
                          승낙제한 사유가 해소될 때까지 승낙을 유보할 수 있다.
                          <ul>
                            <li>① 회사가 설비의 여유가 없는 경우</li>
                            <li>② 회사의 기술상 지장이 있는 경우</li>
                            <li>
                              ③ 기타 회사의 사정(회사의 귀책사유 있는 경우도 포함)으로 이용승낙이
                              곤란한 경우
                            </li>
                          </ul>
                        </li>
                        <li>
                          4. 회사는 전조의 규정에 의한 학원회원 이용신청자에 대하여 업무수행상 또는
                          기술상 지장이 없는 경우에는 원칙적으로 접수순서에 따라 서비스 이용을
                          승낙합니다.
                        </li>
                        <li>
                          5. 회사는 아래사항 중 어느 사유에 해당하는 경우, 이용신청자의 학원회원
                          서비스 이용신청을 승낙하지 않습니다. 학원회원 가입 후 해당 사실이 밝혀진
                          경우, 회사는 해당 학원회원 ID를 삭제하거나 학원회원을 강제탈퇴 조치하며,
                          필요할 경우 관계법령에 따른 형사처벌이나 행정제재를 위한 법률절차를 진행할
                          수 있습니다.
                          <ul>
                            <li>① 학원회원 가입 신청 시에 타인의 명의를 도용한 경우</li>
                            <li>
                              ② 학원회원 가입 신청 시에 학원명 또는 사업자등록번호를 실제와 다르게
                              기재하거나 기타 학원회원 정보를 허위로 기재한 경우
                            </li>
                            <li>
                              ③ 회사가 학원에 증빙 자료 제출을 요구하였음에도 불구하고 합리적 이유
                              없이 이에 응하지 아니한 경우
                            </li>
                            <li>
                              ④ 소정의 증빙 자료를 제출함에 있어 허위의 내용이 기재된 자료, 위조
                              또는 변조된 자료를 제출한 경우
                            </li>
                            <li>
                              ⑤ 서비스 부정이용행위를 하여 서비스 이용 정지 또는 강제 탈퇴 등의
                              제재조치가 있었던 경우
                            </li>
                            <li>
                              ⑥ 회사가 서비스 부정이용 행위에 대한 제재조치를 취하기 전 이를
                              회피하기 위해 탈퇴하였던 경우
                            </li>
                          </ul>
                        </li>
                        <li>
                          6. 회사는 아래사항에 해당하는 경우에는 학원회원 서비스 이용 신청에 대하여
                          승낙제한 사유가 해소될 때까지 승낙을 유보할 수 있습니다.
                          <ul>
                            <li>① 회사가 설비의 여유가 없는 경우</li>
                            <li>② 회사의 기술상 지장이 있는 경우</li>
                            <li>
                              ③ 기타 회사의 사정(회사의 귀책사유 있는 경우도 포함)으로 이용승낙이
                              곤란한 경우
                            </li>
                          </ul>
                        </li>
                      </ol>
                      <strong class="btit">제8조 (서비스의 내용)</strong>
                      <p class="txt">
                        회사는 개인회원에게 아래사항에 해당하는 서비스를 제공할 수 있습니다.
                      </p>
                      <ol class="list order">
                        <li>1. 학원회원의 인재검색을 위한 이력서 등록 서비스</li>
                        <li>2. 채용정보 서비스</li>
                        <li>3. 온라인 입사지원 서비스</li>
                        <li>4. 구인/구직과 관련된 제반 서비스</li>
                        <li>5. 회원의 교류와 소통에 관련된 커뮤니티 서비스</li>
                        <li>6. 매매/홍보 서비스</li>
                        <li>
                          7. 기타 회사가 추가 개발하거나 제휴계약 등을 통해 회원에게 제공하는 일체의
                          서비스
                        </li>
                      </ol>
                      <p class="txt">
                        회사는 학원회원에게 아래사항에 해당하는 서비스를 제공할 수 있습니다.
                      </p>
                      <ol class="list order">
                        <li>1. 채용정보 등록·공고 및 기타 광고 서비스</li>
                        <li>2. 온라인 채용관리 서비스</li>
                        <li>3. 이력서 열람 서비스</li>
                        <li>4. 인재정보 서비스</li>
                        <li>5. 회원의 교류와 소통에 관련된 커뮤니티 서비스</li>
                        <li>6. 자료 활용에 관련된 서비스</li>
                        <li>
                          7. 기타 회사가 추가로 제공하거나 타사와의 제휴 등을 통해 학원회원에게
                          제공하는 일체의 채용 관련 서비스
                        </li>
                      </ol>
                      <p class="txt">
                        회사는 필요한 경우 서비스의 내용을 추가 또는 변경할 수 있습니다. 단, 서비스
                        내용의 추가 또는 변경으로 인하여 회원의 권리·의무에 중요한 영향을 미치는
                        경우, 회사는 추가 또는 변경된 서비스 내용을 그 적용일로부터 30일 전에
                        공지합니다.
                      </p>
                      <strong class="btit">제9조 (개인회원 정보, 이력서 노출)</strong>
                      <p class="txt">제9조는 개인회원에 해당되는 사항입니다.</p>
                      <ol class="list order">
                        <li>
                          1. 개인회원의 이력서는 개인이 회원가입 또는 이력서 작성 및 수정 시
                          개인회원이 희망한 형태로 이력서가 노출됩니다.
                        </li>
                        <li>
                          2. 회사는 개인회원이 이력서의 인재정보 등록/미등록 지정, 이력서 상의
                          연락처 공개/비공개를 자유롭게 선택할 수 있도록 합니다.
                        </li>
                        <li>
                          3. 회사는 개인회원이 이력서를 인재정보에 공개하기를 희망한 경우, 유료
                          서비스인 이력서 열람 서비스를 신청한 학원회원이 열람 가능하도록 할 수
                          있습니다. 다만, 비공개로 지정된 세부 항목이 있을 경우 해당 항목은
                          제공/노출할 수 없습니다.
                        </li>
                        <li>
                          4. 회사는 개인회원의 동의를 얻어 개인회원이 등록한 이력서를 아이디 휴면
                          상태 이전까지 노출할 수 있으며, 1년 이상 이용 기록이 없는 회원은 자동으로
                          휴면회원 처리가 되고 이력서가 분리·보관됩니다.
                        </li>
                        <li>
                          5. 회사는 개인회원의 동의를 얻어 안정적인 서비스를 제공하기 위해 테스트 및
                          모니터링, 고객문의 용도로 개인회원의 이력서 정보를 열람할 수 있습니다.
                        </li>
                      </ol>
                      <strong class="btit"
                        >제10조 (학원정보 및 채용공고 등록, 강사 이력서 열람)</strong
                      >
                      <ol class="list order">
                        <li>
                          1. 학원회원은 구직을 원하는 개인회원이 채용공고를 열람한 후 해당 학원에
                          대해 정확히 판단할 수 있도록 학원정보를 사실과 다름없이 정확하게
                          기재하여야 합니다. 학원정보를 사실과 다르게 기재한 학원회원은 이로 인하여
                          발생한 모든 문제에 대하여 전적인 책임을 부담하여야 합니다.
                        </li>
                        <li>
                          2. 학원회원은 채용절차 공정화에 관한 법률 제 4조, 직업안정법 제 34조 및
                          동법 시행령 제 34조에 의하여 금지되는 거짓 구인광고 또는 거짓
                          채용공고(이하 "거짓 채용공고")를 등록해서는 안됩니다. 거짓채용공고를
                          등록하거나 거짓 구인조건을 제시한 학원회원은 채용절차의 공정화에 관한 법률
                          제 16조에 의해 5년 이하의 징역 또는 2천만원 이하의 벌금형을 받을 수
                          있습니다. 회사는 거짓 채용공고를 등록한 학원회원을 직권으로 고발할 수
                          있습니다.
                        </li>
                        <li>
                          3. 제 2항에 따라 금지되는 거짓 채용공고는 아래사항과 같습니다.
                          <ul>
                            <li>
                              ① 구인 또는 채용을 가장하여 아이디어 수집, 사업장 홍보, 물품 판매,
                              유학 알선, 수강생 모집, 직업소개, 부업알선, 자금모집 등을 행하는 공고
                            </li>
                            <li>
                              ② 작성자가 제시한 직종, 고용형태, 업무내용, 근로조건 등이 실제와
                              현저히 다른 공고
                            </li>
                            <li>
                              ③ 학원명, 담당자명, 학원 연락처 등 학원의 중요 정보를 정확하게
                              기입하지 않았을 경우
                            </li>
                            <li>④ 타인의 상호 및 연락처를 위장하여 구직자를 유인하는 경우</li>
                            <li>
                              ⑤ 사회 미풍양속에 해가 되는 선정적인 광고 및 기타 중요 내용이 사실과
                              다른 공고
                            </li>
                            <li>
                              ⑥ 거짓 채용공고를 목적으로 구인자의 신원 (업체명 또는 성명)을 표시하지
                              않는 공고
                            </li>
                          </ul>
                        </li>
                        <li>
                          4. 학원회원은 남녀 고용 평등과 일, 가정양립 지원에 관한 법률 제 7조에
                          의거하여 근로자의 모집 및 채용에 있어서 남녀를 차별해서는 안됩니다.
                        </li>
                        <li>
                          5. 학원회원이 등록한 학원정보 및 채용공고가 제 3항 1호 내지 6호를 위반한
                          것으로 인정될 경우, 회사는 해당 공고의 게시를 중단하거나 삭제하는 등의
                          조치를 취할 수 있습니다. 또한 학원회원은 회사 및 개인회원에 대한 관계에서
                          제 3항 1호 내지 6호의 위반으로 발생할 수 있는 민·형사상 책임을 전적으로
                          집니다.
                        </li>
                        <li>
                          6. 회사는 학원회원이 등록한 학원정보 및 채용공고를 회사가 정한 방법에 의해
                          노출할 수 있으며, 지정된 마감기간이 지난 채용공고를 임의로 마감시킬 수
                          있습니다.
                        </li>
                        <li>
                          7. 학원회원은 유·무료로 개인회원이 등록한 이력서를 검색할 수 있으며,
                          회사가 제시하는 별도의 커뮤니케이션 수단을 통하여 개인회원에게 연락을 취할
                          수 있습니다. 이 때, 이력서상 기재된 개인회원의 연락처의 열람 및 연락의
                          목적은 채용활동에 국한되어야 하며, 기업의 영업·마케팅을 위하여 활용하거나
                          제 3자에 대한 개인정보 제공 시에는 정보통신망 이용 촉진 및 정보 보호 등
                          관련 법률, 개인정보 보호법, 직업안정법 위반에 따른 법적 책임을 전적으로
                          부담합니다.
                        </li>
                        <li>
                          8. 회사는 학원회원이 등록된 개인회원의 이력서를 검색하고, 개인회원에게
                          연락할 수 있는 권한에 제한을 둘 수 있으며, 학원회원이 적절하지 않은
                          방법으로 개인회원에게 연락하거나 서비스 이용에 불편을 끼친 경우,
                          학원회원의 채용공고 및 학원정보를 임의로 수정/삭제 등의 조치를 취할 수
                          있습니다.
                        </li>
                        <li>
                          9. 학원회원은 가입 시 학원명을 등록하거나 가입 후 학원명을 수정할 경우,
                          구직자에게 정확한 학원정보 전달을 위해 등록 및 수정 후 1개월 이내에는
                          학원명을 변경할 수 없습니다.
                        </li>
                        <li>
                          10. 강사 이력서 열람 서비스 이용 시 학원회원은 2인 이상이 동일 아이디로
                          접속하여 동시에 사용하실 수 없습니다. 회사는 학원회원에게이력서 열람
                          서비스를 1인 이용으로 제한할 수 있습니다.
                        </li>
                      </ol>
                      <strong class="btit">제11조 (제휴를 통한 서비스)</strong>
                      <ol class="list order">
                        <li>
                          1. 회사는 이용자의 서비스 이용 편의 및 품질 제고를 위해 학원회원이 사이트
                          등에 등록한 학원정보 및 채용공고에 더하여 회사와 협력 또는 제휴관계에 있는
                          학원정보 제공업체(이하 “제휴업체”)를 통해 확보한 추가 학원정보를
                          이용자에게 제공할 수 있습니다.
                        </li>
                        <li>
                          2. 회사는 제휴업체로부터 적법하게 취득한 비회원의 학원정보 및 채용공고를
                          사이트 등에 등록할 수 있습니다.
                        </li>
                        <li>
                          3. 회사는 학원회원의 동의를 얻어 학원회원이 등록한 학원정보 및 채용공고를
                          제휴업체에 제공할 수 있습니다.
                        </li>
                        <li>
                          4. 회사는 회원의 동의를 얻어 회사와 제휴관계를 체결한 여타 인터넷 웹
                          사이트 또는 신문, 잡지 등의 오프라인 매체(이하 “제휴매체”)를 통해 사이트
                          등에 등록된 학원회원의 학원정보 및 채용공고가 열람될 수 있도록 서비스를
                          제공할 수 있습니다.
                        </li>
                        <li>
                          5. 회사는 학원회원에게 사이트 등에 등록한 학원정보 및 채용공고가
                          제휴업체에 제공되거나 제휴매체에 등록될 수 있음을 사전 고지하고 이에 대한
                          동의를 받아야하며, 제휴업체 및 제휴매체 전체 목록을 사이트 등에서 상시
                          열람할 수 있도록 게시합니다.
                        </li>
                        <li>
                          6. 회사가 제휴업체 및 제휴매체를 추가 또는 변경할 경우에는 7일 전부터
                          사이트 등의 공지사항 또는 이메일을 통해 통지합니다.
                        </li>
                        <li>
                          7. 학원회원은 제휴업체 및 제휴매체의 추가 또는 변경 통지일로부터 15일
                          이내에 추가되는 제휴업체 및 제휴매체에 대한 학원정보 및 채용공고의 제공
                          또는 등록에 관하여 거부 의사를 표시할 수 있습니다. 학원회원이 위 기간 동안
                          거부 의사를 표시하지 않을 경우에는 이에 동의하는 것으로 간주합니다.
                        </li>
                        <li>
                          8. 학원회원이 제 7항에 따라 추가 또는 변경된 제휴업체 및 제휴매체에 대한
                          학원정보 및 채용공고의 제공 또는 등록 거부 의사를 표시한 경우, 회사는 추가
                          또는 변경된 제휴업체 또는 제휴매체에 해당 학원회원의 학원정보 및
                          채용공고를 제공하거나 등록하지 않습니다.
                        </li>
                      </ol>
                      <strong class="btit">제12조 (유료 서비스 이용 요금)</strong>
                      <ol class="list order">
                        <li>
                          1. 회사가 제공하는 서비스 이용을 위한 학원회원 가입과 학원정보 및 채용공고
                          등록은 무료입니다. 다만, 사이트 등에 방문한 이용자에게 자신의 정보를 보다
                          효과적으로 노출시키기 위한 유료 광고·공고상품(최우선 노출, 최다노출 등)과
                          유료 이력서 열람 서비스 및 기타 일부 서비스는 종류에 따라 차등을 두며,
                          이에 대한 금액은 해당 페이지 내 별도로 공지합니다.
                        </li>
                        <li>
                          2. 회사는 유료 광고·공고상품 및 제반 유료 서비스의 이용요금을 사이트 등에
                          게시하여 공지합니다. 학원회원이 유료 광고·공고상품 및 제반 유료서비스를
                          구매할 경우, 회사는 개별계약을 체결하여 시스템투자·마케팅·매출증대·서비스
                          활성화 등의 목적으로 공지된 이용요금을 변경하여 판매할 수 있습니다.
                        </li>
                        <li>
                          3. 회사는 유료 광고·공고상품 및 제반 유료 서비스 이용 요금을 이 변경되는
                          경우 변경된 금액 적용일 최소 7일전(금액의 변경이 회원에게 불리한 경우에는
                          30일전)부터 사이트 등의 초기화면 공지사항 또는 이메일 등을 통해
                          학원회원에게 사전 공지하여야 합니다.
                        </li>
                        <li>
                          4. 다만, 변경 이전에 적용 또는 계약한 금액은 소급하여 적용하지 아니합니다.
                        </li>
                      </ol>
                      <strong class="btit">제13조 (서비스의 요금의 환불)</strong>
                      <p class="txt">
                        학원회원은 다음의 경우에만 유료서비스 이용금액에 대해 환불처리 할 수
                        있습니다.
                      </p>
                      <ol class="list order">
                        <li>
                          1. 입금이 완료된 이용자도 서비스 제공 전에는 환불처리를 할 수 있습니다. 단
                          예약 형태의 서비스 이용 요금에 대해서는 해당 서비스 정책에 준하여
                          처리됩니다. (예: 오프라인 특강 참석 예약)
                        </li>
                        <li>
                          2. 광고 상품 요금에 대해서 서비스의 시스템상의 장애로 서비스를 이용하지
                          못한 경우 잔여기간을 연장합니다.
                        </li>
                        <li>
                          3. 서비스 이용 요금이 과입금된 경우 이용자의 요청에 따라 해당 금액만큼
                          환불되거나 적립금으로 충전 처리합니다.
                        </li>
                        <li>
                          4. 강사 이력서 검색 서비스는 사용 도중 원하는 이력서가 없다는 이유로 환불
                          요청 시에는 환불처리 되지 않습니다.
                        </li>
                        <li>
                          5. 채용광고 진행 도중 채용이 체결되어 더 이상 광고 집행을 원치
                          않으시더라도 결제하신 금액이 부분 환불되지 않습니다. 다만, 사용 기간에
                          따라 적립금으로 전환 처리되며 그 기간은 아래와 같습니다.
                          <ul>
                            <li>
                              3일 광고 상품 결제 시 → 3일 이내 중단 요청 시에는 적립되지 않음.
                            </li>
                            <li>
                              7일 광고 상품 결제 시 → 가장 기본 광고 구간으로 7일 이내 광고중단 요청
                              시에 적립되지 않음.
                            </li>
                            <li>
                              10일 광고 상품 결제 시 → 광고중단 기간: 7일이내 광고 중단 요청시 7일
                              요금 차감 후 잔액 적립
                            </li>
                            <li>
                              15일 광고 상품 결제 시 → 광고중단 기간: 7일 이내 7일 차감. 8~10일 이내
                              10일 차감 후 잔액 적립.
                            </li>
                            <li>
                              20일 광고 상품 결제 시 → 광고중단 기간: 7일이내 7일 차감. 8~10일이내
                              10일 차감. 11일~15일 이내 15일 요금 차감 후 잔액 적립.
                            </li>
                            <li>
                              30일 광고 상품 결제 시 → 광고중단 기간: 7일 이내 7일 차감. 8~10일 이내
                              10일 차감. 11일~15일 이내 15일 요금 차감 후 잔액 적립. 16일~20일 이내
                              20일 요금 차감 후 잔액 적립.
                            </li>
                          </ul>
                          <p class="txt">
                            따라서 3일, 7일 광고 상품은 적립금으로 전환되지 않으며 그 외 상품은
                            상위와 같이 구간별로 적립금액을 산정하여 적립금으로 전환 처리됩니다.
                          </p>
                        </li>
                      </ol>
                      <strong class="btit">제14조 (서비스 이용 시간 및 제공 중지)</strong>
                      <ol class="list order">
                        <li>
                          1. 회사는 특별한 사유가 없는 한 연중무휴, 1일 24시간 서비스를 제공합니다.
                          다만, 일부 서비스의 경우 그 종류나 성질을 고려하여 별도로 이용시간을 정할
                          수 있으며, 회사는 그 이용 시간을 회원에게 사전 공지합니다.
                        </li>
                        <li>
                          2. 회사는 서비스 업데이트나 정보 가공, 자료의 갱신을 위한 시스템 유지·보수
                          작업, 시스템 장애 해결을 위한 보수작업, 정기 PM 작업, 시스템 교체 작업이
                          필요하거나 회선 장애 등 서비스를 중단할 합리적인 사유가 발생한 경우,
                          일시적으로 서비스를 중단할 수 있습니다. 계획된 작업의 경우 서비스 중단
                          시간과 작업 내용을 사전에 공지하되, 우발적 장애 발생 등 부득이한 사유가
                          있는 경우에 한하여 그 내용을 사후에 공지할 수 있습니다.
                        </li>
                        <li>
                          3. 회사는 아래사항에 해당하는 경우 서비스의 제공을 중지할 수 있습니다.
                          <ul>
                            <li>
                              ① 설비의 보수 등 회사의 필요에 의해 사전에 회원들에게 공지한 경우
                            </li>
                            <li>② 기간통신사업자가 전기통신서비스 제공을 중지하는 경우</li>
                            <li>
                              ③ 기타 불가항력적인 사유에 의해 서비스 제공이 객관적으로 불가능한 경우
                            </li>
                          </ul>
                        </li>
                        <li>
                          4. 제 2항 내지 3항의 경우, 회사는 기간의 정함이 있는 유료 광고·공고상품
                          또는 유료 서비스를 이용하는 학원회원에게 서비스 제공이 중지된 기간만큼
                          이용기간을 연장하고, 학원회원은 회사에 대하여 별도의 손해배상을 청구할 수
                          없습니다.
                        </li>
                      </ol>
                      <strong class="btit">제15조 (서비스 정보의 제공 및 기타 광고의 게재)</strong>
                      <ol class="list order">
                        <li>
                          1. 회사는 회원이 수신동의한 경우 회원에게 서비스 이용·개선을 위해 필요한
                          사항을 알리거나 각종 상품·서비스 소개, 홍보 등을 위한 정보를 우편물,
                          이메일이나 어플리케이션 푸쉬 알림, 모바일 장치, IoT 등 신종 기술 및 기기를
                          이용한 방법으로 제공할 수 있습니다.
                        </li>
                        <li>
                          2. 회사는 사이트 등에 기타 광고 등을 게재할 수 있으며, 회원이 수신동의한
                          경우 우편물, 이메일이나 어플리케이션 푸쉬 알림, 모바일 장치, IoT 등 신종
                          기술 및 기기를 이용한 방법으로 회원에게 기타 광고 등을 전달할 수 있습니다.
                        </li>
                        <li>
                          3. 회사는 사이트 등에 게재되어 있는 광고주의 판촉활동에 회원이 참여하거나
                          교신 또는 거래를 함으로써 발생하는 모든 손실과 손해에 대해 회사의
                          고의·중과실로 인한 경우가 아닌 한 일체의 책임을 지지 않습니다.
                        </li>
                        <li>
                          4. 회원은 서비스 이용 시 사이트 등에 노출되는 광고 게재에 대해 동의하는
                          것으로 간주합니다.
                        </li>
                      </ol>
                      <strong class="btit"
                        >제16조 (자료 내용의 책임 및 활용과 회사의 정보 수정 권한)</strong
                      >
                      <ol class="list order">
                        <li>
                          1. 개인회원의 경우, 게시물이란 회원이 등록한 개인정보 및 이력서와 기타
                          사이트 등에 게시한 일체의 게시물을 의미합니다.
                        </li>
                        <li>
                          2. 학원회원의 경우, 게시물이란 회원이 등록한 학원정보 및 채용공고와 기타
                          사이트 등에 게시한 일체의 게시물을 의미합니다.
                        </li>
                        <li>
                          3. 회원은 자료 내용 및 게시물을 사실에 근거하여 성실하게 작성해야 하며,
                          만일 자료의 내용이 사실이 아니거나 부정확한 경우 발생하는모든 책임은
                          회원에게 있습니다.
                        </li>
                        <li>
                          4. 모든 게시물의 작성 및 관리는 회원 본인이 하는 것이 원칙이며, 제 3자를
                          통해 위탁 또는 대행 관리를 하더라도 게시물 작성 및 관리에 관련된 일체의
                          책임은 회원에게 귀속됩니다. 회원은 주기적으로 작성된 게시물을 확인하여
                          정확한 내용이 포함될 수 있도록 수정·변경하는 등 일체의 노력을 다하여야
                          합니다.
                        </li>
                        <li>
                          5. 회원이 등록한 게시물 내용에 오·탈자 또는 사회적 통념에 어긋나는 문구가
                          있을 경우, 회사는 사전 고지 없이 이를 수정할 수 있습니다.
                        </li>
                        <li>
                          6. 회원이 등록한 게시물에 대하여 제 3자로부터 허위사실 및 명예훼손 등으로
                          삭제요청이 접수된 경우 회사는 회원에게 사전 통지 없이 해당 게시물을 삭제할
                          수 있으며, 회원에게 해당 게시물의 삭제 사실 및 사유를 사후 통지합니다.
                        </li>
                        <li>
                          7. 회원이 작성한 정보는 회원의 동의를 얻어 고용 및 취업활동, 통계 등
                          훈장마을 운영 서비스에 활용될 수 있으며 언론 매체에 배포될 수 있습니다.
                        </li>
                      </ol>
                      <strong class="btit">제17조 (회사의 의무)</strong>
                      <ol class="list order">
                        <li>
                          1. 회사는 본 약관에서 정한 내용에 따라 서비스를 안정적·계속적으로 제공할
                          수 있도록 최선을 다하여 노력합니다.
                        </li>
                        <li>
                          2. 서비스 이용이나 운영과 관련된 회원의 불만사항이 접수되는 경우, 회사는
                          이를 지체없이 처리하여 그 결과를 회신할 수 있도록 노력합니다. 다만,
                          불만사항 내용 확인 및 경위 파악, 접수 내용 처리 등에 상당한 시간이 소요될
                          경우, 회사는 그 사유와 처리일정을 회원에게 통지합니다.
                        </li>
                        <li>
                          3. 회사는 유료 결제와 관련한 결제사항 정보를 관련 규정에 의하여 5년간
                          보존합니다.
                        </li>
                        <li>
                          4. 회사는 서비스에 관련된 설비를 항상 운용할 수 있는 상태로 유지·보수하고,
                          장애가 발생하는 경우 지체 없이 이를 수리·복구할 수 있도록 최선의 노력을
                          다하여야 합니다.
                        </li>
                        <li>
                          5. 천재지변 등 예측하지 못한 일이 발생하거나 시스템의 장애가 발생하여
                          서비스가 중단될 경우, 이에 대한 손해에 대해서는 회사가 책임을 지지 않으나,
                          자료의 복구나 정상적인 서비스 지원이 되도록 최선을 다할 의무를 집니다.
                        </li>
                        <li>
                          6. 학원회원이 노출하는 채용정보는 학원회원의 동의를 얻어 사이트를 방문한
                          방문자에게 모두 공개함을 원칙으로 하며 회사는 공개기간을 지정할 수
                          있습니다. 단, 일부 항목에 대해 학원회원이 비공개 설정을 한 경우에는 회사는
                          해당 항목에 대해서 비공개를 할 의무가 있습니다.
                        </li>
                        <li>
                          7. 회사는 정보통신망이용촉진 및 정보보호 등에 관한 법률 제 50조에 따라
                          회원의 명시적인 사전 동의를 받지 아니하고 회원에게 전화, SMS, 이메일
                          등으로 광고성 정보를 전송하는 행위를 할 수 없습니다.
                        </li>
                      </ol>
                      <strong class="btit">제18조 (회원의 의무)</strong>
                      <ol class="list order">
                        <li>
                          1. 회원은 관계법령과 본 약관의 규정, 회사가 통지하는 사항을 준수하여야
                          하며, 기타 회사의 업무에 방해되거나 회사의 명예 또는 타인에게 피해를 주는
                          행위를 해서는 안됩니다.
                        </li>
                        <li>
                          2. 회원이 신청한 유료 광고·공고 또는 유료 서비스는 등록 또는 신청과 동시에
                          회사와 채권, 채무 관계가 발생하며, 회원은 이용요금을 지정된 납기일에
                          납부하여야 합니다.
                        </li>
                        <li>
                          3. 회원이 결제 수단으로 신용카드를 사용할 경우 비밀번호 등 결제정보 유실
                          방지는 회원 스스로 관리해야 합니다. 다만, 사이트의 결함에 따른 결제정보
                          유실의 발생에 대한 책임은 회원이 부담하지 않습니다.
                        </li>
                        <li>
                          4. 회원은 서비스를 이용하여 얻은 정보를 회사의 사전 승낙 없이 복사, 복제,
                          변경, 번역, 배포, 전송, 출판·방송 등 기타의 방법으로 사용하거나 이를
                          타인에게 제공할 수 없습니다.
                        </li>
                        <li>
                          5. 회원은 가입 시 부여된 아이디와 비밀번호의 부정사용, 관리 소홀 등에 대한
                          결과 책임은 회원에게 있으며 회원은 자신의 아이디나 비밀번호가 타인에 의해
                          부정사용 된 사실을 발견한 경우, 즉시 회사에 알려야 합니다.
                        </li>
                        <li>
                          6. 회원은 서비스 이용과 관련하여 아래사항의 행위를 해서는 안됩니다.
                          <ul>
                            <li>① 다른 회원의 아이디를 부정 사용하는 행위</li>
                            <li>② 범죄행위를 목적으로 하거나 기타 범죄행위와 관련된 행위</li>
                            <li>③ 타인의 명예를 훼손하거나 모욕하는 행위</li>
                            <li>④ 타인의 지적재산권 등의 권리를 침해하는 행위</li>
                            <li>⑤ 해킹행위 또는 바이러스 유포 행위</li>
                            <li>
                              ⑥ 타인의 의사에 반하여 광고성 정보 등 일정한 내용을 계속적으로
                              전송하는 행위
                            </li>
                            <li>
                              ⑦ 서비스의 안정적인 운영에 지장을 주거나 줄 우려가 있다고 판단되는
                              행위
                            </li>
                            <li>⑧ 사이트의 정보 및 서비스를 이용한 영리 행위</li>
                            <li>
                              ⑨ 그밖에 선량한 풍속, 기타 사회질서를 해하거나 관계법령에 위반하는
                              행위
                            </li>
                          </ul>
                        </li>
                        <li>
                          7. 학원회원은 사이트 등을 통해 열람한 이력서 정보를 회사 및 당사자의 허락
                          없이 재배포할 수 없으며, 본 정보에 대한 출력 및 복사 등의 관리 책임은
                          전적으로 학원회원에게 있습니다.
                        </li>
                        <li>
                          8. 회사는 학원회원 자격 보유 여부를 확인하기 위하여 학원회원에게
                          사업자등록증의 제출을 요청할 수 있으며, 학원회원은 이에 응하여야 합니다.
                          회사의 증빙 자료 제출 요청에 상당기간 동안 응하지 않는 경우, 서비스
                          이용중지, 강제탈퇴, 재가입 제한 조치 등의 제재조치를 받게 됩니다.
                        </li>
                        <li>
                          9. 회원은 회사의 사전 승낙 없이 서비스를 이용하여 어떠한 영리행위도 할 수
                          없습니다.
                        </li>
                      </ol>
                      <strong class="btit">제19조 (적립금의 적립 및 이용)</strong>
                      <ol class="list order">
                        <li>
                          1. 적립금은 유료 광고·공고상품 또는 유료 서비스의 구매, 이벤트, 프로모션
                          기타 고객 보상 등의 사유로 적립됩니다. 단, 동일한 학원회원이 두 개 이상의
                          아이디를 사용할 경우 특정 아이디로 적립금을 통합하여 적립하거나 사용할 수
                          없습니다.
                        </li>
                        <li>
                          2. 학원회원이 적립한 적립금은 사이트 등에서 유료 광고·공고상품이나 유료
                          서비스 결제 시 1원 당 1원의 가치로 현금처럼 사용 가능합니다. 단, 적립금은
                          현금으로 출금될 수 없습니다.
                        </li>
                        <li>3. 적립금은 5,000원 이상부터 1,000원 단위로 사용이 가능합니다.</li>
                        <li>
                          4. 적립금 적립 시 별도의 유효기간을 정한 바가 없으면 적립일로부터
                          1년(365일)의 유효기간을 가지며, 별도의 유효기간이 설정된 경우 그 기간에
                          따릅니다.
                        </li>
                        <li>
                          5. 적립금을 이용하여 결제한 유료 광고·공고상품 구매나 유료 서비스 이용을
                          해제, 해지 또는 취소할 경우, 학원회원은 당시 사용한 적립금을 재적립 받을
                          수 없습니다.
                        </li>
                        <li>
                          6. 적립금의 이용은 회사 정책에 따라 유료 광고·공고상품이나 유료 서비스별
                          적립기준, 적립률, 사용조건 및 제한 등이 달라질 수 있으며, 회사는 이의 변경
                          내용 적용일 30일 전까지 학원회원에게 사전 공지합니다.
                        </li>
                        <li>
                          7. 제 1항의 적립 사유가 해제, 해지 또는 취소되었을 경우, 회사는 해당
                          사유로 학원회원에게 적립된 적립금을 회수하며, 회수할 적립금이 없을 경우
                          최종 환불금액에서 차감합니다.
                        </li>
                        <li>
                          8. 적립금의 소멸
                          <ul>
                            <li>
                              ① 적립금은 소멸 예정일시가 가까운 적립금부터 순차적으로 소멸됩니다.
                            </li>
                            <li>
                              ② 소멸 사실은 회사가 공지사항, SMS, 알림톡, 이메일 중 선택하여
                              통지합니다.
                            </li>
                            <li>
                              ③ 소멸되는 적립금은 다른 아이디 또는 재가입한 아이디로 이관 사용할 수
                              없습니다.
                            </li>
                            <li>
                              ④ 두 개 이상의 아이디를 사용할 경우, 하나의 아이디로 적립금을 합쳐서
                              사용할 수 없습니다.
                            </li>
                          </ul>
                        </li>
                      </ol>
                      <strong class="btit"
                        >제20조 (서비스 이용계약 해지/서비스 중지 및 자료삭제)</strong
                      >
                      <ol class="list order">
                        <li>
                          1. 회원이 서비스 이용계약을 해지하고자 하는 때에는 회원 로그인 이후
                          회원정보수정 안에 있는 “회원탈퇴”를 이용해 해지 신청을 해야하고, 회사는
                          즉시 가입해지(회원탈퇴)에 필요한 조치를 취해야합니다.
                        </li>
                        <li>
                          2. 회원이 서비스 이용계약을 해지한 경우, 회사는 해지 즉시 회원의 모든
                          정보를 파기합니다. 다만, 각 아래사항에 해당하는 경우는 보유 목적에 필요한
                          최소한의 정보를 보관할 수 있습니다.
                          <ul>
                            <li>
                              ① 관련 법령 및 개인정보 처리방침에 따라 회사가 회원 정보를 보유할 수
                              있는 경우
                            </li>
                            <li>
                              ② 회원이 회사의 제재조치를 회피하기 위하여 서비스 이용계약 해지를
                              신청한 것으로 판단되어 재가입 방지에 필요한 회원의 정보를 보관하는
                              경우
                            </li>
                          </ul>
                        </li>
                        <li>
                          3. 해지와 동시에 회원의 모든 권한과 적립금은 소멸되고 회사는 관련법 등이
                          정하는 바에 따라 이를 처리합니다.
                        </li>
                        <li>
                          4. 회원이 제 18조 내용을 위반하고 이를 소정 기간 내에 해소하지 않는 경우
                          회사는 회원에게 사전동의 없이 서비스 이용계약 해지/서비스 중지 및 자료삭제
                          조치를 취할 수 있습니다.
                        </li>
                        <li>
                          5. 아래사항에 해당하는 개인회원의 경우, 회사는 개인회원에게 사전동의 없이
                          서비스 이용계약 해지/서비스 중지 및 자료삭제 조치를 취할 수 있습니다.
                          <ul>
                            <li>① 회원의 의무를 성실하게 이행하지 않은 경우</li>
                            <li>② 규정한 유료서비스 이용 요금을 납부하지 않은 경우</li>
                            <li>
                              ③ 본 서비스 목적에 맞지 않는 분야의 정보를 활용하여 사회적 물의가
                              발생한 경우
                            </li>
                            <li>④ 회원이 등록한 정보의 내용이 사실과 다르거나 조작된 경우</li>
                            <li>⑤ 기타 본 서비스의 명예를 훼손한 경우</li>
                          </ul>
                        </li>
                        <li>
                          6. 아래사항에 해당하는 학원회원의 경우, 회사는 학원회원에게 사전동의 없이
                          서비스 이용계약 해지/서비스 중지 및 자료삭제 조치를 취할 수 있습니다.
                          <ul>
                            <li>① 회원의 의무를 성실하게 이행하지 않은 경우</li>
                            <li>② 규정한 유료서비스 이용 요금을 납부하지 않은 경우</li>
                            <li>③ 불순한 의도로 유료 서비스를 반복적으로 결제/취소한 경우</li>
                            <li>
                              ④ 본 서비스 목적에 맞지 않는 분야의 정보를 활용하여 사회적 물의가
                              발생한 경우
                            </li>
                            <li>
                              ⑤ 회원이 등록한 정보의 내용이 사실과 다르거나 조작된 경우 또는
                              사업자등록증에 나타난 정보와 회원가입 시 입력한 정보가 일치하지 않는
                              경우
                            </li>
                            <li>
                              ⑥ 타 학원의 정보(사업자등록번호, 상호)를 사용하거나 휴·폐업
                              사업자등록번호로 정보를 등록한 경우
                            </li>
                            <li>
                              ⑦ 지사, 지점, 영업소 등의 경우 구체적인 지사, 지점, 영업소 명칭을
                              사용하지 않고 학원명을 등록했거나 지사, 지점, 영업소의
                              사업자등록번호가 별도로 있음에도 불구하고 본사의 사업자등록번호로
                              학원회원 가입을 한 경우
                            </li>
                            <li>
                              ⑧ 학원회원 가입 또는 채용공고 등록 시, 본 서비스에서 안내하는 방법으로
                              가입하지 않았거나 등록하지 않은 경우
                            </li>
                            <li>⑨ 허위 구인공고를 등록한 경우</li>
                            <li>
                              ⑩ 공고 작성자가 제시한 직종, 업무내용, 근로조건 등이 실제와 현저히
                              다른 경우
                            </li>
                            <li>
                              ⑪ 모집요강에 적합한 업직종 분류를 지정하지 않은 경우 (특히,
                              교육기관이나 이벤트 업체 또는 영업대행 기관의 경우 영업, 마케팅,
                              텔레마케팅, 상담 인력을 모집하고자 할 경우 반드시 텔레마케팅 또는
                              고객상담, 교육/강사/학원 등 반드시 직접 관련되는 해당 업종, 직종
                              분류만 지정해야 합니다.)
                            </li>
                            <li>⑫ 불건전한 내용의 유흥업소 채용공고를 등록한 경우</li>
                            <li>
                              ⑬ 구직자의 피해사례(채용공고를 통해 구직자가 입사 과정 또는 재직중에
                              피해가 발생한 경우, “학원회원”이 관계법령을 위반하여 피해가 발생한
                              경우 등)가 접수된 채용공고의 경우
                            </li>
                            <li>
                              ⑭ 임금체불로 근로감독원에 진정서가 접수되거나, 관계 당국에
                              고소·고발되어 있는 학원(단, 학원의 임금체불 해소가 입증되면 확인 후
                              서비스 이용 가능)
                            </li>
                            <li>⑮ 기타 본 서비스의 명예를 훼손한 경우</li>
                          </ul>
                        </li>
                        <li>
                          7. 회사는 제한된 회원이 다시 이용신청을 하는 경우, 일정기간 그 승낙을
                          제한할 수 있습니다.
                        </li>
                        <li>
                          8. 회사는 서비스의 게시물 또는 내용물이 규정에 위반되거나 회사 소정의
                          게시기간을 초과하는 경우 사전 통지나 동의 없이 이를 삭제할 수 있습니다.
                        </li>
                        <li>
                          9. 회원의 휴면 계정 상태
                          <ul>
                            <li>
                              ① 회원이 선택한 개인정보 보유기간(1년, 3년, 5년, 회원탈퇴시)동안
                              로그인을 하지 않은 경우 해당 회원의 아이디는 휴면아이디가 되어 회원
                              로그인을 비롯한 모든 서비스에 대한 이용이 정지되고, 회사는
                              휴면아이디의 개인정보를 다른 아이디와 별도로 관리합니다.
                            </li>
                            <li>
                              ② 회사는 휴면아이디 처리 30일 전 이메일, 서면, SMS, 사이트 공지 중
                              하나의 방법으로 사전 안내를 하고, 다시 이메일, 서면, SMS, 사이트 공지
                              중 하나의 방법으로 서비스 이용중지에 대하여 안내하게 됩니다. 회원은
                              휴면 아이디의 해지를 위한 본인확인 절차를 거쳐 서비스를 정상적으로
                              이용할 수 있고, 회사는 서비스 이용이 중지된 휴면 아이디를 별도
                              관리합니다.
                            </li>
                            <li>
                              ③ 휴면계정으로 전환되고 사이트 등에 5년간 미접속 시, 서비스 미이용자는
                              휴면회원에서 탈퇴회원으로 전환됩니다. 탈퇴회원으로 전환됨과 동시에
                              서비스 미이용자의 개인정보는 모두 파기됩니다.
                            </li>
                          </ul>
                        </li>
                      </ol>
                      <strong class="btit">제21조 (면책 및 손해배상)</strong>
                      <ol class="list order">
                        <li>
                          1. 회사가 이 약관의 규정을 위반한 행위로 이용자에게 손해를 입히거나 기타
                          회사가 제공하는 모든 서비스와 관련하여 회사의 책임이 있는 사유로 인해
                          회원에게 손해가 발생한 경우 회사는 그 손해를 배상해야 합니다.
                        </li>
                        <li>
                          2. 회사는 회원이 서비스에 게재한 정보, 자료, 사실의 정확성, 신뢰성 등 그
                          내용에 관하여 어떠한 책임을 지지 않고, 회원은 자기의 책임 아래 서비스를
                          이용하며, 서비스를 이용하여 게시 또는 전송한 자료 등에 관하여 손해가
                          발생하거나 자료의 취사선택, 기타 서비스 이용과 관련하여 어떠한 불이익이
                          발생할 경우 이에 대한 모든 책임은 회원에게 있습니다.
                        </li>
                        <li>
                          3. 회원이 이 약관의 규정을 위반한 행위로 회사 및 제 3자에게 손해를
                          입히거나 회원의 책임 있는 사유로 인해 회사 및 제 3자에게 손해를 입힌 경우,
                          회원은 그 손해를 배상해야 합니다.
                        </li>
                        <li>
                          4. 회사는 회원이 서비스를 이용하여 기대하는 수익을 얻지 못하거나 상실한
                          것에 대해 책임을 지지 않으며, 회사가 무료로 제공하는 서비스의 이용과
                          관련하여 개인정보처리방침에서 정하는 내용에 위반하지 않은 한 어떠한 손해도
                          책임지지 않습니다.
                        </li>
                        <li>
                          5. 회원 아이디와 비밀번호의 관리 및 이용상의 부주의로 인하여 발생되는 손해
                          또는 제 3자에 의한 부정사용 등에 대한 책임은 모두 회원에게 있습니다.
                        </li>
                        <li>
                          6. 회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 이용자에게
                          서비스를 제공할 수 없는 경우 서비스 제공에 관한 책임이 면제됩니다.
                        </li>
                        <li>
                          7. 회사는 서비스 이용과 관련하여 회원에게 발생한 손해 가운데 회원의 고의,
                          과실 및 회원의 귀책사유로 인한 서비스 이용의 장애 및 손해에 대하여 고의
                          또는 중과실이 없는 한 책임을 지지 않습니다.
                        </li>
                      </ol>
                      <strong class="btit">제22조 (양도금지)</strong>
                      <p class="txt">
                        회원은 서비스의 이용권한, 기타 이용계약상 지위를 타인에게 양도·증여할 수
                        없으며, 이를 담보로 제공할 수 없습니다.
                      </p>
                      <strong class="btit">제23조 (허위 구인광고 경고)</strong>
                      <ol class="list order">
                        <li>
                          1. 회사는 회원의 개인정보보호를 위하여 노력해야 합니다. 회원의
                          개인정보보호에 관해서는 정보통신망이용촉진 및 정보보호 등에 관한 법률에
                          따르고, 사이트에 “개인정보처리방침”을 고지합니다.
                        </li>
                        <li>
                          2. 허위 구인광고 또는 허위 구인조건을 제시한 자는 직업안정법 제 47조에
                          의해 5년 이하의 징역 또는 5천만원 이하의 벌금형을 받게 됩니다.
                        </li>
                      </ol>
                      <strong class="btit">제24조 (분쟁의 해결)</strong>
                      <ol class="list order">
                        <li>
                          1. 회사와 회원은 서비스와 관련하여 발생한 분쟁을 원만하게 해결하기 위하여
                          필요한 모든 노력을 해야 합니다.
                        </li>
                        <li>
                          2. 제 1항의 규정에도 불구하고 회사와 회원 간에 발생한 분쟁에 관한 소송이
                          제기될 경우, 민사소송법에 따른 관할법원을 제 1심 관할법원으로 지정합니다.
                        </li>
                      </ol>

                      <h5 class="btit">부칙</h5>
                      <strong class="btit">제 1조 (변경일)</strong>
                      <p class="txt">이 약관은 2019년 11월 01일 변경한다.</p>
                      <strong class="btit">제 2조 (시행일)</strong>
                      <p class="txt">이 약관은 2019년 11월 01일부터 시행한다.</p>
                    </div>
                  </li>
                  <li>
                    <p class="tit">
                      개인정보수집 및 이용 동의 <span class="must point1">(필수)</span>
                    </p>
                    <div class="right">
                      <a href="#" class="view-terms">상세보기</a>
                      <span class="achk">
                        <input
                          type="checkbox"
                          name="chk_private"
                          id="agchk2"
                          class="dginChk jAgreeItem"
                        />
                        <label for="agchk2" class="label-hidden label-chk"
                          >개인정보수집 및 이용 동의 체크</label
                        >
                      </span>
                    </div>
                    <div class="terms-cont">
                      <div id="page1-offset">
                        <strong class="btit">1. 개인정보 수집 및 이용목적</strong>
                        <p class="txt">
                          ① 회사는 서비스 제공을 위한 최소한의 범위 내에서 이용자의 동의 하에
                          개인정보를 수집하며, 수집한 모든 개인정보는 고지한 목적 범위 내에서만
                          사용됩니다. 회사에서 제공하는 서비스 유형에 따라 다음과 같이 개인정보를
                          수집, 이용, 보유 및 파기하고 있습니다.
                        </p>
                        <table>
                          <colgroup>
                            <col style="width:10%;" />
                            <col style="width:10%;" />
                            <col style="width:40%;" />
                            <col style="width:40%;" />
                          </colgroup>
                          <thead>
                            <tr>
                              <th colspan="2">수집방법</th>
                              <th>수집항목</th>
                              <th>수집 및 이용목적</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th rowspan="5" colspan="2">회원가입</th>
                              <td>
                                (필수-개인회원) 휴대폰번호, 아이디, 비밀번호, 이름, 생년월일, 성별,
                                이메일, 거주지, 과목
                              </td>
                              <td>
                                본인 확인 및 가입의사 확인, 상담 및 문의처리, 회원 맞춤형 채용정보
                                제공
                              </td>
                            </tr>
                            <tr>
                              <td>
                                (필수-만14세 미만 개인회원) 법정대리인의 이름, 연락처,
                                본인인증정보(CI, DI), 아이핀 정보
                              </td>
                              <td>법정대리인의 동의 여부 확인 목적</td>
                            </tr>
                            <tr>
                              <td>
                                (선택-개인회원) 마케팅 정보 수신 동의(이메일, 문자메세지/알림톡,
                                개인정보 유효기간 선택
                              </td>
                              <td>
                                신규 서비스 안내, 설문, 이벤트 관련 정보 및 참여 기회 제공, 광고 및
                                마케팅 정보
                              </td>
                            </tr>
                            <tr>
                              <td>
                                (필수-학원회원) 본인확인값 또는 아이핀인증결과, 아이디, 비밀번호,
                                휴대폰번호, 이메일, 학원명, 대표자명, 사업자번호, 학원연락처, 과목,
                                대상, 학원주소
                              </td>
                              <td>
                                서비스 이용에 따른 본인확인, 가입의사 확인, 상담 및 문의 처리, 회원
                                맞춤형 정보 제공, 공지사항 전달
                              </td>
                            </tr>
                            <tr>
                              <td>
                                (선택-학원회원) 홈페이지 주소, 앤써통 구독 여부, 마케팅 정보 수신
                                동의(이메일, 문자메세지/알림톡), 개인정보 유효기간 선택
                              </td>
                              <td>
                                신규 서비스 안내, 설문, 이벤트 관련 정보 및 참여 기회 제공, 앤써통
                                발송, 광고 및 마케팅 정보 제공
                              </td>
                            </tr>
                            <tr>
                              <th rowspan="2" colspan="2">이력서 작성</th>
                              <td>
                                (필수) 기본정보(이름, 생년월일, 나이, 성별, 휴대폰 번호, 이메일,
                                거주지), 이력서 제목, 학력사항(학교명, 재학기간, 전공, 지역),
                                경력사항(경력구분, 학원명, 근무기간, 근무조건), 희망근무조건(지역,
                                과목, 근무형태, 대상), 자기소개서
                              </td>
                              <td rowspan="2">
                                이력서 등록을 통한 입사지원 등 취업활동 서비스 제공, 강사를
                                채용하고자 하는 학원회원에게 이력서 정보 제공
                              </td>
                            </tr>
                            <tr>
                              <td>(선택) 자격증/면허증, 어학시험, 교육이수</td>
                            </tr>
                            <tr>
                              <th rowspan="2" colspan="2">채용공고 등록</th>
                              <td>
                                (필수) 채용공고 제목, 모집분야(분야(과목), 모집구분, 수강대상,
                                경력구분, 모집인원), 제출서류, 상세정보, 학원정보(담당자명, 학원명,
                                연락처, 이메일, 학원주소)
                              </td>
                              <td rowspan="2">
                                공고 등록을 통한 지원자 관리 등 구인활동 서비스 제공
                              </td>
                            </tr>
                            <tr>
                              <td>
                                (선택) 응시자격(학력, 자격증, 면허), 급여조건, 근무시작일, 이력서
                                양식, 전형방법, 학원주소, 지도 공개여부, 인근 지하철, 학원사진,
                                채용상품선택 및 결제
                              </td>
                            </tr>
                            <tr>
                              <th colspan="2">유료서비스 이용</th>
                              <td>
                                (필수) 결제정보(카드(카드사명, 카드번호, 할부기간), 실시간
                                계좌이체(은행명, 계좌번호)), 계산서 발행정보 및 수령자 정보
                              </td>
                              <td>
                                유료서비스 구매 및 이용 시 요금 정산<br />*결제정보는
                                결제대행업체에서만 저장하며, 당사는 저장 및 관리하고 있지 않습니다.
                              </td>
                            </tr>
                            <tr>
                              <th rowspan="2">강남엄마<br />광고서비스</th>
                              <th>신청시</th>
                              <td>
                                학원명, 대표자명, 학원연락처, 학원주소, 신청자명, 신청자 연락처,
                                아이디, 광고 집행 시 필요한 상담 내용
                              </td>
                              <td>서비스 신청 및 회원 맞춤형 서비스 제공 및 관리</td>
                            </tr>
                            <tr>
                              <th>환불시</th>
                              <td>은행명, 계좌번호, 예금주(환불 계좌정보)</td>
                              <td>서비스 결제 금액 환불 진행</td>
                            </tr>
                          </tbody>
                        </table>
                        <p class="txt">&lt;서비스 이용에 따른 자동 수집 및 생성 정보&gt;</p>
                        <table>
                          <thead>
                            <tr>
                              <th>수집항목</th>
                              <th>수집 및 이용목적</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                쿠키, 서비스이용기록(방문일시, IP, 불량이용기록), 모바일
                                기기정보(디바이스토큰, 디바이스ID, IP주소)
                              </td>
                              <td>
                                접속관리, 이용자별 사용환경 제공, 활동정보 파악, 이벤트 및 프로모션
                                통계 확인, 맞춤형 채용정보 제공
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <p class="txt">
                          귀하는 회사가 위와 같이 수집하는 개인정보에 대해 동의하지 않거나
                          개인정보를 기재하지 않음으로써 거부할 수 있습니다. 다만, 이때 회원에게
                          제공되는 서비스가 제한될 수 있습니다.
                        </p>
                        <p class="txt">
                          ② 회사는 모바일앱 서비스를 위하여 이용자의 스마트폰 내 정보 및 기능 중
                          아래 사항에 대해 접근 합니다. 필수 접근항목은 앱 설치 또는 최초 실행 시
                          안내 및 동의를 받으며, 선택 접근항목은 해당 서비스 이용 시 별도 동의를
                          받습니다. (선택항목 거부로 인한 기본 서비스 이용 제한은 없음)
                        </p>
                        <table>
                          <thead>
                            <tr>
                              <th>구분</th>
                              <th>접근항목</th>
                              <th>접근목적</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th>필수 접근</th>
                              <td>(IOS) UUID</td>
                              <td>사용자 식별</td>
                            </tr>
                            <tr>
                              <th>선택 접근</th>
                              <td>
                                (IOS) 카메라, 사진, 마이크<br />(Android) 저장공간(사진/미디어/파일)
                              </td>
                              <td>프로필 및 파일 등록(이력서)</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div id="page4-offset">
                        <strong class="btit">4. 개인정보 보유 및 이용기간</strong>
                        <p class="txt">
                          ① 회사는 회원가입일로부터 서비스를 제공하는 기간 동안에 한하여 이용자의
                          개인정보를 보유 및 이용하게 됩니다. 회원탈퇴를 요청하거나 개인정보의 수집
                          및 이용에 대한 동의를 철회하는 경우, 수집 및 이용목적이 달성되거나
                          이용기간이 종료한 경우 개인정보를 지체없이 파기합니다. 단, 다음의 경우에
                          대해서는 각각 명시한 이유와 기간 동안 보존합니다.
                        </p>
                        <p class="txt">② 관련 법령에 의한 개인정보 보유</p>
                        <ol class="list order">
                          <li>1. 서비스 이용기록, 접속로그, 접속IP정보: 3개월</li>
                          <li>2. 표시·광고에 관한 기록: 6개월</li>
                          <li>3. 계약 또는 청약철회 등에 관한 기록: 5년</li>
                          <li>4. 대금결제 및 재화 등의 공급에 관한 기록: 5년</li>
                          <li>5. 소비자의 불만 또는 분쟁처리에 관한 기록: 3년</li>
                          <li>6. 부정이용 등에 관한 기록: 5년</li>
                          <li>7. 세금계산서, 영수증 등 거래내역 관련 정보: 5년</li>
                        </ol>
                        <p class="txt">③ 휴면계정 정책</p>
                        <ol class="list order">
                          <li>
                            1. 개인정보 보호를 위해 회원이 회원가입 시 선택한
                            "개인정보유효기간"(1년, 3년, 5년) 동안 사이트 등에 로그인을 하지 않은
                            경우 해당 회원의 개인정보는 일반 회원의 개인정보와 분리되어 별도로 저장
                            및 관리되고 회원 계정은 휴면계정으로 전환됩니다.
                          </li>
                          <li>
                            2. 회사는 휴면계정 처리 예정일로부터 30일 이전에 해당사실을 전자메일,
                            서면, SMS 중 하나의 방법으로 사전통지합니다. 후에 이용자가 직접
                            본인확인을 거쳐 다시 사이트 등에 이용 의사표시를 한 경우에는 사이트 등을
                            이용할 수 있습니다.
                          </li>
                          <li>
                            3. 분리 저장된 개인정보는 관련 법령에 특별한 규정이 있는 경우를 제외하고
                            해당 개인정보를 이용하거나 제공하지 않으며, 관련 법령에 따라
                            일정기간동안 보유되고 해당 기간 종료 후 파기됩니다. 다만, 파기되지 않은
                            개인정보는 해당 이용자의 요청에 따라 서비스 이용을 재개하는 시점에 다시
                            제공됩니다.
                          </li>
                          <li>
                            4. 휴면계정으로 전환되고 사이트 등에 5년간 미접속 시, 휴면회원에서
                            탈퇴회원으로 전환됩니다. 탈퇴회원으로 전환됨과 동시에 회원의 개인정보는
                            모두 파기됩니다.
                          </li>
                        </ol>
                      </div>
                    </div>
                  </li>
                  <li>
                    <span class="tit"
                      >개인정보처리위탁에 대한 동의 <span class="must point1">(필수)</span></span
                    >
                    <div class="right">
                      <a href="#" class="view-terms">상세보기</a>
                      <span class="achk">
                        <input
                          type="checkbox"
                          name="chk_private2"
                          id="agchk3"
                          class="dginChk jAgreeItem"
                        />
                        <label for="agchk3" class="label-hidden label-chk"
                          >개인정보처리위탁에 대한 동의 체크</label
                        >
                      </span>
                    </div>
                    <div class="terms-cont">
                      <div id="page2-offset">
                        <strong class="btit">2. 개인정보 처리 위탁</strong>
                        <p class="txt">
                          회사는 개인정보의 처리와 서비스 향상을 위하여 아래와 같이 업무를 위탁하고
                          있으며, 관계법령에 따라 위탁 처리되는 개인정보가 안전하게 관리될 수 있도록
                          필요한 조치를 취하고 있습니다.
                        </p>
                        <p class="txt">
                          ① 위탁처리하는 정보는 서비스 제공에 필요한 최소한의 범위에 국한됩니다.
                          위탁사항이 변경되는 경우 해당 사실을 알려드리겠습니다.
                        </p>
                        <table>
                          <thead>
                            <tr>
                              <th>수탁업체</th>
                              <th>위탁업무내용</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>㈜토스페이먼츠</td>
                              <td>
                                결제(신용카드, 실시간계좌이체, 가상계좌, 한방결제), 안심번호 서비스,
                                SMS발송
                              </td>
                            </tr>
                            <tr>
                              <td>㈜다우데이터</td>
                              <td>결제처리 (신용카드, 실시간 계좌이체)</td>
                            </tr>
                            <tr>
                              <td>NICE신용평가정보㈜</td>
                              <td>회원가입 시 실명인증, 아이핀인증</td>
                            </tr>
                            <tr>
                              <td>㈜더존비즈온</td>
                              <td>계산서 발행</td>
                            </tr>
                            <tr>
                              <td>비즈톡㈜</td>
                              <td>카카오 알림톡 발송 대행</td>
                            </tr>
                            <tr>
                              <td>㈜모바일이앤엠애드,11번가㈜</td>
                              <td>모바일 쿠폰발송</td>
                            </tr>
                            <tr>
                              <td>㈜해오름커뮤니케이션즈</td>
                              <td>앤써통 제작, 물품배송 또는 청구지 등 발송</td>
                            </tr>
                            <tr>
                              <td>우체국 택배</td>
                              <td>앤써통 배송</td>
                            </tr>
                          </tbody>
                        </table>
                        <p class="txt">
                          ② 회사는 위탁계약 체결시 위탁업무 수행목적 외 개인정보 처리금지,
                          기술적·관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리·감독, 손해배상 등
                          책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게
                          처리하는지를 관리·감독하고 있습니다.
                        </p>
                        <p class="txt">
                          ③ 다음의 경우에는 합당한 절차를 통한 이용자의 동의를 얻어 개인정보를 제공
                          또는 이용할 수 있습니다.
                        </p>
                        <ul class="list order">
                          <li>
                            1. 매각·인수합병 등 서비스 제공자의 권리와 의무가 완전 승계·이전되는
                            경우 반드시 사전에 정당한 사유와 절차에 대해 상세하게 고지할 것이며
                            이용자의 개인정보에 대한 동의 철회의 선택권을 부여합니다.
                          </li>
                          <li>
                            2. 보다 나은 서비스 제공을 위하여 서비스 이용자의 개인정보를 제휴사에게
                            제공하거나 또는 제휴사와 공유를 할 경우 개별적인 동의를 구하는 절차를
                            거칩니다. 동의가 없는 경우에는 제휴사에 개인정보를 제공하지 않습니다.
                          </li>
                          <li>
                            3. 다만, 관계법령에 의거하거나, 수사 목적으로 법령에 정해진 절차와
                            방법에 따라 수사기관의 요구가 있는 경우는 예외로 합니다.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li>
                    <span class="tit"
                      >마케팅 정보 수신 동의 - 이메일
                      <span style="font-size:14px;color:000;">(선택)</span></span
                    >
                    <div class="right">
                      <span class="achk">
                        <input
                          type="checkbox"
                          name="chk_adEmail"
                          id="chk_adEmail"
                          class="dginChk jAgreeItem"
                        />
                        <label for="chk_adEmail" class="label-hidden label-chk">이메일</label>
                      </span>
                    </div>
                  </li>
                  <li>
                    <span class="tit"
                      >마케팅 정보 수신 동의 - 문자메세지/알림톡
                      <span style="font-size:14px;color:000;">(선택)</span></span
                    >
                    <div class="right">
                      <span class="achk">
                        <input
                          type="checkbox"
                          name="chk_adSms"
                          id="chk_adSms"
                          class="dginChk jAgreeItem"
                        />
                        <label for="chk_adSms" class="label-hidden label-chk">이메일</label>
                      </span>
                    </div>
                  </li>
                </ul>
                <div class="info-area">
                  <p class="desc-noti">
                    ※ 마케팅 수신 동의를 하지 않으면 이벤트, 교육소식 등의 정보를 받아보실 수
                    없습니다.
                  </p>
                  <p class="desc-noti">
                    ※ 서비스 이용상 필요한 공지메일은 동의 여부와 관계없이 받아보실 수 있습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="ainput-wrap">
            <ul class="tbl-aform">
              <li>
                <span class="tit">
                  개인정보 유효기간 선택
                  <span class="hint-wrap">
                    <span class="ico"></span>
                    <div class="hint-cont" style="width:400px;">
                      개인정보 유효기간제에 따라 가입하신 ID로<br />
                      선택하신 기간 동안 서비스를 이용하지 않을 경우,<br />
                      휴면회원으로 전환되어 이용자의 개인정보를 별도 분리 보관합니다.<br />
                      분리 보관된 개인정보는 5년간 보관 후 지체없이 파기합니다.
                    </div>
                  </span>
                </span>
                <div class="distable">
                  <div class="cell right" style="height:36px;">
                    <span class="achk">
                      <input
                        type="radio"
                        id="valid1"
                        class="dginRdio"
                        name="pInfoSaveType"
                        value="1"
                      />
                      <label for="valid1" class="label-chk">1년</label>
                    </span>
                    <span class="achk">
                      <input
                        type="radio"
                        id="valid2"
                        class="dginRdio"
                        name="pInfoSaveType"
                        value="3"
                      />
                      <label for="valid2" class="label-chk">3년</label>
                    </span>
                    <span class="achk">
                      <input
                        type="radio"
                        id="valid3"
                        class="dginRdio"
                        name="pInfoSaveType"
                        checked=""
                        value="5"
                      />
                      <label for="valid3" class="label-chk">5년</label>
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- // * 이력서 팝업 -->
          <div class="btnWrap type">
            <a href="#layPop-joinOk" class="pop-joinOk" id="LayerPop" style="display:none;"
              >이력서 팝업</a
            >
            <a
              href="javascript:JoinPro();"
              class="btn-full btn-50 btn-green2"
              id="join_reg"
              style="margin-left:0;"
              >회원 가입하기</a
            >
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import * as validator from 'validator'
import '@/assets/style/css.css'
export default {
  data: () => ({
    inputInfo: {
      id: null,
      password: null,
      confirmPassword: null,
      name: null,
      dateOfBirth: null,
      gender: '1',
      emailId: '',
      emailAddressInputted: '',
      emailAddressSelected: '',
      residenceCity: '',
      residenceDistrict: '',
      subject: [''],
    },
    identityVerification: {
      cellphone: null,
    },
    staticOptions: {
      emailOptions: [
        { text: '직접입력', value: '' },
        { text: 'naver.com', value: 'naver.com' },
        { text: 'nate.com', value: 'nate.com' },
        { text: 'hanmail.net', value: 'hanmail.net' },
        { text: 'daum.net', value: 'daum.net' },
        { text: 'gmail.com', value: 'gmail.com' },
        { text: 'chol.com', value: 'chol.com' },
        { text: 'dreamwiz.com', value: 'dreamwiz.com' },
        { text: 'empal.com', value: 'empal.com' },
        { text: 'hotmail.com', value: 'hotmail.com' },
        { text: 'korea.com', value: 'korea.com' },
        { text: 'lycos.com', value: 'lycos.com' },
        { text: 'netion.com', value: 'netion.com' },
        { text: 'yahoo.com', value: 'yahoo.com' },
      ],
      genderOptions: [
        { text: '남자', type: 'man', value: '1' },
        { text: '여자', type: 'woman', value: '2' },
      ],
      cityOptions: [
        { text: '시/도', value: '' },
        { text: '서울', value: '서울' },
        { text: '경기', value: '경기' },
        { text: '인천', value: '인천' },
        { text: '부산', value: '부산' },
        { text: '대구', value: '대구' },
        { text: '대전', value: '대전' },
        { text: '세종', value: '세종' },
        { text: '광주', value: '광주' },
        { text: '울산', value: '울산' },
        { text: '강원', value: '강원' },
        { text: '경북', value: '경북' },
        { text: '경남', value: '경남' },
        { text: '전북', value: '전북' },
        { text: '전남', value: '전남' },
        { text: '충북', value: '충북' },
        { text: '충남', value: '충남' },
        { text: '제주', value: '제주' },
        { text: '해외', value: '해외' },
      ],
      districtOptions: {
        서울: [
          '강남구',
          '강동구',
          '강북구',
          '강서구',
          '관악구',
          '광진구',
          '구로구',
          '금천구',
          '노원구',
          '도봉구',
          '동대문구',
          '동작구',
          '마포구',
          '서대문구',
          '서초구',
          '성동구',
          '성북구',
          '송파구',
          '양천구',
          '영등포구',
          '용산구',
          '은평구',
          '종로구',
          '중구',
          '중랑구',
        ],
        경기: [
          '가평군',
          '고양시',
          '과천시',
          '광명시',
          '광주시',
          '구리시',
          '군포시',
          '김포시',
          '남양주시',
          '동두천시',
          '부천시',
          '성남시',
          '수원시',
          '시흥시',
          '안산시',
          '안성시',
          '안양시',
          '양주시',
          '양평군',
          '여주시',
          '연천군',
          '오산시',
          '용인시',
          '의왕시',
          '의정부시',
          '이천시',
          '파주시',
          '평택시',
          '포천시',
          '하남시',
          '화성시',
        ],
        인천: [
          '강화군',
          '계양구',
          '미추홀구',
          '남동구',
          '동구',
          '부평구',
          '서구',
          '연수구',
          '옹진군',
          '중구',
        ],
        부산: [
          '강서구',
          '금정구',
          '기장군',
          '남구',
          '동구',
          '동래구',
          '부산진구',
          '북구',
          '사상구',
          '사하구',
          '서구',
          '수영구',
          '연제구',
          '영도구',
          '중구',
          '해운대구',
        ],
        대구: ['남구', '달서구', '달성군', '동구', '북구', '서구', '수성구', '중구'],
        대전: ['대덕구', '동구', '서구', '유성구', '중구'],
        세종: ['전체'],
        광주: ['광산구', '남구', '동구', '북구', '서구'],
        울산: ['남구', '동구', '북구', '울주군', '중구'],
        강원: [
          '강릉시',
          '고성군',
          '동해시',
          '삼척시',
          '속초시',
          '양구군',
          '양양군',
          '영월군',
          '원주시',
          '인제군',
          '정선군',
          '철원군',
          '춘천시',
          '태백시',
          '평창군',
          '홍천군',
          '화천군',
          '횡성군',
        ],
        경북: [
          '경산시',
          '경주시',
          '고령군',
          '구미시',
          '군위군',
          '김천시',
          '문경시',
          '봉화군',
          '상주시',
          '성주군',
          '안동시',
          '영덕군',
          '영양군',
          '영주시',
          '영천시',
          '예천군',
          '울릉군',
          '울진군',
          '의성군',
          '청도군',
          '청송군',
          '칠곡군',
          '포항시',
        ],
        경남: [
          '거제시',
          '거창군',
          '고성군',
          '김해시',
          '남해군',
          '마산시',
          '밀양시',
          '사천시',
          '산청군',
          '양산시',
          '의령군',
          '진주시',
          '진해시',
          '창녕군',
          '창원시',
          '통영시',
          '하동군',
          '함안군',
          '함양군',
          '합천군',
        ],
        전북: [
          '고창군',
          '군산시',
          '김제시',
          '남원시',
          '무주군',
          '부안군',
          '순창군',
          '완주군',
          '익산시',
          '임실군',
          '장수군',
          '전주시 덕진구',
          '전주시 완산구',
          '정읍시',
          '진안군',
        ],
        전남: [
          '강진군',
          '고흥군',
          '곡성군',
          '광양시',
          '구례군',
          '나주시',
          '담양군',
          '목포시',
          '무안군',
          '보성군',
          '순천시',
          '신안군',
          '여수시',
          '영광군',
          '영암군',
          '완도군',
          '장성군',
          '장흥군',
          '진도군',
          '함평군',
          '해남군',
          '화순군',
        ],
        충북: [
          '괴산군',
          '단양군',
          '보은군',
          '영동군',
          '옥천군',
          '음성군',
          '제천시',
          '증평군',
          '진천군',
          '청주시 청원구',
          '청주시 상당구',
          '청주시 흥덕구',
          '충주시',
        ],
        충남: [
          '계룡시',
          '공주시',
          '금산군',
          '논산시',
          '당진군',
          '보령시',
          '부여군',
          '서산시',
          '서천군',
          '아산시',
          '연기군',
          '예산군',
          '천안시',
          '청양군',
          '태안군',
          '홍성군',
        ],
        제주: ['서귀포시', '제주시'],
        해외: [
          '중국/홍콩',
          '미국',
          '일본',
          '아시아/중동',
          '북아메리카',
          '남아메리카',
          '유럽',
          '오세아니아',
          '아프리카',
        ],
      },
      subjectOptions: [
        { text: '선택', value: '' },
        { text: '국어', value: '01' },
        { text: '영어', value: '02' },
        { text: '수학', value: '03' },
        { text: '과학계열', value: '04' },
        { text: '사회계열', value: '05' },
        { text: '음악', value: '06' },
        { text: '미술', value: '07' },
        { text: '체육', value: '08' },
        { text: '영어회화/텝스/토플', value: '09' },
        { text: '일어', value: '10' },
        { text: '중국어', value: '11' },
        { text: '관리직', value: '12' },
        { text: '교재개발', value: '13' },
        { text: '상담직', value: '14' },
        { text: '사무보조', value: '15' },
        { text: '운전직', value: '16' },
        { text: '방문학습지', value: '17' },
        { text: '자기주도', value: '18' },
        { text: '유아', value: '19' },
        { text: '보육교사', value: '20' },
        { text: '한문', value: '21' },
        { text: '독서', value: '22' },
        { text: '컴퓨터', value: '23' },
        { text: '예체능', value: '24' },
        { text: '물리', value: '26' },
        { text: '화학', value: '27' },
        { text: '생물', value: '28' },
        { text: '지구과학', value: '29' },
        { text: '한국사', value: '30' },
        { text: '코딩강사', value: '31' },
        { text: '기타외국어', value: '97' },
        { text: '기타예체능', value: '98' },
        { text: '기타과목', value: '99' },
      ],
    },
    validated: {
      password: { valid: true, message: '' },
    },
  }),
  computed: {
    isCitySelected() {
      return this.inputInfo.residenceCity ? true : false
    },
  },
  methods: {
    initDistrict() {
      this.inputInfo.residenceDistrict = ''
    },
    onAddSubject() {
      if (this.inputInfo.subject.length > 2) {
        alert('3이상')
        return
      }
      this.inputInfo.subject.push('')
    },
    onDelSubject(idx) {
      this.inputInfo.subject[idx] = 'delete'
      this.inputInfo.subject = this.inputInfo.subject.filter(d => d !== 'delete')
    },
    onSelectCity() {
      this.initDistrict()
    },
    onSelectEmail() {
      this.inputInfo.emailAddressInputted = this.inputInfo.emailAddressSelected
    },
    onValidate(val, type) {
      if (type === 'password') {
        // let passwordReg = /^[A-Za-z0-9]+$/
        // let valid = passwordReg.test(val)
        let valid = validator.isAlphanumeric(val)
        this.validated.password.message = !valid ? '5~14자의 영문, 숫자 조합만 사용가능합니다.' : ''
      }
    },
  },
}
</script>
