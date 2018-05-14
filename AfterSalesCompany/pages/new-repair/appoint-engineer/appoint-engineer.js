// pages/appointEngineer/appointEngineer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    this.setData({ id: options.id })

    //获得所有工程师
    var that = this
    wx.request({
      url: "https://sh.jinhuan123.com/weixin/engineer/list",
      method: "GET",
      header: { "Content-Type": "json" },
      success: function (res) {
        console.log(res)
        //遍历Json对象存入另一个数组
        //注意 []表示数组，{}表示对象！！！！！
        var getData = []
        for (var i in res.data) {
          getData[i] = res.data[i].engineer
        }
        console.log(getData)
        that.setData({
          array: getData
        })
      }
    })

    //根据id获得工单信息
    wx.request({
      url: 'https://sh.jinhuan123.com/weixin/repair/'+options.id,
      method:'GET',
      header: { "Content-Type": "json" },
      success: function (res) {

        that.setData({
          item:res.data
        })
      }
    })

  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  formSubmit:function(e){
    var id = e.detail.value.id
    wx.request({
      url: "https://sh.jinhuan123.com/weixin/repair/" + id + "/engineer",
      method: "POST",
      header: { "Content-Type": "application/json" },
      data: {
        engineer: e.detail.value.engineer
      },
      success: function (res) {
        wx.showModal({
          title: '您好!',
          content: '提交成功',
          complete: function () {
            wx.switchTab({
              url: '../new-repair',
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