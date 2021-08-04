<template>
    <div id="container" />
</template>

<script>
import { lazyAMapApiLoaderInstance } from 'vue-amap';
export default {
    data() {
        return {
            map: '', // 地图
            // 轨迹数组，格式[{},{},...]
            path: [
                {
                    path: [[102.508094, 24.397478], [102.518199, 24.497588]],
                },
            ],
        };
    },
    mounted() {
        //画轨迹
        // this.setLine();
        this.init3D();
    },
    methods: {
        // 3D
        init3D() {
            this.map = new AMap.Map('container', {
                viewMode: '3D',
                pitch: 55,
                rotation: 35,
                center: [102.508094, 24.397478],
                features: ['bg', 'road'],
                zoom: 16,
            });

            // 添加Object3DLayer图层，用于添加3DObject对象
            var object3Dlayer = new AMap.Object3DLayer();

            this.map.add(object3Dlayer);

            const paths = [
                [102.50109, 24.390782],
                [102.501739, 24.391715],
                [102.502313, 24.39151],
                [102.501669, 24.390606],
            ];

            const bounds = paths.map(function(path) {
                return new AMap.LngLat(path[0], path[1]);
            });

            // 创建 Object3D 对象
            const prism = new AMap.Object3D.Prism({
                path: bounds,
                height: 500,
                color: 'rgba(100, 150, 230, 0.7)', // 支持 #RRGGBB、rgb()、rgba() 格式数据
            });

            // 开启透明度支持
            prism.transparent = true;

            // 添加至 3D 图层
            object3Dlayer.add(prism);

            this.setLine();
        },
        // 画轨迹
        setLine() {
            lazyAMapApiLoaderInstance.load().then(() => {
                // this.map = new AMap.Map('container', {
                //     zooms: [13, 25], // 地图缩放范围
                //     center: new AMap.LngLat(102.508094, 24.397478),
                // });
                AMapUI.load(['ui/misc/PathSimplifier'], (PathSimplifier) => {
                    if (!PathSimplifier.supportCanvas) {
                        alert('当前环境不支持 Canvas！');
                        return;
                    }
                    // 创建组件实例
                    var pathSimplifierIns = new PathSimplifier({
                        map: this.map,
                        zIndex: 100, // 图层叠加顺序
                        data: this.path, // 巡航路径
                        // 获取巡航路径中的路径坐标数组
                        getPath: (pathData, pathIndex) => {
                            return pathData.path;
                        },
                    });
                    // 创建巡航器
                    var pathNavigator = pathSimplifierIns.createPathNavigator(
                        0,
                        {
                            loop: true, // 是否循环
                            speed: 2000, // 速度(km/h)
                        }
                    );
                    pathNavigator.start();
                });
            });
        },
        init3D2() {
            var map = new AMap.Map('container', {
                resizeEnable: true,
                zoom: 21, //级别
                center: [102.501597, 24.391336], //中心点坐标
                pitch: 55, // 地图俯仰角度，有效范围 0 度- 83 度
                viewMode: '3D', //使用3D视图
                // mapStyle: 'amap://styles/darkblue', //设置地图的显示样式
                mapStyle: 'amap://styles/light', //设置地图的显示样式
            });

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
            var prism = new AMap.Object3D.Prism({
                path: bounds,
                height: height,
                color: 'rgba(211, 211, 211, 0.5)', // 支持 #RRGGBB、rgb()、rgba() 格式数据
            });
            // 开启透明度支持
            prism.transparent = true;
            object3Dlayer.add(prism); //添加
        },
    },
};
</script>

<style scoped>
#test-map {
    height: 650px;
}
#container {
    height: 650px;
}
</style>
