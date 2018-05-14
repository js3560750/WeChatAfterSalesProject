// pages/client/myrepair/myrepair.js
const app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    isExpanded: "isExpanded1",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    //静态模拟数据
    // var orderContent = [
    //   {
    //     orderNumber: "201801161234",
    //     dealTime: "2018-01-16",
    //     engineer: "周杰伦",
    //     engineerTel: "13828681151",
    //     estimatedArrivalTime: "2018-01-17"
        
    //   },
    //   {
    //     orderNumber: "201801161235",
    //     dealTime: "2018-01-17",
    //     engineer: "方文山",
    //     engineerTel: "13828681151",
    //     estimatedArrivalTime: "2018-01-18"

    //   }
    // ];
    // //模拟数据绑定
    // this.setData({ myRepair: orderContent });
    
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
    return Y + M + D ;  //只返回到日期
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
    if (app.globalData.userInfo == null) {
      wx.showModal({
        title: '通知',
        content: '请到首页登录',
        success: function (res) {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/client/client',
            })
          } else if (res.cancel) {
            wx.switchTab({
              url: '/pages/client/client',
            })
          }
        }
      })
    }else{
      //从服务器获得数据
      var that = this;
      var openid = wx.getStorageSync('openid')
      wx.request({
        url: "https://sh.jinhuan123.com/weixin/repair/" + openid + "/list/unfinish",
        method: "POST",
        header: { "Content-Type": "json" },
        success: function (res) {

          //时间格式转换
          for (var index in res.data) {
            res.data[index].dealTime = that.timestampToTime(res.data[index].dealTime)
            res.data[index].estimatedArrivalTime = that.timestampToTime(res.data[index].estimatedArrivalTime)
          }
          that.setData({ myRepair: res.data });
        }
      })
    }
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