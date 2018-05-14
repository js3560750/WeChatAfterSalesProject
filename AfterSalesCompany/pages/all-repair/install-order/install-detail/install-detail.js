// pages/all-repair/install-order/install-detail/install-detail.js
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
    var that = this
    //根据id获得工单信息
    wx.request({
      url: 'https://sh.jinhuan123.com/weixin/install/' + options.id,
      method: 'GET',
      header: { "Content-Type": "json" },
      success: function (res) {

        //时间格式转换
        if (res.data.orderTime != null) {
          res.data.orderTime = that.timestampToTime(res.data.orderTime)
        }
        if (res.data.estimatedArrivalTime != null) {
          res.data.estimatedArrivalTime = that.timestampToTime(res.data.estimatedArrivalTime)
        }
        if (res.data.arrivaledTime != null) {
          res.data.arrivaledTime = that.timestampToTime(res.data.arrivaledTime)
        }
        if (res.data.finishedTime != null) {
          res.data.finishedTime = that.timestampToTime(res.data.finishedTime)
        }


        that.setData({
          orderDetail: res.data
        })
      }
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