
// 获取地址栏参数
function GetQueryString(name: string) {
  const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  const r = window.location.search.substr(1).match(reg);
  if (r !== null) {
    return unescape(r[2]);
  }
}
function randomString() {
  const len = 16;
  const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  /** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  const maxPos = $chars.length;
  let pwd = '';
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}

const u = navigator.userAgent;
export const is_ios = (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) || (!!u.match(/iPhone|mac|iPod|iPad|ios/i));
const is_android = (!!u.match(/AppleWebKit.*Mobile.*/)) && (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1);
let userlandId = window.localStorage.getItem('USER_LANDPID');
if (!userlandId) {
  userlandId = randomString();
  window.localStorage.setItem('USER_LANDPID', userlandId);
}

const getAdjustObj = () => {
  const utm_campaign = GetQueryString("utm_campaign") || '0';
  let campaignList = [0, 0, 0, 0, 0, 0, 0, 0, 0] as any;
  if (utm_campaign !== "0") {
    campaignList = utm_campaign.split("_");
  }

  const fbclid = GetQueryString('fbclid') || '0'
  const fbtime = new Date().getTime()
  const pageFbc = 'fb.1.' + fbtime + '.' + fbclid;

  const adjustObj = {
    ip: "0.0.0.0",
    log_id: randomString(),
    h5uid: userlandId,
    token: "qjwzxn",
    bookId: '',
    bid: '',
    channelCode: '',
    cid: 0,
    shareCode: 0,
    url: window.location.href,
    fbp: getCookie("_fbp"),
    fbc: getCookie("_fbc") || pageFbc,
    campaign_id: GetQueryString("utm_content") || '0',
    campaign_name: GetQueryString("utm_campaign") || '0',
    ua: navigator.userAgent,
  };

  if (utm_campaign && utm_campaign !== "0") {
    adjustObj.bookId = campaignList[3] || Number(GetQueryString('bookId')) || '';
    adjustObj.bid = campaignList[3] || Number(GetQueryString('bookId')) || '';
    adjustObj.channelCode = campaignList[2];
    adjustObj.token = campaignList[4];
  } else {
    if (is_ios) {
      adjustObj.channelCode = 'GSIZ1000001'
    } else {
      adjustObj.channelCode = 'GSAZ1000001'
    }
  }
  return adjustObj;
}

const getPline = () => {
  if (is_ios) {
    return 'ios';
  } else {
    return is_android ? 'android' : 'incompatible';
  }
}

// // 打点相关
// function gostoryLog(data, eventType) {
//   const keys = Object.getOwnPropertyNames(adjustObj);
//   const keysData = Object.getOwnPropertyNames(data);
//   const _data = {
//     type: 'gs_luodiye_video_interactive',
//     action: 3, // 1 pv | 2 按钮点击下载
//     planId: GetQueryString("utm_content") || '0',
//     planName: GetQueryString("utm_campaign") || '0',
//     clipboard: adjustObj,
//   }
//   for (let i = 0; i < keys.length; i++) {
//     _data[keys[i]] = adjustObj[keys[i]];
//   }
//   for (let j = 0; j < keysData.length; j++) {
//     _data[keysData[j]] = data[keysData[j]];
//   }
//   const logData = {
//     log_id: randomString(), // 随机生成，16位字符串即可
//     bline: 'gs',
//     pline: getPline(),
//     cts: new Date().getTime(),
//     pkna: '',
//     app_version: '5.1.3',
//     chid: '',
//     uid: userlandId,
//     imei: '',
//     oaid: '',
//     idfa: '',
//     type: 'luodiye',
//     event: eventType,
//     data: _data,
//   }
//   axios({
//     method: 'get',
//     url: 'https://log.gostory.com/h5_standard_final_log.php',
//     params: {
//       json: JSON.stringify(logData)
//     }
//   }).then(function (ret) {
//     console.log('打点成功')
//   }).catch(function (data, code) {
//     console.log('打点失败')
//   })
// }

function compile(code: any) {
  code = JSON.stringify(code);
  const res: string[] = [];
  code.split("").forEach((c: string, i: number) => {
    res.push((code.charCodeAt(i) + 2).toString(16));
  });
  return res.join("");
}

// 获取cookie
function getCookie(name: string, cookieStr?: any) {
  const strcookie = cookieStr || document.cookie; // 获取cookie字符串
  const arrcookie = strcookie.split("; "); // 分割
  // 遍历匹配
  for (let i = 0; i < arrcookie.length; i++) {
    const arr = arrcookie[i].split("=");
    if (arr[0] === name) {
      return arr[1];
    }
  }
  return ''
}

// function getDataLoad() {
//   axios({
//     method: 'get',
//     url: "https://api.gostory.com/gostory/ap001/remote"
//   }).then(function (res) {
//     console.log('ap001/remote', res)
//     if (res.status === 200 || res.status === 0) {
//       adjustObj.ip = res.data.ip.toString().replace("\n", "");
//     }
//     // 事件打点
//     const qmap = { status: res.status };
//     // type,event,data
//     gostoryLog(qmap, 'event_remote_success');
//     gostoryLog({ action: 1 }, 'luodiyelogPV_comein_gostory')
//   }).catch(function (err) {
//     adjustObj.ip = "0.0.0.0";
//     // 事件打点
//     const qmap = {};
//     // type,event,data
//     gostoryLog(qmap, 'event_remote_err');
//     gostoryLog({ action: 1 }, 'luodiyelogPV_comein_gostory')
//   });
// }
