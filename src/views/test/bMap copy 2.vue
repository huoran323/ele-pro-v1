<template>
    <div id="container" />
</template>
<script>
export default {
    data() {
        return {};
    },
    mounted() {
        var map = new AMap.Map('container', {
            resizeEnable: true,
            zoom: 21, //级别
            // center: [102.508094, 24.397478],//中心点坐标
            center: [102.501597, 24.391336], //中心点坐标
            pitch: 55, // 地图俯仰角度，有效范围 0 度- 83 度
            viewMode: '3D', //使用3D视图
            // mapStyle: 'amap://styles/darkblue', //设置地图的显示样式
            mapStyle: 'amap://styles/light', //设置地图的显示样式
        });
        var infoWindow = new AMap.InfoWindow({
            //创建信息窗体
            isCustom: true, //使用自定义窗体
            content: '<div>信息窗体</div>', //信息窗体的内容可以是任意html片段
            offset: new AMap.Pixel(16, -45),
        });
        var onMarkerClick = function(e) {
            infoWindow.open(map, e.target.getPosition()); //打开信息窗体
            //e.target就是被点击的Marker
        };
        var marker = new AMap.Marker({
            position: [102.508094, 24.397478],
        });
        map.add(marker);
        marker.on('click', onMarkerClick); //绑定click事件

        //第一个楼宇
        var object3Dlayer = new AMap.Object3DLayer();
        map.add(object3Dlayer);
        var bounds = [
            new AMap.LngLat(102.50109, 24.390782),
            new AMap.LngLat(102.501739, 24.391715),
            new AMap.LngLat(102.502313, 24.39151),
            new AMap.LngLat(102.501669, 24.390606),
        ];
        var height = 80;
        var color = '#02a9dd'; //rgba
        var prism = new AMap.Object3D.Prism({
            path: bounds,
            height: height,
            color: 'rgba(211, 211, 211, 0.5)', // 支持 #RRGGBB、rgb()、rgba() 格式数据
        });
        // 开启透明度支持
        prism.transparent = true;
        object3Dlayer.add(prism); //添加
        //第二个楼宇
        var object3Dlayer = new AMap.Object3DLayer();
        map.add(object3Dlayer);
        var bounds = [
            new AMap.LngLat(102.501991, 24.39213),
            new AMap.LngLat(102.50264, 24.391886),
            new AMap.LngLat(102.502538, 24.39171),
            new AMap.LngLat(102.50197, 24.391959),
        ];
        var height = 180;
        var color = '#02a9dd'; //rgba
        var prism = new AMap.Object3D.Prism({
            path: bounds,
            height: height,
            // color: 'rgba(100, 150, 230, 0.7)' // 支持 #RRGGBB、rgb()、rgba() 格式数据
            color: 'rgba(211, 211, 211, 0.5)', // 支持 #RRGGBB、rgb()、rgba() 格式数据
        });
        // 开启透明度支持
        prism.transparent = true;
        object3Dlayer.add(prism); //添加
        //第三个楼宇
        var object3Dlayer = new AMap.Object3DLayer();
        map.add(object3Dlayer);
        var bounds = [
            new AMap.LngLat(102.501718, 24.39045),
            new AMap.LngLat(102.502689, 24.391583),
            new AMap.LngLat(102.503853, 24.390933),
            new AMap.LngLat(102.502903, 24.389658),
        ];
        var height = 80;
        var color = '#02a9dd'; //rgba
        var prism = new AMap.Object3D.Prism({
            path: bounds,
            height: height,
            // color: 'rgba(100, 150, 230, 0.7)' // 支持 #RRGGBB、rgb()、rgba() 格式数据
            color: 'rgba(211, 211, 211, 0.5)', // 支持 #RRGGBB、rgb()、rgba() 格式数据
        });
        // 开启透明度支持
        prism.transparent = true;
        object3Dlayer.add(prism); //添加
        //object3Dlayer.remove(prism);//移除

        //画线
        var path1 = [
            new AMap.LngLat(102.502313, 24.391974),
            new AMap.LngLat(102.503198, 24.390928),
            new AMap.LngLat(102.502823, 24.390406),
        ];
        new AMap.Text({
            text: '电流A',
            position: [102.503198, 24.390928],
            map: map,
            style: {
                'background-color': '#ccccff',
                'border-color': 'white',
                'font-size': '12px',
            },
        });
        var thinline = new AMap.Object3D.ThinLine({
            path: path1,
            color: '#0055ff',
        });
        object3Dlayer.add(thinline);
        //画线
        var path2 = [
            new AMap.LngLat(102.502313, 24.391974),
            new AMap.LngLat(102.501675, 24.391231),
        ];
        new AMap.Text({
            text: '电流B',
            position: [102.501675, 24.391231],
            map: map,
            style: {
                'background-color': '#ccccff',
                'border-color': 'white',
                'font-size': '12px',
            },
        });
        var thinline = new AMap.Object3D.ThinLine({
            path: path2,
            color: '#db2222',
        });
        object3Dlayer.add(thinline);
        //画线
        var path3 = [
            new AMap.LngLat(102.502313, 24.391974),
            new AMap.LngLat(102.502415, 24.390811),
        ];
        new AMap.Text({
            text: '电流C',
            position: [102.502415, 24.390811],
            map: map,
            style: {
                'background-color': '#ccccff',
                'border-color': 'white',
                'font-size': '12px',
            },
        });
        var thinline = new AMap.Object3D.ThinLine({
            path: path3,
            color: '#db2eb2',
        });
        object3Dlayer.add(thinline);

        var infoWindow = new AMap.InfoWindow({
            anchor: 'bottom-right',
            content: '配电室配电室配电室配电室',
        });
        infoWindow.open(map, [102.502254, 24.392326]);
        map.on('complete', function() {
            //获取
            var ambientLight = map.AmbientLight; //获取环境光
            var directionLight = map.DirectionLight; //获取平行光
            //修改
            map.AmbientLight = new AMap.Lights.AmbientLight([1, 1, 1], 0.5);
            map.DirectionLight = new AMap.Lights.DirectionLight(
                [-6, -2, 14],
                [1, 1, 1],
                0.5
            );
        });

        AMap.plugin(['AMap.ControlBar'], function() {
            var bar = new AMap.ControlBar();
            map.addControl(bar);
        });
        new AMap.Circle({
            center: [102.502313, 24.391974],
            map: map,
            radius: 100,
            fillColor: 'blue',
            strokeWeight: 1,
            strokeColor: 'white',
            fillOpacity: 0.05,
        });
        new AMap.Circle({
            center: [102.502313, 24.391974],
            map: map,
            radius: 50,
            fillColor: 'blue',
            strokeWeight: 1,
            strokeColor: 'white',
            fillOpacity: 0.05,
        });
        // var shopping = new AMap.Marker({
        //     icon:'https://a.amap.com/jsapi_demos/static/resource/shopping.png',
        //     offset:new AMap.Pixel(-32,-54),
        //     position:[102.502415, 24.390811],
        //     map:map,
        // })
    },
    methods: {
        initAmap() {
            //创建地图
            var map = new AMap.Map('container', {
                zoom: 4,
            });

            AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'], function(
                PathSimplifier,
                $
            ) {
                if (!PathSimplifier.supportCanvas) {
                    alert('当前环境不支持 Canvas！');
                    return;
                }

                var pathSimplifierIns = new PathSimplifier({
                    zIndex: 100,
                    //autoSetFitView:false,
                    map: map, //所属的地图实例

                    getPath: function(pathData, pathIndex) {
                        return pathData.path;
                    },
                    getHoverTitle: function(pathData, pathIndex, pointIndex) {
                        if (pointIndex >= 0) {
                            //point
                            return (
                                pathData.name +
                                '，点：' +
                                pointIndex +
                                '/' +
                                pathData.path.length
                            );
                        }

                        return (
                            pathData.name + '，点数量' + pathData.path.length
                        );
                    },
                    renderOptions: {
                        renderAllPointsIfNumberBelow: 100, //绘制路线节点，如不需要可设置为-1
                    },
                });

                window.pathSimplifierIns = pathSimplifierIns;

                //设置数据
                pathSimplifierIns.setData([
                    {
                        name: '路线0',
                        path: [
                            [116.405289, 39.904987],
                            [113.964458, 40.54664],
                            [111.47836, 41.135964],
                            [108.949297, 41.670904],
                            [106.380111, 42.149509],
                            [103.774185, 42.56996],
                            [101.135432, 42.930601],
                            [98.46826, 43.229964],
                            [95.777529, 43.466798],
                            [93.068486, 43.64009],
                            [90.34669, 43.749086],
                            [87.61792, 43.793308],
                        ],
                    },
                ]);

                //对第一条线路（即索引 0）创建一个巡航器
                var navg1 = pathSimplifierIns.createPathNavigator(0, {
                    loop: true, //循环播放
                    speed: 1000000, //巡航速度，单位千米/小时
                });

                navg1.start();
            });
        },
    },
};
</script>
<style lang="less">
.page_hello {
    .container {
        height: 100%;
    }
}

#test-map {
    height: 650px;
}

#container {
    width: 90%;
    height: 780px;
}

#loadingTip {
    position: absolute;
    z-index: 9999;
    top: 0;
    left: 0;
    padding: 3px 10px;
    background: red;
    color: #fff;
    font-size: 14px;
}
</style>
