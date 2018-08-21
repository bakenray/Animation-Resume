             
var cssCode = 
`
/*
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
    background:rgba(0,0,0,.1);
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

/*加点3D效果*/
#preId{
    transform:rotate(360deg);
}
/*下面正式介绍一下我自己吧*/
`
var cssCode2 = 
`
#preId{
    position:fixed;
    left:5%;
    top:4%;
    bottom:4%;
    width:44%;
    height:92%;
    border:1px solid #56807e;
    border-radius:4px;
    overflow:auto;  
    box-shadow: 0 10px 15px rgba(0,0,0,.15);
}
#paperId{
    position:fixed;
    right:5%;
    width:44%;
    top:4%;
    bottom:4%;
    height:92%;
    background:#fff;
    border:1px solid #ccc;
    border-radius:4px;
    overflow:hidden;
    box-shadow: 0 10px 15px rgba(0,0,0,.15);
}
#content{
    width:100%;
    height:100%;
}
`

var md =
`
 #自我介绍
 我叫XXX
 1993年3月

 XXX学校毕业
 自学前端两年
 希望应聘前端开发岗位

 #节能介绍
 熟悉 JavaScript CSS 

 #项目介绍
 1 . XXX
 2 . XXX
 3 . XXX
 4 . XXX
 
 #联系方式
 电话：xxxx
 Q Q：xxxx
 邮箱：xxxx
`
writeCode('', cssCode, ()=>{
    createPaper(()=>{
        writeCode(cssCode,cssCode2,()=>{
            writeMarkdown(md,()=>{
                
            })
        })
    })
})

function writeMarkdown(markdowns,fn){
    let paperContent = document.querySelector('#content')
    console.log(paperContent)
    let n = 0
    let timingID = setInterval(()=>{
        n += 1
        paperContent.innerHTML = markdowns.substring(0,n)
        paperContent.scrollTop = paperContent.scrollHeight
        if(n>=markdowns.length){
            window.clearInterval(timingID) 
            fn && fn.call()
        }
    },0)
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
    },0)
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
