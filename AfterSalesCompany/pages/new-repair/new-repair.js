// pages/newRepair/newRepair.js
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
    
  },


  clickDetail:function(e){
    var id =e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../new-repair/detail/detail?id=' + id,
    })
  },


  clickApponitEngineer:function(e){
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../new-repair/appoint-engineer/appoint-engineer?id=' + id,
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
    //从服务器获得数据
    var that = this;
    wx.request({
      url: "https://sh.jinhuan123.com/weixin/repair/list/statusnull",
      method: "GET",
      header: { "Content-Type": "json" },
      success: function (res) {
        console.log(res)

        //时间格式转换
        for (var i in res.data) {
          res.data[i].applyTime = that.timestampToTime(res.data[i].applyTime)

        }
        that.setData({
          newOrder: res.data
        })
      }
    })
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