// pages/finished/finished.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  clickDetail: function () {
    wx.navigateTo({
      url: '../finisheddetails/finisheddetails',
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

  clickRepairDetail: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/finished/repairdetail/repairdetail?id=' + id,
    })
  },


  clickInstallDetail: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/finished/installdetail/installdetail?id=' + id,
    })
  },


  clickMaintainDetail: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/finished/maintaindetail/maintaindetail?id=' + id,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    var account = wx.getStorageSync("account")
    wx.request({
      url: "https://sh.jinhuan123.com/weixin/" + account + "/finished",
      method: "GET",
      header: { "Content-Type": "application/json" },
      success: function (res) {
        //时间格式转换
        if (res.data.repairList) {
          for (var i in res.data.repairList) {
            res.data.repairList[i].applyTime = that.timestampToTime(res.data.repairList[i].applyTime)
          }
        }
        if (res.data.installList) {
          for (var i in res.data.installList) {
            res.data.installList[i].orderTime = that.timestampToTime(res.data.installList[i].orderTime)
          }
        }
        if (res.data.maintainList) {
          for (var i in res.data.maintainList) {
            res.data.maintainList[i].orderTime = that.timestampToTime(res.data.maintainList[i].orderTime)
          }
        }

        //数据绑定
        that.setData({
          repairOrder: res.data.repairList,
          installOrder: res.data.installList,
          maintainOrder: res.data.maintainList
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