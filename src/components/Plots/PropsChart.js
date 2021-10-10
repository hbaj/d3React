 const PropCharts =() => {
    let width = 600; //document.body.clientWidth-100;
    let height = 300; //document.body.clientHeight-200;
    let margin = { top: 30, bottom: 100, left: 100, right: 30 };
    let tickSeparationRatio = 70;
    return {
      width: width,
      height: height,
      margin: margin,
      tickSeparationRatio: tickSeparationRatio,
    };
  }

 export  default PropCharts;