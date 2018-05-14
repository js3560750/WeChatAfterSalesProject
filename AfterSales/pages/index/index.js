// pages/index/index.js
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


  //自定义
  formSubmit:function(e){
    
    var openid = e.detail.value.openid
    console.log(openid)
    if(openid==''){
      wx.showModal({
        title: '通知',
        content: '手机号不能为空',
        success: function () {
          wx.switchTab({
            url: '/pages/index/index',
          })
        }
      })
    }else if(openid.length!=11){
      wx.showModal({
        title: '通知',
        content: '手机号长度不对',
        success: function () {
          wx.switchTab({
            url: '/pages/index/index',
          })
        }
      })
    }else{
      wx.setStorageSync('openid', e.detail.value.openid)
      wx.switchTab({
        url: '/pages/client/client',
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