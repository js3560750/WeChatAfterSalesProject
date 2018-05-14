//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},

  },


  //事件处理函数
  formSubmit: function (e) {

    wx.request({
      url: "https://sh.jinhuan123.com/weixin/engineer/login",
      method: "POST",
      header: { "Content-Type": "application/json" },
      data: e.detail.value,
      success: function (res) {
        if (res.data.code == 0) {
          wx.setStorageSync("account", e.detail.value.account )
          wx.switchTab({
            url: '/pages/aftersales/aftersales',
          })
        } else if (res.data.code == -1) {
          wx.showModal({
            title: '密码错误',
            content: '请重新输入密码',
          })
        } else if (res.data.code == -3){
          wx.showModal({
            title: '用户名错误',
            content: '请重新输入用户名',
          })
        }

      },
      fail: function () {
        wx.showModal({
          title: '未知错误',
          content: '请检查服务器是否在线',
        })
      }
    })

  },


})
