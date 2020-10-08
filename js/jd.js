window.addEventListener('load', function () {
    //改变图片
    function bs(img) {
        var src1 = img.getAttribute('src');
        var src2 = src1.replace('.png', '-r.png');
        img.onmouseover = function () {
            this.setAttribute('src', src2);
        }
        img.onmouseout = function () {
            this.setAttribute('src', src1)
        }
    }
    for (var i = 0; i <= 11; i++) {
        var img = document.querySelectorAll('.lb .lb-r .lb-r-b ul li');
        var img = img[i].querySelector('img');
        bs(img);
    }

    //鼠标进入时显示和隐藏元素
    function xs(s, x) {
        // var cl = x.getAttribute("class");
        // var cl1 = cl.replace('hidden', '');
        s.onmouseover = function () {
            x.style.display = 'block';
        }
        s.onmouseout = function () {
            x.style.display = 'none';
        }
    }
    var lis = document.querySelectorAll('.header .header-r ul li')
    // console.log(lis);
    for (var i = 0; i <= lis.length; i++) {
        if (i == 2) {
            var inner = document.querySelector('.jd ');
            xs(lis[i], inner);
        } else if (i == 4) {
            var inner = document.querySelector('.dd');
            xs(lis[i], inner);
        } else if (i == 5) {
            var inner = document.querySelector(".member");
            xs(lis[i], inner)
        } else if (i == 7) {
            var inner = document.querySelector(".sjewm");
            xs(lis[i], inner);
        }
    }
    var li = document.querySelectorAll('.lb .lb-l ul li')
    for (var i = 0; i < li.length; i++) {
        var inner = document.querySelector('.jiadian');
        li[i].onmouseover = function () {
            inner.style.display = 'block';
        }
        li[i].onmouseout = function () {
            inner.style.display = 'none';
        }
        inner.addEventListener('mouseover', function () {
            inner.style.display = 'block';
        });
        inner.addEventListener('mouseout', function () {
            inner.style.display = 'none';
        });

    }
    //消除聚焦搜索框时消除文字
    var ele = document.querySelector('.search .search-t input');
    // console.log(ele);
    ele.onfocus = function () {
        this.placeholder = '';
    }
    ele.onblur = function () {
        this.placeholder = '手机';
    }
    //按下s键聚焦到搜索框
    var search = document.querySelector('input[name=search]');
    document.addEventListener('keyup', function (e) {
        if (e.keyCode == 83) {
            search.focus();
        }
    });
    //倒计时效果
    //防止刷新空白
    countDown();
    setInterval(countDown, 1000)
    function countDown() {
        var hour = document.querySelector('.timer-h')
        var minite = document.querySelector('.timer-m')
        var second = document.querySelector('.timer-s')
        // console.log(timer);
        //系统当前毫秒数
        var date = +new Date();
        //目标时间毫秒数
        var date_target = +new Date('2020-10-09 20:00:00');
        //相减除以1000得秒数
        var date_m = (date_target - date) / 1000;
        //小时
        var timer_h = parseInt(date_m / 60 / 60);
        timer_h = timer_h < 10 ? '0' + timer_h : timer_h;
        hour.innerHTML = timer_h;
        //分钟
        var timer_m = parseInt(date_m / 60 % 60);
        timer_m = timer_m < 10 ? '0' + timer_m : timer_m;
        minite.innerHTML = timer_m;
        //秒
        var timer_s = parseInt(date_m % 60);
        timer_s = timer_s < 10 ? '0' + timer_s : timer_s;
        second.innerHTML = timer_s;
    }

    //缓慢动画函数
    function animate(obj, target) {
        //清楚以前的定时器，保留当前的定时器，防止越走越快
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            //步长值写到定时器里面
            var step = (target - obj.offsetTop) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (obj.offsetTop == target) {
                clearInterval(obj.timer);
            }
            obj.style.top = obj.offsetTop + step + 'px';
        }, 15)
    }
    //滚动侧边栏与固定头部
    var header = document.querySelector('.header-search');
    var slider = document.querySelector('.slider');
    var ul = document.querySelector('.slider ul');
    var fanhui = document.querySelector('.fanhui')
    //获取页面头部多出的距离
    var jdms = document.querySelector('.jdms');
    var jdmsTop = jdms.offsetTop;
    document.addEventListener('scroll', function () {
        if (window.pageYOffset >= jdmsTop) {
            header.style.display = 'block';
            animate(header, 0);
            slider.style.position = 'fixed';
            animate(slider, 73);
            slider.style.right = '280px';
            fanhui.style.display = 'block';
        } else {
            header.style.display = 'none';
            header.style.top = '-53px';
            clearInterval(slider.timer)
            slider.style.position = 'absolute';
            slider.style.top = '-1px';
            slider.style.right = '-75px';
            fanhui.style.display = 'none';
        }
    })
    //点击返回 动画返回顶部 刷的一下window.scroll(0,0)
    //缓慢动画函数
    function animate1(obj, target) {
        //清楚以前的定时器，保留当前的定时器，防止越走越快
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            //步长值写到定时器里面
            var step = (target - obj.pageYOffset) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (obj.pageYOffset == target) {
                clearInterval(obj.timer);
            }
            window.scroll(0, obj.pageYOffset + step);
        }, 15)

    }
    fanhui.addEventListener('click', function () {
        animate1(window, 0);
    });
    //tab栏
    let tabLi = document.querySelector(".tab-hd ul").querySelectorAll('li a');
    let tabItem = document.querySelectorAll('.tab-bd .item')
    for (let i = 0; i < tabLi.length; i++) {
        tabLi[i].addEventListener('mousemove', function () {
            for (let i = 0; i < tabLi.length; i++) {
                tabLi[i].className = "";
            }
            this.className = "current1";
            tabLi[i].setAttribute('index', i);
            let index = this.getAttribute('index');
            for (let k = 0; k < tabItem.length; k++){
                tabItem[k].style.display="none";
            }
            tabItem[index].style.display='block';
        })
    }
})