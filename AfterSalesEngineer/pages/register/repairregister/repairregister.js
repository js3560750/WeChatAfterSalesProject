// pages/register/repairregister/repairregister.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
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

  formSubmit: function (e) {

    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    wx.request({
      url: "https://sh.jinhuan123.com/weixin/repair/update",
      method: "POST",
      header: { "Content-Type": "application/json" },
      data: e.detail.value,
      success: function (res) {
        wx.showModal({
          title: '通知',
          content: '工单详细信息提交成功',
          success: function (res) {
            wx.switchTab({
              url: '../../unfinished/unfinished',
            })
          }
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //根据id获得工单信息
    wx.request({
      url: 'https://sh.jinhuan123.com/weixin/repair/' + options.id,
      method: 'GET',
      header: { "Content-Type": "json" },
      success: function (res) {
        that.setData({
          order: res.data,   
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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