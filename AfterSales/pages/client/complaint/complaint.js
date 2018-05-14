// pages/client/complaint/complaint.js
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
    this.setData({id: options.id, engineer: options.engineer})
  },

  //提交投诉
  formSubmit:function(e){
    var id = e.detail.value.id
    wx.request({
      url: "https://sh.jinhuan123.com/weixin/repair/" + id + "/complain",
      method: "POST",
      header: { "Content-Type": "application/json" },
      data: { 
              hospitalComplaint: e.detail.value.msg
               },
      success: function (res) {
        wx.showModal({
          title: '您好!',
          content: '感谢您的建议！',
          complete: function () {
            wx.switchTab({
              url: '../evaluation/evaluation',
            })
          }
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