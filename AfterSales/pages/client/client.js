// pages/client/client.js
//index.js
//获取应用实例
const app = getApp();


Page({
  // 参与页面渲染的数据
  data: {
    motto: '全国统一客服热线：400-998-7635',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')

  },



  //在渲染完界面之后，页面实例就会收到一个 onLoad 的回调，你可以在这个回调处理你的逻辑
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    this.login();

  },

  clickOpenId:function(){
    wx.getStorageSync('openid')
  },

  clickTest:function(){
    var date=this.timestampToTime(1517984621000)
  },

  //自定义功能函数：时间戳转日期
  timestampToTime:function(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes();  
    var s = date.getSeconds();
    return Y+ M + D + h + m;  //只返回到分钟
  },

  //获取微信用户信息，为了把openid存入app.globalData.userInfo.openid
  login: function () {
    var that = this
    wx.login({
      success: function (res) {
        var code = res.code;
        if (code) {
          console.log('获取用户登录凭证：' + code);
        } else {
          console.log('获取用户登录态失败：' + res.errMsg);
        }
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            grant_type: 'authorization_code',
            appid: 'wx72624f63b0523850',
            secret: 'e18081aa9fc5fb60fb78d138ed1182ad',
            js_code: code
          },
          success: function (res) {
            console.log(res.data.openid)
            console.log(app.globalData.userInfo)
            //wx.setStorageSync('openid', res.data.openid)
            
          }
        })
      }
    })

  }

})