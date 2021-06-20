const polygon = [[[15.520376, 38.231155], [15.160243, 37.444046], [15.309898, 37.134219], [15.099988, 36.619987], [14.335229, 36.996631], [13.826733, 37.104531], [12.431004, 37.61295], [12.570944, 38.126381], [13.741156, 38.034966], [14.761249, 38.143874], [15.520376, 38.231155]], [[9.210012, 41.209991], [9.809975, 40.500009], [9.669519, 39.177376], [9.214818, 39.240473], [8.806936, 38.906618], [8.428302, 39.171847], [8.388253, 40.378311], [8.159998, 40.950007], [8.709991, 40.899984], [9.210012, 41.209991]], [[12.376485, 46.767559], [13.806475, 46.509306], [13.69811, 46.016778], [13.93763, 45.591016], [13.141606, 45.736692], [12.328581, 45.381778], [12.383875, 44.885374], [12.261453, 44.600482], [12.589237, 44.091366], [13.526906, 43.587727], [14.029821, 42.761008], [15.14257, 41.95514], [15.926191, 41.961315], [16.169897, 41.740295], [15.889346, 41.541082], [16.785002, 41.179606], [17.519169, 40.877143], [18.376687, 40.355625], [18.480247, 40.168866], [18.293385, 39.810774], [17.73838, 40.277671], [16.869596, 40.442235], [16.448743, 39.795401], [17.17149, 39.4247], [17.052841, 38.902871], [16.635088, 38.843572], [16.100961, 37.985899], [15.684087, 37.908849], [15.687963, 38.214593], [15.891981, 38.750942], [16.109332, 38.964547], [15.718814, 39.544072], [15.413613, 40.048357], [14.998496, 40.172949], [14.703268, 40.60455], [14.060672, 40.786348], [13.627985, 41.188287], [12.888082, 41.25309], [12.106683, 41.704535], [11.191906, 42.355425], [10.511948, 42.931463], [10.200029, 43.920007], [9.702488, 44.036279], [8.888946, 44.366336], [8.428561, 44.231228], [7.850767, 43.767148], [7.435185, 43.693845], [7.549596, 44.127901], [7.007562, 44.254767], [6.749955, 45.028518], [7.096652, 45.333099], [6.802355, 45.70858], [6.843593, 45.991147], [7.273851, 45.776948], [7.755992, 45.82449], [8.31663, 46.163642], [8.489952, 46.005151], [8.966306, 46.036932], [9.182882, 46.440215], [9.922837, 46.314899], [10.363378, 46.483571], [10.442701, 46.893546], [11.048556, 46.751359], [11.164828, 46.941579], [12.153088, 47.115393], [12.376485, 46.767559]]]
polygon.forEach(p => {
    const point = [11.24762126, 43.76670419]
    const dio = d3.polygonContains(p, point)
    console.log(dio)
})

// const polygon = [[77.837451,35.49401],[78.912269,34.321936],[78.811086,33.506198],[79.208892,32.994395],[79.176129,32.48378],[78.458446,32.618164],[78.738894,31.515906],[79.721367,30.882715],[81.111256,30.183481],[80.476721,29.729865],[80.088425,28.79447],[81.057203,28.416095],[81.999987,27.925479],[83.304249,27.364506],[84.675018,27.234901],[85.251779,26.726198],[86.024393,26.630985],[87.227472,26.397898],[88.060238,26.414615],[88.174804,26.810405],[88.043133,27.445819],[88.120441,27.876542],[88.730326,28.086865],[88.814248,27.299316],[88.835643,27.098966],[89.744528,26.719403],[90.373275,26.875724],[91.217513,26.808648],[92.033484,26.83831],[92.103712,27.452614],[91.696657,27.771742],[92.503119,27.896876],[93.413348,28.640629],[94.56599,29.277438],[95.404802,29.031717],[96.117679,29.452802],[96.586591,28.83098],[96.248833,28.411031],[97.327114,28.261583],[97.402561,27.882536],[97.051989,27.699059],[97.133999,27.083774],[96.419366,27.264589],[95.124768,26.573572],[95.155153,26.001307],[94.603249,25.162495],[94.552658,24.675238],[94.106742,23.850741],[93.325188,24.078556],[93.286327,23.043658],[93.060294,22.703111],[93.166128,22.27846],[92.672721,22.041239],[92.146035,23.627499],[91.869928,23.624346],[91.706475,22.985264],[91.158963,23.503527],[91.46773,24.072639],[91.915093,24.130414],[92.376202,24.976693],[91.799596,25.147432],[90.872211,25.132601],[89.920693,25.26975],[89.832481,25.965082],[89.355094,26.014407],[88.563049,26.446526],[88.209789,25.768066],[88.931554,25.238692],[88.306373,24.866079],[88.084422,24.501657],[88.69994,24.233715],[88.52977,23.631142],[88.876312,22.879146],[89.031961,22.055708],[88.888766,21.690588],[88.208497,21.703172],[86.975704,21.495562],[87.033169,20.743308],[86.499351,20.151638],[85.060266,19.478579],[83.941006,18.30201],[83.189217,17.671221],[82.192792,17.016636],[82.191242,16.556664],[81.692719,16.310219],[80.791999,15.951972],[80.324896,15.899185],[80.025069,15.136415],[80.233274,13.835771],[80.286294,13.006261],[79.862547,12.056215],[79.857999,10.357275],[79.340512,10.308854],[78.885345,9.546136],[79.18972,9.216544],[78.277941,8.933047],[77.941165,8.252959],[77.539898,7.965535],[76.592979,8.899276],[76.130061,10.29963],[75.746467,11.308251],[75.396101,11.781245],[74.864816,12.741936],[74.616717,13.992583],[74.443859,14.617222],[73.534199,15.990652],[73.119909,17.92857],[72.820909,19.208234],[72.824475,20.419503],[72.630533,21.356009],[71.175273,20.757441],[70.470459,20.877331],[69.16413,22.089298],[69.644928,22.450775],[69.349597,22.84318],[68.176645,23.691965],[68.842599,24.359134],[71.04324,24.356524],[70.844699,25.215102],[70.282873,25.722229],[70.168927,26.491872],[69.514393,26.940966],[70.616496,27.989196],[71.777666,27.91318],[72.823752,28.961592],[73.450638,29.976413],[74.42138,30.979815],[74.405929,31.692639],[75.258642,32.271105],[74.451559,32.7649],[74.104294,33.441473],[73.749948,34.317699],[74.240203,34.748887],[75.757061,34.504923],[76.871722,34.653544],[77.837451,35.49401]]
// const point = [88.37082329,22.53107505]
// const dio = d3.polygonContains(polygon, point)
// console.log(dio)