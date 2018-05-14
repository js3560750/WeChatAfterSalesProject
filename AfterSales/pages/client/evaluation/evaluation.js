// pages/client/evaluation/evalutation.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //从服务器获得数据
    var that = this;
    var openid = wx.getStorageSync('openid')
    //var openid ='oJxcn0RTiniMFNujqp5_-_dP9UhU'

    wx.request({
      url: "https://sh.jinhuan123.com/weixin/repair/" + openid + "/list",
      method: "POST",
      header: { "Content-Type": "json" },
      success: function (res) {
        //时间格式转换
        for (var index in res.data){
          res.data[index].applyTime = that.timestampToTime(res.data[index].applyTime)
        }
        //绑定数据到前端
        that.setData({ myEvaluation: res.data });
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  clickEvaluation:function(e){
    var id=e.currentTarget.dataset.id
    wx.showActionSheet({
      itemList: ['好评', '中评', '差评'],
      success: function (res) {
        console.log(res.tapIndex)
        console.log(id)
        // var postData={}
        // postData.serviceRating=res.tapIndex
        // console.log(postData)
        wx.request({
          url: "https://sh.jinhuan123.com/weixin/repair/"+id+"/rate",
          method: "POST",
          header: { "Content-Type": "application/json" },
          data: {serviceRating:res.tapIndex},
          success: function (res) {
            wx.showModal({
              title: '您好!',
              content: '感谢您的评价！',
              complete: function () {
                wx.reLaunch({
                  url: '../evaluation/evaluation',
                })
              }
            })
            
          }
        })
        
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },

  clickComplaint:function(e){
    var id = e.currentTarget.dataset.id
    var engineer = e.currentTarget.dataset.engineer //注意这里engineername全是小写
    wx.navigateTo({
      url: '../complaint/complaint?id=' + id + '&engineer=' + engineer,
    })
    
  },





  //自定义功能函数：时间戳转日期
  timestampToTime: function (timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes();
    var s = date.getSeconds();
    return Y + M + D + h + m;  //只返回到分钟
  },





  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // if (app.globalData.userInfo == null) {
    //   wx.showModal({
    //     title: '通知',
    //     content: '请到首页登录',
    //     success: function (res) {
    //       if (res.confirm) {
    //         wx.switchTab({
    //           url: '/pages/client/client',
    //         })
    //       } else if (res.cancel) {
    //         wx.switchTab({
    //           url: '/pages/client/client',
    //         })
    //       }
    //     }
    //   })
    // }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})