var cssCode = 
`/*
* Hello，你好~ 我是XXX
* 我将以动画的形式来介绍我自己
* 只用文字介绍太单调了
* 我就用代码里介绍吧
* 首先写一些样式
*/

/* body 添加一个背景色 */

body{
    background: #87d1cd;
}

/* pre标签 添加样式 */

#preId{
    background: rgba(255,255,255,.4);
    padding:20px;
    font-size:20px; 
}

/* 所有标签添加一个过渡效果 */

*{
    box-sizing: border-box;
}

/* 然后设置一些代码的高亮，便于阅读 */

.token.selector{
    color: #690;
}
.token.property{
    color: #905;
}
.token.function {
    color: #DD4A68;
}

/*加点动画效果*/

#preId{
    animation: breath 1s infinite alternate-reverse;
}

@keyframes breath{
    0%{
        box-shadow:
        2px 2px 5px rgba(0,0,0,.05), 
        2px -2px 5px rgba(0,0,0,.05), 
        -2px 2px 5px rgba(0,0,0,.05), 
        -2px -2px 5px rgba(0,0,0,.05);
    }
    50%{
        box-shadow:
        8px 8px 20px rgba(0,0,0,.06), 
        8px -8px 20px rgba(0,0,0,.06), 
        -8px 8px 20px rgba(0,0,0,.06), 
        -8px -8px 20px rgba(0,0,0,.06);
    } 
    100%{
        box-shadow:
        2px 2px 5px rgba(0,0,0,.05), 
        2px -2px 5px rgba(0,0,0,.05), 
        -2px 2px 5px rgba(0,0,0,.05), 
        -2px -2px 5px rgba(0,0,0,.05);
    } 
}
`
var cssCode2 = 
`
/*设置代码区样式*/

#preId{
    position:fixed;
    left:2%;
    top:4%;
    margin:0;
    max-height:92%;
    width:44%;
    border:1px solid #e1e1e1;
    border-radius:4px;
}

/*加点3D效果*/

#preId{
    transform: scale(.8, .8); 
}

/*下面正式介绍一下我自己吧*/

/*首先创建一张白纸*/

#paperId{
    height:92%;
    position:fixed;
    right:7%;
    width:44%;
    top:4%;
    background: rgba(255,255,255,.96);
    border:1px solid #ccc;
    border-radius:4px;
    font-size:16px;
    padding:20px;
    overflow: auto;
}

#content{
    width:100%;
    height:100%; 
    overflow: auto;
}

/*向白纸中填入内容*/

`

var md =
`
 # 自我介绍

 我叫XXX

 1993年3月出生

 XXXX本科毕业

 自学前端两年
 
 希望应聘前端开发岗位

 # 技能介绍
 - HTML 
 - CSS 
 - JavaScript
 - jQuery
 - Vue.js
 - Node.js

 # 项目介绍

 1. XXX
 2. XXX
 3. XXX
 4. XXX

 # 联系方式

 电话：176771319xx

 Q Q：4798353xx

 邮箱：lpqstroxx@163.com

`
var cssCode3 =
`
/*设置白纸的样式*/
#tempId{    
    width:100%;
    height:100%; 
    overflow: auto;
    font-size: 16px;
    padding:20px;
    color: #5b6968;
}
/*设置标题文字样式*/
#tempId h1{
    font-size: 30px;
    color: #3d514f;
    border-left: 5px solid #3d514f;
    line-height: 1em;
    text-indent: 6px;
}
#tempId h1:nth-child(2){
    margin-top: 20px;
}
/*设置文字内容样式*/
#tempId p{
    text-indent:.8em;
    margin: -6px auto;
}
#tempId ul li,
#tempId ol li
{
    text-indent:.8em;
    margin: -6px auto;
}

`
writeCode('', cssCode, ()=>{
    createPaper(()=>{
        writeCode(cssCode,cssCode2,()=>{
            writeMarkdown(md,()=>{
                markdownToHtml(md,()=>{
                    writeCode(cssCode+cssCode2,cssCode3,()=>{
                        console.log('完成！')
                    })
                })
            })
        })
    })
})

function markdownToHtml(markdown,fn){
    let temp = document.createElement('pre')
    temp.id = 'tempId'
    temp.innerHTML = marked(markdown)
    let paperContent = document.querySelector('#content')
    paperContent.replaceWith(temp)
    fn && fn.call()
}

function writeCode(prefix,code,fn){
    let preId = document.querySelector('#preId')
    let n =0
    let timingID = setInterval(()=>{
        n += 1
        preId.innerHTML = Prism.highlight(prefix + code.substring(0,n), Prism.languages.css, 'css')
        styleId.innerHTML = prefix + code.substring(0,n)
        preId.scrollTop = preId.scrollHeight
        if(n>=code.length){
            window.clearInterval(timingID) 
            fn && fn.call()
        }
    },20)
}
function createPaper(fn){
    var paper = document.createElement('div')
    var content =  document.createElement('pre')
    paper.id = 'paperId' 
    content.id = 'content'
    paper.appendChild(content)
    document.body.insertBefore(paper,document.body.childNodes[2])
    fn && fn.call()
}

function writeMarkdown(markdowns,fn){
    let paperContent = document.querySelector('#content')
    let n = 0
    let timingID = setInterval(()=>{
        n += 1
        paperContent.innerHTML = markdowns.substring(0,n)
        paperContent.scrollTop = paperContent.scrollHeight
        if(n>=markdowns.length){
            window.clearInterval(timingID) 
            fn && fn.call()
        }
    },20)
}
