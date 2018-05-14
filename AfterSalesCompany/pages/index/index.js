//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},

  },

  //事件处理函数
  formSubmit:function(e){

    wx.request({
      url: "https://sh.jinhuan123.com/weixin/company/login",
      method: "POST",
      header: { "Content-Type": "application/json" },
      data: e.detail.value,
      success: function (res) {
        console.log(res)
        if(res.data.code==0){
          wx.setStorageSync('authority', res.data.authority)
          wx.switchTab({
            url: '/pages/new-repair/new-repair',
          })
        }else if(res.data.code==-1){
          wx.showModal({
            title: '密码错误',
            content: '请重新输入密码',
          })
        } else if (res.data.code == -3) {
          wx.showModal({
            title: '用户名错误',
            content: '请重新输入用户名',
          })
        }else{
          wx.showModal({
            title: '权限不足',
            content: '请使用ROLE_ADMIN权限账号登录',
          })
        }
        
      },
      fail:function(){
        wx.showModal({
          title: '未知错误',
          content: '请检查服务器是否在线',
        })
      }
    })

  },


  //获取微信用户信息
  // login:function(){
  //   wx.login({
  //     success: function (res) {
  //       var code = res.code;
  //       if (code) {
  //         console.log('获取用户登录凭证：' + code);
  //       } else {
  //         console.log('获取用户登录态失败：' + res.errMsg);
  //       }
  //       wx.request({
  //         url: 'https://api.weixin.qq.com/sns/jscode2session',
  //         data:{
  //           grant_type : 'authorization_code',
  //           appid : 'wx72624f63b0523850',
  //           secret:'e18081aa9fc5fb60fb78d138ed1182ad',
  //           js_code: code
  //         },
  //         success:function(res){
  //           console.log(res.data)
  //         }
  //       })
  //     }
  //   })
  // }

})
