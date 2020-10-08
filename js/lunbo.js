window.addEventListener('load', function () {
    //节流阀 回调函数加到animate里
    let flag = true;
    //大轮播图
    function l_lunbo() {
        function animate2(obj, target, callback) {
            //清楚以前的定时器，保留当前的定时器，防止越走越快
            clearInterval(obj.timer);
            obj.timer = setInterval(function () {
                //步长值写到定时器里面
                var step = (target - obj.offsetLeft) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                if (obj.offsetLeft == target) {
                    clearInterval(obj.timer);
                    //回调函数 如果有回调函数就调用
                    callback && callback();
                }
                obj.style.left = obj.offsetLeft + step + 'px';
            }, 15)
        }
        //动态生成小圆圈
        var lb = document.querySelector('.lb-m')
        var lbM = document.querySelector('.lb-m img')
        var lbUl = document.querySelector('.lb-m ul');
        var ol = document.querySelector('.circle');
        var imgWidth = lbM.offsetWidth;
        var num = 0;
        var circle = 0;
        //鼠标经过图片停止定时器
        lb.addEventListener('mouseenter', function () {
            clearInterval(timer);
            timer = null;
        })
        lb.addEventListener('mouseleave', function () {
            timer = setInterval(function () {
                //手动调用点击事件
                nextPic.click();
            }, 3000)
        })
        for (var i = 0; i < lbUl.children.length; i++) {
            //创建li放入ol
            var li = document.createElement('li');
            //记录当前小圆圈索引号
            li.setAttribute('index', i);
            ol.appendChild(li);
            //排它思想
            li.addEventListener('click', function () {
                for (var i = 0; i < ol.children.length; i++) {
                    ol.children[i].className = '';
                }
                this.className = 'current';
                //点击小圆圈移动ul ul移动距离小圆圈 索引号乘以图片宽度 是负值
                //图片宽度 
                //获取小圆圈索引号
                var index = this.getAttribute('index');
                //当我们点击某个li后把Index赋值给num
                num = index;
                //当我们点击某个li后把Index赋值给circle
                circle = index;
                animate2(lbUl, -index * imgWidth)
            })
        }
        ol.children[0].className = 'current';
        //获取前一页，后一页元素
        var prePic = document.querySelector('.lb-m .prepic')
        var nextPic = document.querySelector('.lb-m .nextpic')
        //克隆第一张图片放在ul最后面 true为深克隆 复制里面的节点
        var firstImg = lbUl.children[0].cloneNode(true);
        lbUl.appendChild(firstImg);
        //点击右侧按钮，图片滚动一张
        nextPic.addEventListener('click', function () {
            if (flag) {
                flag = false
                //如果走到最后一张，此时我们的ul快速复原改为0
                if (num == lbUl.children.length - 1) {
                    lbUl.style.left = 0;
                    num = 0;
                }
                num++;
                animate2(lbUl, -num * imgWidth, function () {
                    flag = true;
                })
                //点击完小圆圈的变化
                circle++;
                //如果circle等于四说明到克隆的图片了我们就复原
                if (circle == ol.children.length) {
                    circle = 0;
                }
                circleChange();
            }
        })
        prePic.addEventListener('click', function () {
            if (flag) {
                flag = false;
                if (num == 0) {
                    num = lbUl.children.length - 1;
                    lbUl.style.left = -num * imgWidth;
                }
                num--;
                animate2(lbUl, -num * imgWidth, function () {
                    flag = true;
                });
                circle--;
                //如果circle，0说明小圆圈是最后一个
                if (circle < 0) {
                    circle = ol.children.length - 1;
                }
                circleChange();
            }
        });
        function circleChange() {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            ol.children[circle].className = 'current';
        }
        var timer = setInterval(function () {
            //手动调用点击事件
            nextPic.click();
        }, 3000);
    }
    l_lunbo();
    //小轮播图
    function s_lunbo() {
        function animate3(obj, target, callback) {
            //清楚以前的定时器，保留当前的定时器，防止越走越快
            clearInterval(obj.timer1);
            obj.timer1 = setInterval(function () {
                //步长值写到定时器里面
                var step = (target - obj.offsetLeft) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                if (obj.offsetLeft == target) {
                    clearInterval(obj.timer);
                    //回调函数 如果有回调函数就调用
                    callback && callback();
                }
                obj.style.left = obj.offsetLeft + step + 'px';
            }, 15)
        }
        let lbRul = document.querySelector(".lb-m-r ul");
        let first_img = lbRul.children[0].cloneNode(true);
        lbRul.appendChild(first_img);
        //获取前一页，后一页元素
        var lbmrprePic = document.querySelector('.lb-m-r .prepic');
        var lbmrNextPic = document.querySelector('.lb-m-r .nextpic');
        var lbmrImg = document.querySelector('.lb-m-r ul li');
        var lbmrImgWidth = lbmrImg.offsetWidth;
        let num1 = 0;
        lbmrNextPic.addEventListener('click', function () {
            if (flag) {
                flag = false;
                if (num1 == lbRul.children.length - 1) {
                    lbRul.style.left = 0;
                    num1 = 0;
                }
                num1++;
                animate3(lbRul, -num1 * lbmrImgWidth, function () {
                    flag = true;
                });
            }
        });
        lbmrprePic.addEventListener('click', function () {
            if (flag) {
                flag = false;
                if (num1 == 0) {
                    num1 = lbRul.children.length - 1;
                    lbRul.style.left = -num1 * lbmrImgWidth;
                }
                num1--;
                animate3(lbRul, -num1 * lbmrImgWidth, function () {
                    flag = true;
                });
            }
        })
        //鼠标经过图片停止定时器
        lbRul.addEventListener('mouseenter', function () {
            clearInterval(timer1);
            timer1 = null;
        });
        lbRul.addEventListener('mouseleave', function () {
            timer1 = setInterval(function () {
                //手动调用点击事件
                lbmrNextPic.click();
            }, 3000)
        });
        var timer1 = setInterval(function () {
            //手动调用点击事件
            lbmrNextPic.click();
        }, 5000);

    }
    s_lunbo();
    //秒杀轮播左
    function miaosha() {
        function animate3(obj, target, callback) {
            //清楚以前的定时器，保留当前的定时器，防止越走越快
            clearInterval(obj.timer1);
            obj.timer1 = setInterval(function () {
                //步长值写到定时器里面
                var step = (target - obj.offsetLeft) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                if (obj.offsetLeft == target) {
                    clearInterval(obj.timer);
                    //回调函数 如果有回调函数就调用
                    callback && callback();
                }
                obj.style.left = obj.offsetLeft + step + 'px';
            }, 15)
        }
        let lbRul = document.querySelector(".jdms-categroy ul");
        let first_img = lbRul.children[0].cloneNode(true);
        lbRul.appendChild(first_img);
        //获取前一页，后一页元素
        var jdms = document.querySelector('.jdms-categroy')
        var lbmrprePic = document.querySelector('.jdms-categroy .prepic');
        var lbmrNextPic = document.querySelector('.jdms-categroy .nextpic');
        var lbmrImg = document.querySelector('.jdms-categroy ul li');
        var lbmrImgWidth = lbmrImg.offsetWidth;
        let num1 = 0;
        lbmrNextPic.addEventListener('click', function () {
            if (flag) {
                flag = false;
                if (num1 == lbRul.children.length - 1) {
                    lbRul.style.left = 0;
                    num1 = 0;
                }
                num1++;
                animate3(lbRul, -num1 * lbmrImgWidth, function () {
                    flag = true;
                });
            }
        });
        lbmrprePic.addEventListener('click', function () {
            if (flag) {
                flag = false;
                if (num1 == 0) {
                    num1 = lbRul.children.length - 1;
                    lbRul.style.left = -num1 * lbmrImgWidth;
                }
                num1--;
                animate3(lbRul, -num1 * lbmrImgWidth, function () {
                    flag = true;
                });
            }
        })
        //鼠标经过图片停止定时器
        jdms.addEventListener('mouseenter', function () {
            clearInterval(timer1);
            timer1 = null;
        });
        jdms.addEventListener('mouseleave', function () {
            timer1 = setInterval(function () {
                //手动调用点击事件
                lbmrNextPic.click();
            }, 3000)
        });
        var timer1 = setInterval(function () {
            //手动调用点击事件
            lbmrNextPic.click();
        }, 5000);

    }
    miaosha()
})