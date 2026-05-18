Page({
  data: {
    showDetail: [false, false, false, false]
  },
  
  toggleDetail(e) {
    const index = e.currentTarget.dataset.index;
    const showDetail = this.data.showDetail;
    showDetail[index] = !showDetail[index];
    this.setData({
      showDetail: showDetail
    });
  }
})