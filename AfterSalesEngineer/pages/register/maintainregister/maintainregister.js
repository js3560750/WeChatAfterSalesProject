// pages/register/maintainregister/maintainregister.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  formSubmit: function (e) {

    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    wx.request({
      url: "https://sh.jinhuan123.com/weixin/maintain/update",
      method: "POST",
      header: { "Content-Type": "application/x-www-form-urlencoded" },
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
      url: 'https://sh.jinhuan123.com/weixin/maintain/' + options.id,
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