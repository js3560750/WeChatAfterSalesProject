// pages/send-order/repair/repair.js
var formData = {}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '点我选择日期',
    array: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: "https://sh.jinhuan123.com/weixin/engineer/list",
      method: "GET",
      header: { "Content-Type": "json" },
      success: function (res) {
        console.log(res)
        //遍历Json对象存入另一个数组
        //注意 []表示数组，{}表示对象！！！！！
        var getData=[]
        for(var i in res.data){
            getData[i] = res.data[i].engineer
        }
        console.log(getData)
        that.setData({
          array: getData
        })
      }
    })
    
  },

  //选择日期
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  //选择工程师
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  //提交表单
  formSubmit: function (e) {

    //提取e.detail.value中的单个数据
    //直接用e.detail.value.数据名  会报错“value”未定义
    this.setData({
      formData: e.detail.value
    })
    var engineer = this.data.formData.engineer
    var hospitalName = this.data.formData.hospitalName
    var expectTime = this.data.formData.expectTime



    //如果空表单则返回
    if (engineer == null || hospitalName == null || expectTime == null) {
      wx.showModal({
        title: '通知',
        content: '医院名称、上门时间、工程师不能为空',
        success: function () {
          wx.switchTab({
            url: '../send-order',
          })
        }
      })

    } else {
      //非空表单才提交
      console.log('form发生了submit事件，携带数据为：', e.detail.value)
      wx.request({
        url: "https://sh.jinhuan123.com/weixin/companyrepair",
        method: "POST",
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        data: e.detail.value,
        success: function (res) {
          console.log(res)
          wx.showModal({
            title: '通知',
            content: '维修工单提交成功',
            success: function () {
              wx.switchTab({
                url: '../send-order',
              })
            }
          })
        }
      })
    }


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