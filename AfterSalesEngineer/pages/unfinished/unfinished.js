// pages/unfinished/unfinished.js
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


  //自定义功能函数：加载页面内容
  loadInfo:function(that,account){
    wx.request({
      url: "https://sh.jinhuan123.com/weixin/" + account + "/unfinished",
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

        if(res.data.repairList){
          that.setData({
            repairOrder: res.data.repairList
          })
        }else{
          that.setData({
            repairOrder: null
          })
        }

        if (res.data.installList) {
          that.setData({
            installOrder: res.data.installList
          })
        }else{
          that.setData({
            installOrder: null
          })
        }

        if (res.data.maintainList) {
          that.setData({
            maintainOrder: res.data.maintainList
          })
        }else{
          that.setData({
            maintainOrder: null
          })
        }

        //数据绑定
        // that.setData({
        //   repairOrder: res.data.repairList,
        //   installOrder: res.data.installList,
        //   maintainOrder: res.data.maintainList
        // })
      }
    })
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


  clickRepairSignIn:function(e){
    var id = e.currentTarget.dataset.id
    var that = this;
    wx.request({
      url: "https://sh.jinhuan123.com/weixin/repair/" + id + "/signIn",
      method: "GET",
      header: { "Content-Type": "application/json" },
      success: function (res) {
        wx.showModal({
          title: '通知',
          content: '签到成功！',
          success:function(res){
            var account = wx.getStorageSync("account")
            that.loadInfo(that, account)
          }
        })
        
      }
    })
  },

  clickInstallSignIn: function (e) {
    var id = e.currentTarget.dataset.id
    var that = this;
    wx.request({
      url: "https://sh.jinhuan123.com/weixin/install/" + id + "/signIn",
      method: "GET",
      header: { "Content-Type": "application/json" },
      success: function (res) {
        wx.showModal({
          title: '通知',
          content: '签到成功！',
          success: function (res) {
            var account = wx.getStorageSync("account")
            that.loadInfo(that, account)
          }
        })

      }
    })
  },

  clickMaintainSignIn: function (e) {
    var id = e.currentTarget.dataset.id
    var that = this;
    wx.request({
      url: "https://sh.jinhuan123.com/weixin/maintain/" + id + "/signIn",
      method: "GET",
      header: { "Content-Type": "application/json" },
      success: function (res) {
        wx.showModal({
          title: '通知',
          content: '签到成功！',
          success: function (res) {
            var account = wx.getStorageSync("account")
            that.loadInfo(that, account)
          }
        })

      }
    })
  },


  clickRepairFinish: function (e) {
    var id = e.currentTarget.dataset.id
    var that = this;
    wx.request({
      url: "https://sh.jinhuan123.com/weixin/repair/" + id + "/finish",
      method: "GET",
      header: { "Content-Type": "application/json" },
      success: function (res) {
        wx.showModal({
          title: '通知',
          content: '完成工单成功！',
          success: function (res) {
            var account = wx.getStorageSync("account")
            that.loadInfo(that, account)
          }
        })

      }
    })
  },

  clickInstallFinish: function (e) {
    var id = e.currentTarget.dataset.id
    var that = this;
    wx.request({
      url: "https://sh.jinhuan123.com/weixin/install/" + id + "/finish",
      method: "GET",
      header: { "Content-Type": "application/json" },
      success: function (res) {
        wx.showModal({
          title: '通知',
          content: '完成工单成功！',
          success: function (res) {
            var account = wx.getStorageSync("account")
            that.loadInfo(that, account)
          }
        })

      }
    })
  },

  clickMaintainFinish: function (e) {
    var id = e.currentTarget.dataset.id
    var that = this;
    wx.request({
      url: "https://sh.jinhuan123.com/weixin/maintain/" + id + "/finish",
      method: "GET",
      header: { "Content-Type": "application/json" },
      success: function (res) {
        wx.showModal({
          title: '通知',
          content: '完成工单成功！',
          success: function (res) {
            var account = wx.getStorageSync("account")
            that.loadInfo(that, account)
          }
        })

      }
    })
  },

  clickRepairRegister:function(e){
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../register/repairregister/repairregister?id=' + id,
    })
  },

  clickInstallRegister: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../register/installregister/installregister?id=' + id,
    })
  },

  clickMaintainRegister: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../register/maintainregister/maintainregister?id=' + id,
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
    var account=wx.getStorageSync("account")
    this.loadInfo(that,account)
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